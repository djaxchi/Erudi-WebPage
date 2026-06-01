import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join, extname } from 'node:path';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import sirv from 'sirv';
import puppeteer from 'puppeteer';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, '..', 'dist');
const PORT = 4178;

// Routes to prerender (exclude /about — it is a redirect).
const ROUTES = ['/', '/desktop', '/download', '/team', '/contact', '/waitlist'];

const routeToFile = (route) =>
  route === '/' ? join(DIST, 'index.html') : join(DIST, route, 'index.html');

async function main() {
  // Snapshot the pristine build shell once. We serve THIS for every navigation
  // request so that writing prerendered output to disk never feeds an
  // already-rendered #root back to React (which would throw on createRoot).
  const shell = await readFile(join(DIST, 'index.html'), 'utf8');

  // sirv handles static assets (JS/CSS/images). single:false so it never
  // falls back to index.html for us — we own the SPA fallback below.
  const serveAssets = sirv(DIST, { single: false, dev: false });

  const server = createServer((req, res) => {
    const path = req.url.split('?')[0];
    const isAsset = extname(path) !== '' && extname(path) !== '.html';
    if (isAsset) {
      serveAssets(req, res, () => {
        res.statusCode = 404;
        res.end('Not found');
      });
      return;
    }
    // Navigation request -> always serve the pristine shell.
    res.setHeader('Content-Type', 'text/html');
    res.end(shell);
  });

  await new Promise((resolve) => server.listen(PORT, resolve));

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    for (const route of ROUTES) {
      const page = await browser.newPage();
      await page.goto(`http://localhost:${PORT}${route}`, {
        waitUntil: 'networkidle0',
        timeout: 60000,
      });
      // Give react-helmet-async a moment to flush head tags.
      await new Promise((r) => setTimeout(r, 400));
      const html =
        '<!doctype html>\n' +
        (await page.evaluate(() => document.documentElement.outerHTML));
      await page.close();

      const file = routeToFile(route);
      await mkdir(dirname(file), { recursive: true });
      await writeFile(file, html, 'utf8');
      console.log(`prerendered ${route} -> ${file}`);
    }
  } finally {
    await browser.close();
    server.close();
  }
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Prerender failed:', err);
    process.exit(1);
  });

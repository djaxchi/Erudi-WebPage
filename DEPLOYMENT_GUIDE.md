# 🚀 Deploying Erudi Website to OVH - Complete Guide

## Prerequisites Checklist ✅

- [x] Domain name purchased and configured with OVH
- [x] OVH Web Hosting plan (Performance/Pro recommended for React apps)
- [x] FTP credentials from OVH
- [x] Node.js and npm installed locally
- [x] Production-ready React/Vite application

---

## Step 1: Prepare Your Application for Production 🔧

### 1.1 Update Vite Configuration
First, update your `vite.config.ts` for production deployment:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/', // Change from '/Erudi' to '/' for your domain
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false, // Disable for production
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          animations: ['framer-motion']
        }
      }
    }
  }
})
```

### 1.2 Update React Router Base Path
Update your `src/App.tsx` routes to remove the `/Erudi` prefix:

```tsx
// Change all routes from /Erudi/xxx to /xxx
<Route path="/" element={<Navigate to="/" replace />} />
<Route path="/" element={<LandingPage />} />
<Route path="/about" element={<AboutPage />} />
<Route path="/contact" element={<ContactPage />} />
<Route path="/waitlist" element={<WaitlistPage />} />
```

### 1.3 Update Image Paths
Update all image paths in your components to remove `/Erudi/` prefix:

```tsx
// Change from:
src="/Erudi/images/logo.png"
// To:
src="/images/logo.png"
```

---

## Step 2: Build Your Application 🏗️

### 2.1 Install Dependencies and Build
```bash
# Navigate to your project directory
cd /path/to/your/Erudi-WebPage

# Install dependencies
npm install

# Build for production
npm run build
```

### 2.2 Test the Build Locally
```bash
# Preview the production build
npm run preview
```
Visit `http://localhost:4173` to verify everything works correctly.

---

## Step 3: Configure OVH Hosting 🌐

### 3.1 Access OVH Control Panel
1. Log in to [OVH Control Panel](https://www.ovh.com/manager/)
2. Navigate to `Web Cloud` > `Hosting plans`
3. Select your hosting plan

### 3.2 Configure Domain
1. Go to `Multisite` tab
2. Add your domain name
3. Set the root folder to `www` (default)
4. Enable SSL certificate (Let's Encrypt - Free)

### 3.3 Get FTP Credentials
1. Go to `FTP-SSH` tab
2. Note your FTP credentials:
   - **Server**: `ftp.your-domain.com` or `ftp.cluster0XX.hosting.ovh.net`
   - **Username**: Your OVH username
   - **Password**: Your FTP password (reset if needed)

---

## Step 4: Upload Files to OVH 📤

### 4.1 Option A: Using FTP Client (Recommended)

**Download FileZilla (Free FTP Client):**
1. Download from [https://filezilla-project.org/](https://filezilla-project.org/)
2. Install FileZilla

**Connect to OVH:**
1. Open FileZilla
2. Enter connection details:
   - **Host**: `ftp.your-domain.com`
   - **Username**: Your OVH FTP username
   - **Password**: Your FTP password
   - **Port**: `21`
3. Click `Quickconnect`

**Upload Files:**
1. Navigate to the `www` folder on the server (right panel)
2. Delete default files (like `index.html`)
3. Upload entire contents of your `dist` folder to `www`
4. Upload your `public/images` folder to `www/images`

### 4.2 Option B: Using OVH File Manager

1. In OVH Control Panel, go to `Hosting plans`
2. Click on `File Manager`
3. Navigate to `www` folder
4. Upload your `dist` folder contents
5. Upload your `images` folder

---

## Step 5: Configure Server Settings ⚙️

### 5.1 Create .htaccess File
Create a `.htaccess` file in your `www` folder with the following content:

```apache
# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>

# React Router - Redirect all requests to index.html
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</IfModule>

# Security headers
<IfModule mod_headers.c>
    Header always set X-Frame-Options DENY
    Header always set X-Content-Type-Options nosniff
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>
```

---

## Step 6: Configure DNS (If needed) 🌍

### 6.1 Check DNS Configuration
1. In OVH Control Panel, go to `Domains` > `Your Domain`
2. Click on `DNS Zone` tab
3. Verify these records exist:
   ```
   A     @     Your-Server-IP
   CNAME www   your-domain.com
   ```

### 6.2 SSL Certificate
1. Go to `Web Cloud` > `Hosting plans` > Your plan
2. Click `SSL certificates` tab
3. Order a free Let's Encrypt certificate
4. Wait 15-30 minutes for activation

---

## Step 7: Test Your Deployment 🧪

### 7.1 Basic Tests
1. Visit `https://your-domain.com`
2. Test all navigation links
3. Check that images load correctly
4. Test the contact form
5. Test the waitlist form

### 7.2 Performance Tests
1. Use [PageSpeed Insights](https://pagespeed.web.dev/)
2. Use [GTmetrix](https://gtmetrix.com/)
3. Check mobile responsiveness

---

## Step 8: Set Up Automatic Deployment (Optional) 🔄

### 8.1 GitHub Actions for OVH
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to OVH

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
    
    - name: Deploy to OVH
      uses: SamKirkland/FTP-Deploy-Action@4.3.3
      with:
        server: ftp.your-domain.com
        username: ${{ secrets.FTP_USERNAME }}
        password: ${{ secrets.FTP_PASSWORD }}
        local-dir: ./dist/
        server-dir: ./www/
```

### 8.2 Add GitHub Secrets
1. Go to your GitHub repository
2. Settings > Secrets and variables > Actions
3. Add:
   - `FTP_USERNAME`: Your OVH FTP username
   - `FTP_PASSWORD`: Your OVH FTP password

---

## Step 9: Monitoring and Maintenance 📊

### 9.1 Set Up Monitoring
1. Use OVH's monitoring tools
2. Set up Google Analytics
3. Monitor Core Web Vitals

### 9.2 Regular Updates
1. Keep dependencies updated
2. Monitor for security updates
3. Regular performance audits

---

## Troubleshooting Common Issues 🔧

### Issue 1: 404 Errors on Refresh
- **Cause**: Missing .htaccess file or incorrect rewrite rules
- **Solution**: Ensure .htaccess file is uploaded with correct React Router rules

### Issue 2: Images Not Loading
- **Cause**: Incorrect image paths after removing /Erudi prefix
- **Solution**: Update all image paths to relative paths without /Erudi

### Issue 3: CSS/JS Not Loading
- **Cause**: Incorrect base path in vite.config.ts
- **Solution**: Ensure `base: '/'` in vite.config.ts

### Issue 4: Slow Loading
- **Cause**: Missing compression or caching
- **Solution**: Verify .htaccess compression and caching rules

---

## Performance Optimization Checklist ⚡

- [ ] Enable gzip compression (.htaccess)
- [ ] Set cache headers for static assets
- [ ] Optimize images (WebP format when possible)
- [ ] Minimize bundle size with code splitting
- [ ] Use CDN for static assets (optional)
- [ ] Enable HTTP/2 (automatic with OVH)

---

## Security Checklist 🔒

- [ ] SSL certificate installed and active
- [ ] Security headers configured (.htaccess)
- [ ] Regular backups configured
- [ ] Strong FTP passwords
- [ ] Two-factor authentication on OVH account

---

## Estimated Timeline ⏱️

- **Preparation**: 30 minutes
- **Build Configuration**: 15 minutes
- **File Upload**: 10-30 minutes (depending on connection)
- **DNS/SSL Setup**: 15-60 minutes (propagation time)
- **Testing**: 15 minutes
- **Total**: 1.5 - 2.5 hours

---

## Support Resources 📞

- **OVH Documentation**: [https://docs.ovh.com/](https://docs.ovh.com/)
- **OVH Support**: Available through control panel
- **Community**: OVH Community forums
- **Vite Documentation**: [https://vitejs.dev/](https://vitejs.dev/)

---

## Next Steps After Deployment 🎯

1. **Set up Google Analytics** for traffic monitoring
2. **Configure contact form backend** (if not already done)
3. **Set up email forwarding** for your domain
4. **Create automated backups**
5. **Monitor website performance** regularly

---

Good luck with your deployment! 🚀 Your optimized Erudi website should perform excellently on OVH hosting.

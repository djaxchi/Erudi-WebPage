// Bilingual URL scheme: English lives at the root (/, /opensource, ...) and
// French lives under a /fr prefix (/fr, /fr/opensource, ...). The URL is the
// single source of truth for the page language, which is what lets each route
// be prerendered deterministically in the right language for SEO.

export type Lang = 'en' | 'fr';

/**
 * Split a pathname into its language and language-agnostic base path.
 * "/fr/opensource" -> { lang: 'fr', base: '/opensource' }
 * "/opensource"    -> { lang: 'en', base: '/opensource' }
 * "/fr"            -> { lang: 'fr', base: '/' }
 */
export function parseLangPath(pathname: string): { lang: Lang; base: string } {
  let p = pathname || '/';
  if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1);
  if (p === '/fr' || p.startsWith('/fr/')) {
    const rest = p.slice(3);
    return { lang: 'fr', base: rest === '' ? '/' : rest };
  }
  return { lang: 'en', base: p === '' ? '/' : p };
}

/** Build the URL for a language-agnostic base path in the given language. */
export function withLang(base: string, lang: Lang): string {
  const b = base === '' ? '/' : base;
  if (lang === 'en') return b;
  return b === '/' ? '/fr' : `/fr${b}`;
}

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../i18n/LanguageContext';
import { withLang } from '../i18n/langPath';

export const SITE_URL = 'https://www.erudi.app';
const SITE_NAME = 'Erudi';
const DEFAULT_IMAGE = '/og-image.png';

type JsonLd = Record<string, unknown>;

interface SeoProps {
  title: string;
  description: string;
  /** Language-agnostic route, e.g. "/opensource" (leading slash). Use "/" for home. */
  path: string;
  /** Path or absolute URL to the social image. Defaults to /og-image.png */
  image?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
  jsonLd?: JsonLd | JsonLd[];
  /** Whether a French (/fr) counterpart exists. Off for English-only pages. */
  langAlternates?: boolean;
}

const absoluteUrl = (value: string): string => {
  if (/^https?:\/\//i.test(value)) return value;
  return `${SITE_URL}${value.startsWith('/') ? '' : '/'}${value}`;
};

const Seo: React.FC<SeoProps> = ({
  title,
  description,
  path,
  image = DEFAULT_IMAGE,
  type = 'website',
  noindex = false,
  jsonLd,
  langAlternates = true,
}) => {
  const { lang } = useLanguage();

  const enUrl = absoluteUrl(withLang(path, 'en'));
  const frUrl = absoluteUrl(withLang(path, 'fr'));
  const canonical = langAlternates && lang === 'fr' ? frUrl : enUrl;
  const imageUrl = absoluteUrl(image);
  const robots = noindex ? 'noindex, nofollow' : 'index, follow';
  const ogLocale = lang === 'fr' ? 'fr_FR' : 'en_US';
  const jsonLdArray = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonical} />

      {/* hreflang alternates (bilingual pages only) */}
      {langAlternates && <link rel="alternate" hrefLang="en" href={enUrl} />}
      {langAlternates && <link rel="alternate" hrefLang="fr" href={frUrl} />}
      {langAlternates && <link rel="alternate" hrefLang="x-default" href={enUrl} />}

      {/* Open Graph / Facebook / LinkedIn */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content={ogLocale} />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {jsonLdArray.map((data, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  );
};

export default Seo;

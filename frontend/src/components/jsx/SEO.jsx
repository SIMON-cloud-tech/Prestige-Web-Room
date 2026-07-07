import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';

export const SITE_URL = 'https://prestige-web-room.onrender.com';
const DEFAULT_TITLE = 'Prestige Web Room | Custom Software & Web Development Kenya';
const DEFAULT_DESCRIPTION = 'Prestige Web Room builds custom websites, SaaS platforms, fintech solutions, e-commerce stores, and digital systems tailored for African businesses.';
const DEFAULT_KEYWORDS = 'software development Kenya, web development Kenya, fintech solutions, custom software, e-commerce platforms, SaaS development';
const DEFAULT_IMAGE = '/logo.png';

function buildAbsoluteUrl(path = '/') {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath}`;
}

function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  image = DEFAULT_IMAGE,
  canonicalPath,
  type = 'website',
  schema,
  noindex = false,
}) {
  const location = useLocation();
  const pathname = canonicalPath || location.pathname || '/';
  const pageTitle = title ? `${title} | Prestige Web Room` : DEFAULT_TITLE;
  const pageDescription = description || DEFAULT_DESCRIPTION;
  const pageKeywords = keywords || DEFAULT_KEYWORDS;
  const pageImage = image.startsWith('http') ? image : buildAbsoluteUrl(image);
  const pageUrl = buildAbsoluteUrl(pathname);

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Prestige Web Room',
    url: SITE_URL,
    logo: buildAbsoluteUrl('/logo.png'),
    description: DEFAULT_DESCRIPTION,
    sameAs: [
      'https://www.facebook.com/',
      'https://www.linkedin.com/',
    ],
  };

  const pageSchema = schema || {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: pageTitle,
    description: pageDescription,
    url: pageUrl,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Prestige Web Room',
      url: SITE_URL,
    },
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={pageKeywords} />
        <meta name="author" content="Prestige Web Room" />
        <meta name="robots" content={noindex ? 'noindex,nofollow' : 'index,follow,max-image-preview:large'} />
        <link rel="canonical" href={pageUrl} />

        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content={type} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={pageImage} />
        <meta property="og:site_name" content="Prestige Web Room" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={pageImage} />
        <meta name="theme-color" content="#0f172a" />
      </Helmet>

      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(pageSchema)}
      </script>
    </>
  );
}

export default SEO;

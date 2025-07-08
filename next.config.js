/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

// Toggle this flag if you're deploying with Docker
const dockerDeploymentEnabled = true;

// Control for static HTML export (via ENV)
let exportHtmlEnabled = process.env.EXPORT_ENABLED === 'false' ? false : true;
if (dockerDeploymentEnabled) exportHtmlEnabled = false;

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // Output mode: 'standalone' for Docker, 'export' for static HTML, undefined for standard SSR
  output: dockerDeploymentEnabled
    ? 'standalone'
    : exportHtmlEnabled
    ? 'export'
    : undefined,

  // Prevent source maps in production (optional toggle)
  productionBrowserSourceMaps: false,

  // Unoptimized image delivery (for export mode or simplified setup)
  images: {
    unoptimized: true,
  },

  // Custom file extensions, including .html.jsx for hybrid pages
  pageExtensions: ['html.jsx', 'jsx', 'js', 'tsx', 'ts'],

  // Avoid appending trailing slashes
  trailingSlash: false,

  // Webpack customization
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },

  // Expose ENV to the client
  env: {
    exportHtml: `${exportHtmlEnabled}`,
  },

  // (Optional) Add rewrites, redirects, headers below if needed
  /*
  async rewrites() {
    return [
      {
        source: '/core-api/posts',
        destination: '/api/posts',
      },
      {
        source: '/core-api/hls/:id(\\d+)/:slug',
        destination: '/api/hls/:id(\\d+)/:slug',
      },
    ];
  },

  async redirects() {
    return [
      {
        source: '/',
        destination: process.env.NODE_ENV === 'development' ? '/index.html' : '/',
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: '/about',
        headers: [
          {
            key: 'x-custom-header',
            value: 'my custom header value',
          },
          {
            key: 'x-another-custom-header',
            value: 'my other custom header value',
          },
        ],
      },
    ];
  },
  */
};

module.exports = nextConfig;

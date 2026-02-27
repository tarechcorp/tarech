import { composePlugins, withNx } from '@nx/next';
import { fileURLToPath } from 'url';
import path from 'path';

// Get directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('@nx/next/plugins/with-nx').WithNxOptions} */
const nextConfig = {
  
  output: 'export',
  basePath: '',
  trailingSlash: true,
  images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'images.unsplash.com',
      pathname: '/**',
    },
  ],
  unoptimized: true,
},

  nx: {
    svgr: false, // Disable Nx's built-in SVGR support
  },
  distDir: '.next',
  outputFileTracingRoot: path.join(__dirname, '../../'),
  outputFileTracingExcludes: {
    '*': ['node_modules/**/*'],
  },


    // SEO and performance headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'index, follow',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      // Cache static assets
      {
        source: '/:all*(svg|jpg|png|webp|avif|woff|woff2)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Redirects for SEO
  async redirects() {
    return [
      {
        source: '/index',
        destination: '/',
        permanent: true,
      },
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },

  // Compiler options
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Remove powered by header
  poweredByHeader: false,

  // Enable gzip compression
  compress: true,

  // Generate ETags for better caching
  generateEtags: true,

  // Strict mode for better development
  reactStrictMode: true,

  // SwcMinify for better performance
  swcMinify: true,
};

export default composePlugins(withNx)(nextConfig);

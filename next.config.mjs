import { composePlugins, withNx } from '@nx/next';
import { fileURLToPath } from 'url';
import path from 'path';

// Get directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('@nx/next/plugins/with-nx').WithNxOptions} */
const nextConfig = {
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
};

export default composePlugins(withNx)(nextConfig);
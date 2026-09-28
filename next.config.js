/** @type {import('next').NextConfig} */
const child_process = require('child_process')
const webpack = require('webpack')

let repoName = 'resume-cloudrun'
try {
  const originUrl = child_process
    .execSync('git config --get remote.origin.url')
    .toString()
    .trim()
  repoName = originUrl.split('/').pop().replace(/\.git$/, '')
} catch (e) {
  console.warn('Could not determine repository name:', e)
}

const nextConfig = {
  // Enable standalone output for Docker optimization
  output: 'standalone',

  env: {
    NEXT_PUBLIC_REPO_NAME: repoName,
  },
  
  // Next.js 15 experimental features (disabled for stability)
  experimental: {
    // Enable React 19 features when ready
    reactCompiler: false,
    // Turbo mode for faster builds (can cause issues, disabled for now)
    // turbo: {
    //   rules: {
    //     '*.svg': {
    //       loaders: ['@svgr/webpack'],
    //       as: '*.js',
    //     },
    //   },
    // },
  },
  
  // Webpack configuration for CSS layers and PDF handling
  webpack: (config) => {
    // Preserve existing webpack config for PDF handling
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    
    // Add BannerPlugin to ensure consistent CSS layer definitions
    // This fixes Next.js CSS load order inconsistency issues
    config.plugins = [
      ...(config.plugins ?? []),
      new webpack.BannerPlugin({
        banner: '@layer reset, base, components, pages, utilities, overrides;',
        test: /\.s?css$/,
        raw: true,
        entryOnly: false,
      }),
    ];

    return config;
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
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
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
        ],
      },
      // Immutable static assets (content-hashed by Next.js)
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Images, fonts, and resume PDF
      {
        source: '/(images|resume|fonts)/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=604800, stale-while-revalidate=86400',
          },
        ],
      },
      // HTML pages: always revalidate. The HTML must match the deployed JS, or a
      // stale cached page hydrates against fresh JS and throws a hydration error.
      // no-cache (not no-store) still revalidates every load, but lets the ETag
      // answer 304 and keeps the page eligible for the back/forward cache.
      {
        source: '/',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache',
          },
        ],
      },
      {
        source: '/workflows',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache',
          },
        ],
      },
      // Health endpoints: never cache
      {
        source: '/api/(health|ready)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
        ],
      },
    ]
  },
  
  // Compression
  compress: true,
  
  // Images are pre-sized in public/, so the runtime optimizer is off. That keeps
  // the /_next/image endpoint (and its per-instance encode cost) out of the
  // server entirely.
  images: {
    unoptimized: true,
  },

  // Build-only packages the file tracer pulls into .next/standalone. None are
  // loaded at runtime; leaving them out shrinks the image by roughly half.
  outputFileTracingExcludes: {
    '*': [
      'node_modules/@img/**',
      'node_modules/sharp/**',
      'node_modules/typescript/**',
      'node_modules/webpack/**',
      'node_modules/terser/**',
    ],
  },

  // Enhanced bundling for better performance
  bundlePagesRouterDependencies: true,
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const child_process = require('child_process')
const webpack = require('webpack')

let repoName = 'repository'
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
  
  // Image optimization with Next.js 15 improvements
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    // Next.js 15 image optimization improvements
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Enhanced bundling for better performance
  bundlePagesRouterDependencies: true,
}

module.exports = nextConfig

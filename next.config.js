/** @type {import('next').NextConfig} */
const child_process = require('child_process')

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
  
  // Preserve existing webpack config for PDF handling
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
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
  
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
  },
}

module.exports = nextConfig

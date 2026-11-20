/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
        ],
      },
      {
        source: '/videos/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
          { key: 'Accept-Ranges', value: 'bytes' },
        ],
      },
    ]
  },
  async redirects() {
    return [
      // The standalone /team page was folded into the cohort page; keep the
      // old URL working for existing links and search results.
      { source: '/team', destination: '/cohort#team', permanent: true },
    ]
  },
}

module.exports = nextConfig

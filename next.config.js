/** @type {import('next').NextConfig} */
const nextTranslate = require('next-translate-plugin')

const ContentSecurityPolicy = `
  default-src 'self' https://*.gstatic.com https://recaptcha.net https://*.googleapis.com https://*.cloudinary.com https://*.unsplash.com;
  script-src 'self' 'unsafe-eval' https://recaptcha.net https://*.gstatic.com;
  child-src 'self';
  style-src 'self' 'unsafe-hashes' 'unsafe-inline' https://*.googleapis.com;
  img-src 'self' blob: data: https:;
  frame-src 'self' https://*.google.com https://recaptcha.net;
`

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
  }
]

const nextConfig = nextTranslate({
  reactStrictMode: true,
  webpack: (config, { isServer, webpack }) => {
    return config;
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  }
})

module.exports = nextConfig

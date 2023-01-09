/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: "custom",
    loaderFile: "./loader.js",
  },
  async headers() {
    return [
      {
        source: '/',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://one.relayx.io; style-src 'self' 'unsafe-inline'; img-src 'self' https://avatar.relayx.com https://a.relayx.com https://berry2.relayx.com data:; font-src 'self'; connect-src 'self' https://askbitcoin.ai https://askbitcoin.com https://api.whatsonchain.com https://staging-backend.relayx.com; frame-src 'self' https://one.relayx.io; object-src 'self'; media-src 'self';"
          },
        ]
      }
    ]
  }
};

module.exports = nextConfig;

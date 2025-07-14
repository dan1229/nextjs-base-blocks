/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // The App Router is stable in Next.js 14, but keeping this for compatibility
    appDir: true,
  },
}

module.exports = nextConfig
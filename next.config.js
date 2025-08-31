const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // only needed to get local nextjs base blocks builds working
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
    additionalData: `@import "mixins.scss";`,
  },
};

module.exports = nextConfig;

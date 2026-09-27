const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // only needed to get local nextjs base blocks builds working
  sassOptions: {
    // `includePaths` is the legacy Dart Sass API's key and `loadPaths` the modern one's; only
    // one is honored per run, and `@use` resolution needs whichever the host's sass supports.
    includePaths: [path.join(__dirname, 'src/styles')],
    loadPaths: [path.join(__dirname, 'src/styles')],
    additionalData: `@use "mixins.scss" as *;`,
  },
};

module.exports = nextConfig;

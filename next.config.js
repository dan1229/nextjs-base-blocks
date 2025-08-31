/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    // Automatically import mixins.scss into all SCSS files
    // This makes responsive mixins available globally without manual imports
    additionalData: `@import "mixins.scss";`,
  },
};

module.exports = nextConfig;

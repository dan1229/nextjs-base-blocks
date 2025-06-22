import { defineConfig } from 'cypress';
import webpack from 'webpack';

export default defineConfig({
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
      webpackConfig: {
        plugins: [
          new webpack.NormalModuleReplacementPlugin(/\.module\.(scss|sass|css)$/, (resource: any) => {
            resource.request = 'data:text/javascript,export default new Proxy({}, { get: () => "" });';
          }),
        ],
      },
    },
    specPattern: 'cypress/component/**/[^_]*.cy.{js,jsx,ts,tsx}',
    indexHtmlFile: 'cypress/support/component-index.html',
    supportFile: 'cypress/support/component.ts',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true,
  },
  e2e: {
    baseUrl: 'http://localhost:3000',
    pageLoadTimeout: 120000,
    setupNodeEvents(on, config) {
      // TODO fix code coverage
      // require('@cypress/code-coverage/task')(on, config);
      // on('file:preprocessor', require('@cypress/code-coverage/use-babelrc'));

      return config;
    },
    retries: {
      runMode: 2,
      openMode: 1,
    },
  },
});

import { defineConfig } from 'cypress';
import webpack from 'webpack';

export default defineConfig({
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
      webpackConfig: {
        module: {
          rules: [
            {
              test: /\.(js|jsx|ts|tsx)$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: [
                    ['@babel/preset-env', { targets: { node: 'current' } }],
                    ['@babel/preset-react', { runtime: 'automatic' }],
                    '@babel/preset-typescript',
                  ],
                  plugins: [
                    [
                      'babel-plugin-istanbul',
                      {
                        exclude: ['**/*.cy.*', '**/cypress/**', '**/node_modules/**', '**/*.config.*', '**/pages/**', '**/next-env.d.ts'],
                      },
                    ],
                  ],
                },
              },
            },
          ],
        },
        plugins: [
          new webpack.NormalModuleReplacementPlugin(/\.module\.(scss|sass|css)$/, (resource: any) => {
            resource.request = 'data:text/javascript,export default new Proxy({}, { get: () => "" });';
          }),
          // Mock next/navigation for component testing
          new webpack.NormalModuleReplacementPlugin(/^next\/navigation$/, (resource: any) => {
            resource.request =
              'data:text/javascript,' +
              encodeURIComponent(`
              const mockRouter = {
                push: () => Promise.resolve(true),
                replace: () => Promise.resolve(true),
                back: () => {},
                forward: () => {},
                refresh: () => {},
                pathname: '/',
                query: {},
                asPath: '/',
              };
              
              export const useRouter = () => mockRouter;
              export const usePathname = () => '/';
              export const useSearchParams = () => new URLSearchParams();
              export const redirect = () => {};
              export const permanentRedirect = () => {};
              export const notFound = () => {};
            `);
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
    setupNodeEvents(on, config) {
      // Enable code coverage for component tests
      require('@cypress/code-coverage/task')(on, config);
      return config;
    },
  },
  e2e: {
    baseUrl: 'http://localhost:3000',
    pageLoadTimeout: 120000,
    setupNodeEvents(on, config) {
      // Enable code coverage
      require('@cypress/code-coverage/task')(on, config);
      on('file:preprocessor', require('@cypress/code-coverage/use-babelrc'));

      return config;
    },
    retries: {
      runMode: 2,
      openMode: 1,
    },
  },
});

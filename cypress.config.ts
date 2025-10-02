import { defineConfig } from 'cypress';
import webpack from 'webpack';

export default defineConfig({
  component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack',
      webpackConfig: {
        module: {
          rules: [
            {
              test: /\.(js|jsx|ts|tsx)$/,
              exclude: /node_modules\/(?!react-icons)/,
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
                        exclude: [
                          '**/*.cy.*',
                          '**/cypress/**',
                          '**/node_modules/**',
                          '**/*.config.*',
                          '**/pages/**',
                          '**/app/**',
                          '**/next-env.d.ts',
                          '**/demo_components/**',
                        ],
                      },
                    ],
                  ],
                },
              },
            },
            // Special handling for react-icons to avoid Next.js restrictions
            {
              test: /node_modules\/react-icons\/.*\.(mjs|js)$/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: [
                    ['@babel/preset-env', { targets: { node: 'current' } }],
                    ['@babel/preset-react', { runtime: 'automatic' }],
                  ],
                },
              },
            },
            {
              test: /\.(scss|sass|css)$/,
              use: ['style-loader', 'css-loader', 'sass-loader'],
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
          // Mock next/link for component testing
          new webpack.NormalModuleReplacementPlugin(/^next\/link$/, (resource: any) => {
            resource.request =
              'data:text/javascript,' +
              encodeURIComponent(`
              import React from 'react';
              
              const Link = ({ href, children, ...props }) => {
                return React.createElement('a', { href, ...props }, children);
              };
              
              export default Link;
            `);
          }),
          // Mock next/image for component testing
          new webpack.NormalModuleReplacementPlugin(/^next\/image$/, (resource: any) => {
            resource.request =
              'data:text/javascript,' +
              encodeURIComponent(`
              import React from 'react';
              
              const Image = ({ src, alt, ...props }) => {
                return React.createElement('img', { src, alt, ...props });
              };
              
              export default Image;
            `);
          }),
        ],
        resolve: {
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs'],
          alias: {
            'next/navigation': false,
            'next/link': false,
            'next/image': false,
          },
        },
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
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      require('@cypress/code-coverage/task')(on, config);
      return config;
    },
  },
  e2e: {
    baseUrl: 'http://localhost:3000',
    pageLoadTimeout: 120000,
    setupNodeEvents(on, config) {
      // Enable code coverage
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      require('@cypress/code-coverage/task')(on, config);
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      on('file:preprocessor', require('@cypress/code-coverage/use-babelrc'));

      return config;
    },
    retries: {
      runMode: 2,
      openMode: 1,
    },
  },
});

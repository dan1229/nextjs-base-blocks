module.exports = {
  extends: '@istanbuljs/nyc-config-typescript',
  all: true,
  include: ['src/**/*.{js,jsx,ts,tsx}'],
  exclude: ['**/*.cy.*', 'cypress/**', 'node_modules/**', '**/*.config.*', 'pages/**', '**/*.d.ts', 'coverage/**', 'dist/**', '.next/**'],
  reporter: ['text', 'text-summary', 'html', 'json', 'lcov'],
  'report-dir': 'coverage',
  'temp-dir': '.nyc_output',
};

/**
 * Helper to configure NextJS to automatically import Base Blocks SCSS mixins
 * 
 * This eliminates the need to manually copy mixins.scss to your project.
 * The mixins will be automatically available in all your SCSS files.
 */

const path = require('path');

/**
 * Configure SASS options for submodule usage
 * 
 * @param {string} projectDir - Your project's root directory (use __dirname)
 * @param {string} stylesDir - Your project's styles directory (relative to projectDir)
 * @param {string} submodulePath - Path to the base_blocks submodule (default: 'base_blocks')
 * @returns {object} SASS configuration object for next.config.js
 * 
 * @example
 * // In your next.config.js:
 * const { configureSubmoduleSass } = require('./base_blocks/mixins');
 * 
 * const nextConfig = {
 *   sassOptions: configureSubmoduleSass(__dirname),
 * };
 */
function configureSubmoduleSass(
  projectDir,
  stylesDir = 'styles',
  submodulePath = 'base_blocks'
) {
  const clientStylesPath = path.join(projectDir, stylesDir);
  const baseBlocksPath = path.join(projectDir, submodulePath, 'src', 'styles');

  return {
    includePaths: [clientStylesPath, baseBlocksPath],
    additionalData: `@import "mixins.scss";`,
  };
}

module.exports = {
  configureSubmoduleSass,
};

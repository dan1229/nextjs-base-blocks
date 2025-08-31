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
  const fs = require('fs');
  const clientStylesPath = path.join(projectDir, stylesDir);
  const baseBlocksPath = path.join(projectDir, submodulePath, 'src', 'styles');
  const mixinsPath = path.join(baseBlocksPath, 'mixins.scss');

  // Verify the mixins file exists
  if (!fs.existsSync(mixinsPath)) {
    console.error('🚨 Base Blocks Setup Error');
    console.error('============================');
    console.error(`❌ Could not find mixins.scss at: ${mixinsPath}`);
    console.error(`💡 Make sure base_blocks is installed in: ${path.join(projectDir, submodulePath)}`);
    console.error('📖 For setup help, see: base_blocks/README.md');
    console.error('');
  }

  return {
    includePaths: [clientStylesPath, baseBlocksPath],
    additionalData: `@import "mixins.scss";`,
  };
}

module.exports = {
  configureSubmoduleSass,
};

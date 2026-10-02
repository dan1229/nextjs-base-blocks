/**
 * Vite plugin for hosts that are not NextJS.
 *
 * It does two things:
 * - swaps the blocks' NextJS routing primitives (`src/framework/*`) for the generic ones
 *   (`src/framework/generic/*`), so nothing imports `next`
 * - makes the Base Blocks SCSS mixins available in every SCSS file, the same way
 *   `configureSubmoduleSass` does for NextJS
 */

const path = require('path');
const { configureSubmoduleSass } = require('./mixins');

const FRAMEWORK_MODULES = ['link', 'image', 'navigation'];

/**
 * @param {string} projectDir - Your project's root directory
 * @param {string} stylesDir - Your project's styles directory (relative to projectDir)
 * @param {string} submodulePath - Path to the base_blocks submodule (default: 'base_blocks')
 * @returns {object} Vite plugin
 *
 * @example
 * // In your vite.config.mts:
 * import { baseBlocksVite } from './base_blocks/vite.js';
 *
 * export default defineConfig({
 *   plugins: [baseBlocksVite(import.meta.dirname), react()],
 * });
 */
function baseBlocksVite(projectDir, stylesDir = 'styles', submodulePath = 'base_blocks') {
  const frameworkDir = path.join(projectDir, submodulePath, 'src', 'framework');
  const sass = configureSubmoduleSass(projectDir, stylesDir, submodulePath);

  return {
    name: 'base-blocks',
    enforce: 'pre',
    config() {
      return {
        css: {
          preprocessorOptions: {
            scss: { loadPaths: sass.loadPaths, additionalData: sass.additionalData },
          },
        },
      };
    },
    async resolveId(source, importer, options) {
      if (!importer || !/framework\/(link|image|navigation)$/.test(source)) return null;

      const resolved = await this.resolve(source, importer, { ...options, skipSelf: true });
      if (!resolved) return null;

      const file = resolved.id.split('?')[0];
      const name = path.basename(file, path.extname(file));
      if (path.dirname(file) !== frameworkDir || !FRAMEWORK_MODULES.includes(name)) return resolved;

      return this.resolve(path.join(frameworkDir, 'generic', name), importer, { ...options, skipSelf: true });
    },
  };
}

module.exports = {
  baseBlocksVite,
};

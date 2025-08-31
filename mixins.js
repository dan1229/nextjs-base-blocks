// Helper to configure NextJS to automatically import Base Blocks mixins
// Usage: const { configureSass } = require('nextjs-base-blocks/mixins');
// Then in next.config.js: sassOptions: configureSass(__dirname)

const path = require('path');

function configureSass(projectDir) {
  const baseBlocksPath = path.join(projectDir, 'node_modules', 'nextjs-base-blocks', 'src', 'styles');
  
  return {
    includePaths: [baseBlocksPath],
    additionalData: `@import "mixins.scss";`,
  };
}

// For submodule usage
function configureSubmoduleSass(projectDir, submodulePath = 'nextjs-base-blocks') {
  const baseBlocksPath = path.join(projectDir, submodulePath, 'src', 'styles');
  
  return {
    includePaths: [baseBlocksPath],
    additionalData: `@import "mixins.scss";`,
  };
}

module.exports = {
  configureSass,
  configureSubmoduleSass,
};
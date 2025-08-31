// Helper to configure NextJS to automatically import Base Blocks mixins
// TODO improve docs

const path = require('path');

// For submodule usage
function configureSubmoduleSass(
  projectDir,
  // the client project's 'styles' directory
  includePaths = path.join(__dirname, 'styles'),
  submodulePath = 'base_blocks'
) {
  const baseBlocksPath = path.join(projectDir, submodulePath, 'src', 'styles');

  return {
    includePaths: [includePaths, baseBlocksPath],
    additionalData: `@import "mixins.scss";`,
  };
}

module.exports = {
  configureSubmoduleSass,
};

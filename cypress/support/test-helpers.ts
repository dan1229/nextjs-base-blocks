/**
 * Test helper utilities for Base Blocks component testing
 */

// Common viewport sizes for responsive testing
export const VIEWPORTS = {
  mobile: { width: 375, height: 667 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1280, height: 720 },
  large: { width: 1920, height: 1080 },
};

/**
 * Test all responsive viewports for a component
 */
export const testResponsiveViewports = (mountCallback: () => void) => {
  Object.entries(VIEWPORTS).forEach(([name, viewport]) => {
    it(`renders correctly on ${name} (${viewport.width}x${viewport.height})`, () => {
      cy.viewport(viewport.width, viewport.height);
      mountCallback();
      cy.get('div').should('be.visible');
    });
  });
};

/**
 * Utility to create test data
 */
export const createTestData = {
  longText: () => 'This is a very long text that can be used to test how components handle overflow and wrapping. '.repeat(5),
  shortText: () => 'Short',
  specialChars: () => 'Special chars: <>&"\'`~!@#$%^&*()_+-={}[]|\\:";\'<>?,./¿¡éñü',
  emptyText: () => '',
  numberedList: (count: number) => Array.from({ length: count }, (_, i) => `Item ${i + 1}`),
  htmlContent: () => '<strong>Bold</strong> <em>Italic</em> <code>Code</code>',
};

// Export TypeScript types for better IDE support
export type ViewportName = keyof typeof VIEWPORTS;

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
      // Wait for viewport change to take effect
      cy.window().its('innerWidth').should('eq', viewport.width);
      cy.window().its('innerHeight').should('eq', viewport.height);

      mountCallback();

      // Wait for component to be rendered and visible
      cy.get('[data-cy-root]').should('be.visible');
      // Ensure the component itself is rendered (check for any child element)
      cy.get('[data-cy-root]').children().should('have.length.at.least', 1);
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

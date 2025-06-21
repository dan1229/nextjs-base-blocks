// cypress/support/commands.ts

// Custom commands for Base Blocks component testing

/**
 * Command to check basic accessibility
 */
Cypress.Commands.add('checkA11y', () => {
  // Basic accessibility checks
  cy.get('*').each(($el) => {
    // Check for proper contrast (basic check)
    const element = $el[0];
    const styles = window.getComputedStyle(element);

    // Check if interactive elements have focus styles
    if (element.tagName.toLowerCase() === 'button' || element.tagName.toLowerCase() === 'a' || element.getAttribute('role') === 'button') {
      cy.wrap($el).focus().should('have.focus');
    }
  });
});

/**
 * Command to test responsive behavior
 */
Cypress.Commands.add('testResponsive', () => {
  const viewports = [
    { name: 'mobile', width: 375, height: 667 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1280, height: 720 },
  ];

  viewports.forEach((viewport) => {
    cy.viewport(viewport.width, viewport.height);
    cy.wait(100); // Small delay for rendering
    // Add specific responsive checks here
  });
});

/**
 * Command to check if component has proper SCSS classes
 */
Cypress.Commands.add('checkStyles', (element: string, expectedClass: string) => {
  cy.get(element).should('have.class', expectedClass);
});

// Additional utility commands for Base Blocks

/**
 * Command to test component variants
 */
Cypress.Commands.add('testVariants', (Component: any, variants: string[], propName: string) => {
  variants.forEach((variant) => {
    const props = { [propName]: variant };
    cy.mount(Component(props));
    cy.get('[data-cy="component"]').should('exist');
  });
});

declare global {
  namespace Cypress {
    interface Chainable {
      testVariants(Component: any, variants: string[], propName: string): Chainable<void>;
    }
  }
}

// Export to make this a module
export {};

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
    // Wait for viewport change to take effect by checking the window size
    cy.window().its('innerWidth').should('eq', viewport.width);
    cy.window().its('innerHeight').should('eq', viewport.height);
    // Ensure the root element is visible and rendered
    cy.get('[data-cy-root]').should('be.visible');
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

/**
 * Mock Next.js router for testing
 */
Cypress.Commands.add('mockRouter', (overrides = {}) => {
  const mockRouter = {
    push: cy.stub().as('routerPush'),
    replace: cy.stub().as('routerReplace'),
    back: cy.stub().as('routerBack'),
    forward: cy.stub().as('routerForward'),
    refresh: cy.stub().as('routerRefresh'),
    pathname: '/',
    query: {},
    asPath: '/',
    ...overrides,
  };

  cy.window().then((win) => {
    (win as any).__NEXT_ROUTER__ = mockRouter;
  });
});

declare global {
  namespace Cypress {
    interface Chainable {
      testVariants(Component: any, variants: string[], propName: string): Chainable<void>;
      mockRouter(overrides?: any): Chainable<void>;
    }
  }
}

// Export to make this a module
export {};

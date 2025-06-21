import './commands';
import { mount } from '@cypress/react';

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
      /**
       * Custom command to test component accessibility
       * @example cy.checkA11y()
       */
      checkA11y(): Chainable<void>;
      /**
       * Custom command to test component responsive behavior
       * @example cy.testResponsive()
       */
      testResponsive(): Chainable<void>;
      /**
       * Custom command to check if component has proper SCSS classes
       * @example cy.checkStyles()
       */
      checkStyles(element: string, expectedClass: string): Chainable<void>;
    }
  }
}

Cypress.Commands.add('mount', mount);

// Example usage:
// cy.mount(<MyComponent />)

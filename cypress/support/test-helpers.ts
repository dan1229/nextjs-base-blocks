/**
 * Test helper utilities for Base Blocks component testing
 */

import React from 'react';

// Common viewport sizes for responsive testing
export const VIEWPORTS = {
  mobile: { width: 375, height: 667 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1280, height: 720 },
  large: { width: 1920, height: 1080 }
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
 * Test multiple variants of a component
 */
export const testVariants = <T>(
  Component: React.ComponentType<T>,
  variants: Array<{ name: string; props: Partial<T> }>,
  additionalChecks?: (variantName: string) => void
) => {
  variants.forEach(({ name, props }) => {
    it(`renders ${name} variant correctly`, () => {
      cy.mount(React.createElement(Component, props as T));
      cy.get('[data-cy="component"]').should('exist');
      if (additionalChecks) {
        additionalChecks(name);
      }
    });
  });
};

/**
 * Test accessibility features
 */
export const testAccessibility = (mountCallback: () => void) => {
  describe('Accessibility', () => {
    beforeEach(() => {
      mountCallback();
    });

    it('is keyboard navigable', () => {
      cy.get('button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])').each(($el) => {
        cy.wrap($el).focus().should('have.focus');
      });
    });

    it('has proper focus management', () => {
      cy.get('body').focus();
      cy.focused().should('exist');
    });
  });
};

/**
 * Test component props systematically
 */
export const testComponentProps = <T>(
  Component: React.ComponentType<T>,
  propTests: Array<{
    propName: keyof T;
    values: T[keyof T][];
    testFn?: (value: T[keyof T]) => void;
  }>
) => {
  propTests.forEach(({ propName, values, testFn }) => {
    describe(`${String(propName)} prop`, () => {
      values.forEach((value) => {
        it(`works with ${String(propName)}="${String(value)}"`, () => {
          const props = { [propName]: value } as Partial<T>;
          cy.mount(React.createElement(Component, props as T));
          cy.get('[data-cy="component"]').should('exist');
          if (testFn) {
            testFn(value);
          }
        });
      });
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

/**
 * Custom commands for Base Blocks testing
 */
export const customCommands = {
  /**
   * Mount component with data-cy attribute for easier testing
   */
  mountWithTestId: (component: React.ReactElement, testId = 'component') => {
    const wrappedComponent = React.cloneElement(component, {
      'data-cy': testId,
      ...component.props
    });
    return cy.mount(wrappedComponent);
  },

  /**
   * Test component loading states
   */
  testLoadingState: (Component: React.ComponentType<any>, loadingProp = 'loading') => {
    const props = { [loadingProp]: true };
    cy.mount(<Component {...props} />);
    cy.get('[data-cy="loading"]').should('exist');
  }
};

/**
 * Common test scenarios for all Base Blocks components
 */
export const commonComponentTests = <T>(
  Component: React.ComponentType<T>,
  defaultProps: Partial<T>,
  componentName: string
) => {
  describe(`${componentName} - Common Tests`, () => {
    it('renders without crashing', () => {
      cy.mount(React.createElement(Component, defaultProps as T));
      cy.get('*').should('exist');
    });

    it('accepts custom className', () => {
      const props = { ...defaultProps, className: 'custom-test-class' } as T;
      cy.mount(React.createElement(Component, props));
      cy.get('.custom-test-class').should('exist');
    });

    it('handles ref forwarding', () => {
      // This would need to be implemented based on your components
      // cy.mount(React.createElement(Component, { ...defaultProps, ref }));
    });

    describe('Responsive behavior', () => {
      testResponsiveViewports(() => {
        cy.mount(React.createElement(Component, defaultProps as T));
      });
    });
  });
};

// Export TypeScript types for better IDE support
export type ViewportName = keyof typeof VIEWPORTS;
export type TestVariant<T> = { name: string; props: Partial<T> };
export type PropTest<T> = {
  propName: keyof T;
  values: T[keyof T][];
  testFn?: (value: T[keyof T]) => void;
}; 
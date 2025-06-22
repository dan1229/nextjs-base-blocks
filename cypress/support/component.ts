// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

import { mount } from '@cypress/react';

// Override module resolution for CSS modules
const originalRequire = (globalThis as any).require;

// Mock CSS modules to return class names that match the actual styles
const createCSSModuleMock = (moduleName: string) => {
  const classNames: Record<string, string> = {};

  // Extract component name from path (e.g., './styles.module.scss' -> component name from context)
  const getClassName = (key: string) => `${key}`;

  return new Proxy(classNames, {
    get(target, prop: string) {
      if (!target[prop]) {
        target[prop] = getClassName(prop);
      }
      return target[prop];
    },
  });
};

// Inject actual styles for components
const injectComponentStyles = () => {
  const stylesId = 'cypress-component-styles';
  if (document.getElementById(stylesId)) return;

  const styleElement = document.createElement('style');
  styleElement.id = stylesId;
  styleElement.textContent = `
    /* BBAlert Styles */
    .base {
      background-color: var(--info-light-color, #ffc800);
      padding: 12px;
      margin: 12px 0px;
      border-radius: var(--alert-border-radius, 4px);
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
    .base > * {
      color: var(--white, #ffffff) !important;
    }
    .base > h1, .base > h2, .base > h3, .base > h4, .base > h5, .base > p {
      width: 100%;
    }
    .clickable {
      cursor: pointer;
    }
    .dismissButton {
      cursor: pointer;
      color: var(--white, #ffffff);
      margin-left: 8px;
      min-width: 20px;
      height: 20px;
    }
    .dismissButton:hover {
      color: var(--danger-color, #78cdd7);
    }
    .color_success {
      background-color: var(--success-light-color, #50c758);
    }
    .color_warning {
      background-color: var(--warning-color, #f1c500);
    }
    .color_warning > div {
      color: var(--black, #232323) !important;
    }
    .color_danger {
      background-color: var(--danger-light-color, #78cdd7);
    }
    .color_info {
      background-color: var(--info-light-color, #ffc800);
    }
    .elevation_none {
      box-shadow: none;
    }
    .elevation_low {
      box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.2);
    }
    .elevation_med {
      box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.2);
    }
    .elevation_high {
      box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.2);
    }
    .text_left {
      text-align: left;
    }
    .text_center {
      text-align: center;
    }
    .text_right {
      text-align: right;
    }

    /* BBButton Styles */
    .bbbutton_base {
      padding: var(--button-base-padding, 8px 16px);
      border-radius: var(--button-border-radius, 4px);
      border: none;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      transition: all 0.2s ease;
    }
    .bbbutton_primary {
      background-color: var(--color-primary, #007bff);
      color: var(--color-white, #ffffff);
    }
    .bbbutton_secondary {
      background-color: var(--color-secondary, #6c757d);
      color: var(--color-white, #ffffff);
    }
    .bbbutton_base:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* BBCard Styles */
    .bbcard_base {
      background: var(--color-white, #ffffff);
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      padding: 20px;
      margin: 10px 0;
    }

    /* BBText Styles */
    .bbtext_base {
      font-family: inherit;
      margin: 0;
      padding: 0;
    }
  `;

  document.head.appendChild(styleElement);
};

// Mock CSS module imports
if (typeof window !== 'undefined') {
  // Override require to mock CSS modules
  const moduleCache = new Map();

  (window as any).__mockCSSModule = (modulePath: string) => {
    if (moduleCache.has(modulePath)) {
      return moduleCache.get(modulePath);
    }

    const mock = createCSSModuleMock(modulePath);
    moduleCache.set(modulePath, mock);
    return mock;
  };
}

// Ensure proper DOM structure and inject styles
beforeEach(() => {
  // Make sure document head exists
  if (!document.head) {
    const head = document.createElement('head');
    document.documentElement.insertBefore(head, document.body);
  }

  // Inject component styles
  injectComponentStyles();
});

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

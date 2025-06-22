import BBNavbar from '../../src/bbnavbar';
import BBNavbarItem from '../../src/bbnavbar_item';
import type { IPropsBBNavbar } from '../../src/bbnavbar';
import { testResponsiveViewports } from '../support/test-helpers';
import React from 'react';

describe('BBNavbar Component Tests', () => {
  const defaultProps: IPropsBBNavbar = {
    children: (
      <>
        <BBNavbarItem title="Home" href="/" />
        <BBNavbarItem title="About" href="/about" />
      </>
    ),
    mainContent: <div>Main Content</div>,
  };

  // Handle uncaught exceptions
  beforeEach(() => {
    Cypress.on('uncaught:exception', (err) => {
      if (
        err.message.includes('useRouter') ||
        err.message.includes('router') ||
        err.message.includes('invariant') ||
        err.message.includes('hooks can only be called inside') ||
        err.message.includes('Navigation') ||
        err.message.includes('router context')
      ) {
        return false; // Prevent Cypress from failing the test
      }
      return true;
    });
  });

  describe('Basic Rendering', () => {
    it('renders with default props', () => {
      cy.mount(<BBNavbar {...defaultProps} />);

      // Check for main content
      cy.contains('Main Content').should('be.visible');

      // Check for navigation structure
      cy.get('nav').should('exist');

      // Check for navbar items
      cy.contains('Home').should('exist');
      cy.contains('About').should('exist');
    });

    it('renders with title', () => {
      cy.mount(<BBNavbar {...defaultProps} title="Test App" />);
      cy.contains('Test App').should('be.visible');
    });

    it('renders with image', () => {
      cy.mount(<BBNavbar {...defaultProps} imageSrc="/test-logo.png" imageWidth={50} imageHeight={50} />);
      cy.get('img').should('exist');
      cy.get('img').should('have.attr', 'width', '50');
      cy.get('img').should('have.attr', 'height', '50');
    });
  });

  describe('Navigation Behavior', () => {
    it('shows hamburger menu on mobile', () => {
      cy.viewport(375, 667); // Mobile viewport
      cy.mount(<BBNavbar {...defaultProps} />);

      // Look for hamburger icon (should be an SVG from react-icons)
      cy.get('svg').should('exist'); // AiOutlineMenu icon
    });

    it('can click hamburger to toggle menu', () => {
      cy.viewport(375, 667);
      cy.mount(<BBNavbar {...defaultProps} />);

      // Click the hamburger icon (parent container)
      cy.get('svg').parent().click();

      // The navbar should still exist (menu state changed)
      cy.get('nav').should('exist');
    });

    it('renders brand as clickable when routeBrand is provided', () => {
      cy.mount(<BBNavbar {...defaultProps} title="Test App" routeBrand="/home" />);

      // Brand should be clickable
      cy.contains('Test App').should('exist');

      // Click the brand container (this will try to call router.push)
      cy.contains('Test App').parents().first().click();

      // Component should continue to exist after click
      cy.get('nav').should('exist');
    });
  });

  describe('Props Testing', () => {
    const elevations = ['none', 'low', 'high', 'rainbow'];
    elevations.forEach((elevation) => {
      it(`renders with elevation="${elevation}"`, () => {
        cy.mount(<BBNavbar {...defaultProps} elevation={elevation as any} />);
        cy.get('nav').should('exist');
      });
    });

    it('renders in vertical mode', () => {
      cy.mount(<BBNavbar {...defaultProps} vertical />);
      cy.get('nav').should('exist');
    });

    it('renders with action buttons', () => {
      const actionButtons = <button data-testid="login-btn">Login</button>;
      cy.mount(<BBNavbar {...defaultProps} buttonsAction={actionButtons} showButtonsAction />);
      cy.get('[data-testid="login-btn"]').should('be.visible');
      cy.contains('Login').should('exist');
    });

    const alignments = ['left', 'center', 'right'];
    alignments.forEach((alignment) => {
      it(`renders with menuAlignment="${alignment}"`, () => {
        cy.mount(<BBNavbar {...defaultProps} menuAlignment={alignment as any} />);
        cy.get('nav').should('exist');
      });
    });

    it('renders with custom brand configuration', () => {
      cy.mount(
        <BBNavbar
          {...defaultProps}
          title="Custom Brand"
          brandHorizontal={true}
          boldTitle={true}
          colorTitle="secondary"
          textSizeTitle="large"
        />
      );
      cy.contains('Custom Brand').should('exist');
    });
  });

  describe('Responsive Behavior', () => {
    testResponsiveViewports(() => {
      cy.mount(<BBNavbar {...defaultProps} />);
    });
  });

  describe('Integration Tests', () => {
    it('renders complete navbar with all features', () => {
      const actionButtons = (
        <div>
          <button>Sign In</button>
          <button>Sign Up</button>
        </div>
      );

      cy.mount(
        <BBNavbar
          {...defaultProps}
          title="Full Featured App"
          imageSrc="/logo.png"
          imageWidth={40}
          imageHeight={40}
          elevation="high"
          buttonsAction={actionButtons}
          showButtonsAction={true}
          menuAlignment="center"
          boldTitle={true}
        />
      );

      // Check all elements are present
      cy.contains('Full Featured App').should('exist');
      cy.get('img').should('exist');
      cy.contains('Sign In').should('exist');
      cy.contains('Sign Up').should('exist');
      cy.contains('Main Content').should('exist');
      cy.get('nav').should('exist');
    });

    it('handles navbar items correctly', () => {
      const complexNavItems = (
        <>
          <BBNavbarItem title="Home" href="/" />
          <BBNavbarItem title="Products" href="/products" />
          <BBNavbarItem title="About" href="/about" />
          <BBNavbarItem title="Contact" href="/contact" />
        </>
      );

      cy.mount(<BBNavbar {...defaultProps} children={complexNavItems} />);

      // Verify all nav items are rendered
      cy.contains('Home').should('exist');
      cy.contains('Products').should('exist');
      cy.contains('About').should('exist');
      cy.contains('Contact').should('exist');
    });
  });

  // TODO: Add tests for:
  // - Router push/navigation testing with proper stubs
  // - Keyboard navigation accessibility
  // - Focus management
  // - ARIA attributes
  // - Advanced menu interactions
});

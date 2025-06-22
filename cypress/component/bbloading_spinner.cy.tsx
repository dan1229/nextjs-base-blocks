import BBLoadingSpinner from '../../src/bbloading_spinner';
import type { IPropsBBLoadingSpinner } from '../../src/bbloading_spinner';
import { testResponsiveViewports } from '../support/test-helpers';

describe('BBLoadingSpinner Component Tests', () => {
  const defaultProps: IPropsBBLoadingSpinner = {};

  beforeEach(() => {
    cy.viewport(1280, 720);
  });

  describe('Basic Rendering', () => {
    it('renders with default props', () => {
      cy.mount(<BBLoadingSpinner {...defaultProps} />);
      cy.get('div').should('exist');
    });

    it('renders with custom className', () => {
      cy.mount(<BBLoadingSpinner {...defaultProps} className="custom-class" />);
      cy.get('.custom-class').should('exist');
    });
  });

  describe('Props Testing', () => {
    // Variant testing
    const variants = ['default', 'double circle', 'circle bounce', 'spinning square'];
    variants.forEach((variant) => {
      it(`renders with variant="${variant}"`, () => {
        cy.mount(<BBLoadingSpinner {...defaultProps} variant={variant as any} />);
        cy.get('div').should('exist');
      });
    });

    // Size testing
    const sizes = ['sm', 'md', 'lg'];
    sizes.forEach((size) => {
      it(`renders with size="${size}"`, () => {
        cy.mount(<BBLoadingSpinner {...defaultProps} size={size as any} />);
        cy.get('div').should('exist');
      });
    });

    // Color testing
    const colors = ['primary', 'secondary', 'accent', 'danger', 'success', 'warning', 'info', 'black', 'white'];
    colors.forEach((color) => {
      it(`renders with color="${color}"`, () => {
        cy.mount(<BBLoadingSpinner {...defaultProps} color={color as any} />);
        cy.get('div').should('exist');
      });
    });

    it('renders with custom color string', () => {
      cy.mount(<BBLoadingSpinner {...defaultProps} color="#ff0000" as any />);
      cy.get('div').should('exist');
    });
  });

  describe('Responsive Behavior', () => {
    testResponsiveViewports(() => {
      cy.mount(<BBLoadingSpinner {...defaultProps} />);
    });
  });

  // TODO: Test animation behavior
  // TODO: Test loading states and timing
  // TODO: Add accessibility tests for screen readers
});

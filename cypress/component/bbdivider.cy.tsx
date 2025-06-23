import BBDivider from '../../src/bbdivider';
import type { IPropsBBDivider } from '../../src/bbdivider';
import { testResponsiveViewports } from '../support/test-helpers';

describe('BBDivider Component Tests', () => {
  const defaultProps: IPropsBBDivider = {};

  beforeEach(() => {
    cy.viewport(1280, 720);
  });

  describe('Basic Rendering', () => {
    it('renders with default props', () => {
      cy.mount(<BBDivider {...defaultProps} />);
      cy.get('div').should('exist');
    });

    it('renders with custom className', () => {
      cy.mount(<BBDivider {...defaultProps} className="custom-class" />);
      cy.get('.custom-class').should('exist');
    });
  });

  describe('Props Testing', () => {
    // Color variants
    const colors = ['default', 'primary', 'secondary', 'accent'];
    colors.forEach((color) => {
      it(`renders with color="${color}"`, () => {
        cy.mount(<BBDivider {...defaultProps} color={color as any} />);
        cy.get('div').should('exist');
      });
    });

    // Thickness variants
    const thicknesses = ['xs', 'sm', 'md', 'lg', 'xl'];
    thicknesses.forEach((thickness) => {
      it(`renders with thickness="${thickness}"`, () => {
        cy.mount(<BBDivider {...defaultProps} thickness={thickness as any} />);
        cy.get('div').should('exist');
      });
    });

    // Orientation variants
    const orientations = ['horizontal', 'vertical'];
    orientations.forEach((orientation) => {
      it(`renders with orientation="${orientation}"`, () => {
        cy.mount(<BBDivider {...defaultProps} orientation={orientation as any} />);
        cy.get('div').should('exist');
      });
    });
  });

  describe('Responsive Behavior', () => {
    testResponsiveViewports(() => {
      cy.mount(<BBDivider {...defaultProps} />);
    });
  });

  // TODO: Add more comprehensive tests for styleType, length, margin props
  // TODO: Test visual appearance of different combinations
  // TODO: Add accessibility tests
});

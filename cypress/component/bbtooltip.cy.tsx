import BBTooltip from '../../src/bbtooltip';
import type { IPropsBBTooltip } from '../../src/bbtooltip';
import { testResponsiveViewports } from '../support/test-helpers';

describe('BBTooltip Component Tests', () => {
  const defaultProps: IPropsBBTooltip = {
    children: <div>Hover over me</div>,
    text: 'This is a tooltip',
  };

  beforeEach(() => {
    cy.viewport(1280, 720);
  });

  describe('Basic Rendering', () => {
    it('renders with default props', () => {
      cy.mount(<BBTooltip {...defaultProps} />);
      cy.contains('Hover over me').should('exist');
    });

    it('renders tooltip text on hover', () => {
      cy.mount(<BBTooltip {...defaultProps} />);
      cy.get('[data-testid*="tooltip"]').first().trigger('mouseenter');
      cy.contains('This is a tooltip').should('exist');
    });

    it('hides tooltip when not hovering', () => {
      cy.mount(<BBTooltip {...defaultProps} />);
      cy.get('[data-testid*="tooltip"]').first().trigger('mouseenter');
      cy.contains('This is a tooltip').should('exist');
      cy.get('[data-testid*="tooltip"]').first().trigger('mouseleave');
      cy.contains('This is a tooltip').should('not.exist');
    });
  });

  describe('Props Testing', () => {
    it('renders with showIcon prop', () => {
      cy.mount(<BBTooltip {...defaultProps} showIcon />);
      cy.get('[data-testid*="tooltip"]').should('exist');
    });

    it('renders without showIcon prop', () => {
      cy.mount(<BBTooltip {...defaultProps} showIcon={false} />);
      cy.contains('Hover over me').should('exist');
    });

    it('renders with custom className', () => {
      cy.mount(<BBTooltip {...defaultProps} className="custom-tooltip" />);
      cy.get('.custom-tooltip').should('exist');
    });

    it('renders with long tooltip text', () => {
      const longText =
        'This is a very long tooltip text that should wrap properly and display correctly even with multiple lines of content.';
      cy.mount(<BBTooltip {...defaultProps} text={longText} />);
      cy.get('[data-testid*="tooltip"]').first().trigger('mouseenter');
      cy.contains(longText).should('exist');
    });
  });

  describe('Interactive Behavior', () => {
    it('shows tooltip on focus for accessibility', () => {
      cy.mount(<BBTooltip {...defaultProps} />);
      cy.get('[data-testid*="tooltip"]').first().focus();
      cy.contains('This is a tooltip').should('exist');
    });

    it('hides tooltip on blur', () => {
      cy.mount(<BBTooltip {...defaultProps} />);
      cy.get('[data-testid*="tooltip"]').first().focus();
      cy.contains('This is a tooltip').should('exist');
      cy.get('[data-testid*="tooltip"]').first().blur();
      cy.contains('This is a tooltip').should('not.exist');
    });
  });

  describe('Responsive Behavior', () => {
    testResponsiveViewports(() => {
      cy.mount(<BBTooltip {...defaultProps} />);
    });
  });

  // TODO: Test different tooltip positions/placements
  // TODO: Test tooltip with JSX content instead of plain text
  // TODO: Add accessibility tests for ARIA attributes
  // TODO: Test tooltip overflow handling and positioning
});

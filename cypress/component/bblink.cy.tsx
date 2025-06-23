import BBLink from '../../src/bblink';
import type { IPropsBBLink } from '../../src/bblink';
import { testResponsiveViewports } from '../support/test-helpers';

describe('BBLink Component Tests', () => {
  const defaultProps: IPropsBBLink = {
    children: 'Test Link',
    href: '/test-page',
  };

  beforeEach(() => {
    cy.viewport(1280, 720);
  });

  describe('Basic Rendering', () => {
    it('renders with default props', () => {
      cy.mount(<BBLink {...defaultProps} />);
      cy.get('a').should('exist').and('have.attr', 'href', '/test-page');
      cy.contains('Test Link').should('exist');
    });

    it('renders with custom className', () => {
      cy.mount(<BBLink {...defaultProps} className="custom-class" />);
      cy.get('.custom-class').should('exist');
    });
  });

  describe('Link Behavior', () => {
    it('renders internal links correctly', () => {
      cy.mount(<BBLink {...defaultProps} href="/internal" />);
      cy.get('a').should('have.attr', 'href', '/internal').and('have.attr', 'target', '');
    });

    it('renders external links correctly', () => {
      cy.mount(<BBLink {...defaultProps} href="https://example.com" external />);
      cy.get('a')
        .should('have.attr', 'href', 'https://example.com')
        .and('have.attr', 'target', '_blank')
        .and('have.attr', 'rel', 'noreferrer noopener');
    });
  });

  describe('Text Props Testing', () => {
    // Size testing
    const sizes = ['xs', 'small', 'medium', 'large', 'xl', 'xxl'];
    sizes.forEach((size) => {
      it(`renders with size="${size}"`, () => {
        cy.mount(<BBLink {...defaultProps} size={size as any} />);
        cy.get('a').should('exist');
      });
    });

    // Color testing
    it('renders with different colors', () => {
      cy.mount(<BBLink {...defaultProps} color="primary" />);
      cy.get('a').should('exist');
    });

    it('renders with bold text', () => {
      cy.mount(<BBLink {...defaultProps} bold />);
      cy.get('a').should('exist');
    });

    it('renders with italics', () => {
      cy.mount(<BBLink {...defaultProps} italics />);
      cy.get('a').should('exist');
    });

    it('renders without underline', () => {
      cy.mount(<BBLink {...defaultProps} underline={false} />);
      cy.get('a').should('exist'); // CSS modules replace class names, just check existence
    });
  });

  describe('Responsive Behavior', () => {
    testResponsiveViewports(() => {
      cy.mount(<BBLink {...defaultProps} />);
    });
  });

  // TODO: Test hover behavior
  // TODO: Test asSpan prop functionality
  // TODO: Add accessibility tests for keyboard navigation
  // TODO: Test with complex children (JSX elements)
});

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

    it('puts className on the inner text, not the anchor', () => {
      // Backwards from the rest of the library, and deliberately kept that way -
      // consumers style the text through `className` and would all regress if it
      // moved to the anchor. `classNameLink` is how you reach the anchor.
      cy.mount(<BBLink {...defaultProps} className="custom-class" />);
      cy.get('a').should('not.have.class', 'custom-class');
      cy.get('a').find('.custom-class').should('exist');
    });

    it('puts classNameLink on the anchor', () => {
      cy.mount(<BBLink {...defaultProps} classNameLink="custom-link" />);
      cy.get('a').should('have.class', 'custom-link');
    });

    it('keeps className and classNameLink on their own elements', () => {
      cy.mount(<BBLink {...defaultProps} className="custom-class" classNameLink="custom-link" />);
      cy.get('a').should('have.class', 'custom-link').and('not.have.class', 'custom-class');
      cy.get('a').find('.custom-class').should('exist').and('not.have.class', 'custom-link');
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

    it('calls onClick when the link is clicked', () => {
      // Fragment href on purpose - a real path unloads the component-test
      // iframe and every spec after this one loses its mount point.
      const onClick = cy.stub();
      cy.mount(<BBLink {...defaultProps} href="#test" onClick={onClick} />);
      cy.contains('Test Link').click();
      cy.then(() => {
        expect(onClick).to.have.been.called;
      });
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

    it('renders a p inside the anchor by default', () => {
      cy.mount(<BBLink {...defaultProps} />);
      cy.get('a p').should('exist');
    });

    it('renders a span inside the anchor with asSpan', () => {
      // The escape hatch for a BBLink that has to sit inside a paragraph, or
      // that wraps anything other than a run of text - a block child under the
      // default `<p>` closes the paragraph in the browser but not in React,
      // which fails hydration.
      cy.mount(<BBLink {...defaultProps} asSpan />);
      cy.get('a span').should('exist');
      cy.get('a p').should('not.exist');
    });
  });

  describe('Responsive Behavior', () => {
    testResponsiveViewports(() => {
      cy.mount(<BBLink {...defaultProps} />);
    });
  });

  // TODO: Test hover behavior
  // TODO: Add accessibility tests for keyboard navigation
  // TODO: Test with complex children (JSX elements)
});

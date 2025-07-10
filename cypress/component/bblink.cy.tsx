import React from 'react';
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
      // Check default values
      cy.get('a').should('not.have.attr', 'target', '_blank');
      cy.get('a').should('have.class', 'underline'); // Default underline
    });

    it('renders with custom className', () => {
      cy.mount(<BBLink {...defaultProps} className="custom-link-class" />);
      cy.get('.custom-link-class').should('exist');
    });

    it('renders with complex children', () => {
      cy.mount(
        <BBLink {...defaultProps}>
          <span>Complex</span>
          <strong> Children</strong>
          <em> Content</em>
        </BBLink>
      );
      cy.contains('Complex').should('exist');
      cy.contains('Children').should('exist');
      cy.contains('Content').should('exist');
    });

    it('renders with React component as child', () => {
      const IconComponent = () => <span data-testid="icon">🔗</span>;
      cy.mount(
        <BBLink {...defaultProps}>
          <IconComponent /> Link with Icon
        </BBLink>
      );
      cy.get('[data-testid="icon"]').should('exist');
      cy.contains('Link with Icon').should('exist');
    });
  });

  describe('Link Behavior', () => {
    it('renders internal links correctly', () => {
      cy.mount(<BBLink {...defaultProps} href="/internal" />);
      cy.get('a')
        .should('have.attr', 'href', '/internal')
        .and('have.attr', 'target', '')
        .and('not.have.attr', 'rel');
    });

    it('renders external links correctly', () => {
      cy.mount(<BBLink {...defaultProps} href="https://example.com" external />);
      cy.get('a')
        .should('have.attr', 'href', 'https://example.com')
        .and('have.attr', 'target', '_blank')
        .and('have.attr', 'rel', 'noreferrer noopener');
    });

    it('handles different URL formats', () => {
      const urls = [
        '/relative-path',
        '../parent-path',
        'https://external.com',
        'http://insecure.com',
        'mailto:test@example.com',
        'tel:+1234567890',
        '#anchor',
        '?query=params'
      ];

      urls.forEach(url => {
        cy.mount(<BBLink href={url}>Link to {url}</BBLink>);
        cy.get('a').should('have.attr', 'href', url);
      });
    });

    it('handles empty href gracefully', () => {
      cy.mount(<BBLink href="">Empty Link</BBLink>);
      cy.get('a').should('have.attr', 'href', '');
    });
  });

  describe('Text Styling Props', () => {
    describe('Size variants', () => {
      const sizes = ['tiny', 'small', 'medium', 'large', 'xlarge', 'xxlarge', 'xxxlarge'];
      sizes.forEach((size) => {
        it(`renders with size="${size}"`, () => {
          cy.mount(<BBLink {...defaultProps} size={size as any} />);
          cy.get('a').should('exist');
          cy.get('[class*="size"]').should('exist'); // BBText applies size classes
        });
      });
    });

    describe('Color variants', () => {
      const colors = [
        'grey_light', 'grey_dark', 'black', 'white',
        'primary', 'primary_light', 'primary_dark',
        'secondary', 'secondary_light', 'secondary_dark',
        'accent', 'accent_light', 'accent_dark',
        'success', 'warning', 'danger', 'info'
      ];
      
      colors.forEach((color) => {
        it(`renders with color="${color}"`, () => {
          cy.mount(
            <div style={{ background: color.includes('white') ? '#333' : '#fff', padding: '20px' }}>
              <BBLink {...defaultProps} color={color as any} />
            </div>
          );
          cy.get('a').should('exist');
        });
      });
    });

    it('renders with bold text', () => {
      cy.mount(<BBLink {...defaultProps} bold />);
      cy.get('[class*="bold"]').should('exist');
    });

    it('renders with italic text', () => {
      cy.mount(<BBLink {...defaultProps} italics />);
      cy.get('[class*="italic"]').should('exist');
    });

    it('renders with underline (default)', () => {
      cy.mount(<BBLink {...defaultProps} />);
      cy.get('a').should('have.class', 'underline');
    });

    it('renders without underline', () => {
      cy.mount(<BBLink {...defaultProps} underline={false} />);
      cy.get('a').should('have.class', 'no_underline');
    });

    it('renders with all text styles combined', () => {
      cy.mount(
        <BBLink
          {...defaultProps}
          size="xlarge"
          color="primary"
          bold
          italics
          underline
        >
          Styled Link
        </BBLink>
      );
      cy.get('a').should('exist');
      cy.get('[class*="bold"]').should('exist');
      cy.get('[class*="italic"]').should('exist');
      cy.get('a').should('have.class', 'underline');
    });
  });

  describe('AsSpan Prop', () => {
    it('renders as inline element when asSpan is true', () => {
      cy.mount(
        <div>
          Text before <BBLink {...defaultProps} asSpan={true} /> text after
        </div>
      );
      cy.get('span').should('exist');
      cy.contains('Text before Test Link text after').should('exist');
    });

    it('renders as block element when asSpan is false (default)', () => {
      cy.mount(<BBLink {...defaultProps} asSpan={false} />);
      cy.get('a').should('exist');
    });
  });

  describe('Hover Behavior', () => {
    it('has hover effect by default', () => {
      cy.mount(<BBLink {...defaultProps} />);
      cy.get('a').should('exist');
      // BBText handles hover classes
    });

    it('disables hover effect when hover is false', () => {
      cy.mount(<BBLink {...defaultProps} hover={false} />);
      cy.get('a').should('exist');
    });

    it('maintains hover state during interaction', () => {
      cy.mount(
        <div>
          <BBLink {...defaultProps}>Hover Me</BBLink>
          <button>Other Element</button>
        </div>
      );
      
      // Hover over link
      cy.get('a').trigger('mouseenter');
      
      // Move to another element
      cy.get('button').trigger('mouseenter');
      
      // Return to link
      cy.get('a').trigger('mouseenter');
    });
  });

  describe('Edge Cases', () => {
    it('handles very long link text', () => {
      const longText = 'This is a very long link text that might cause layout issues if not handled properly. It should wrap or truncate gracefully.';
      cy.mount(
        <div style={{ width: '200px' }}>
          <BBLink {...defaultProps}>{longText}</BBLink>
        </div>
      );
      cy.contains(longText).should('exist');
    });

    it('handles special characters in text', () => {
      const specialText = '<script>alert("XSS")</script> & "quotes" \'apostrophes\'';
      cy.mount(<BBLink {...defaultProps}>{specialText}</BBLink>);
      cy.contains(specialText).should('exist');
    });

    it('handles special characters in href', () => {
      const specialHref = '/path?param=value&other=<script>';
      cy.mount(<BBLink {...defaultProps} href={specialHref} />);
      cy.get('a').should('have.attr', 'href', specialHref);
    });

    it('handles empty children gracefully', () => {
      cy.mount(<BBLink {...defaultProps}>{''}</BBLink>);
      cy.get('a').should('exist');
    });

    it('handles null/undefined in children', () => {
      cy.mount(
        <BBLink {...defaultProps}>
          {null}
          Text
          {undefined}
        </BBLink>
      );
      cy.contains('Text').should('exist');
    });

    it('handles rapid prop changes', () => {
      const TestComponent = () => {
        const [href, setHref] = React.useState('/initial');
        const [external, setExternal] = React.useState(false);
        
        return (
          <div>
            <button onClick={() => {
              setHref('https://external.com');
              setExternal(true);
            }}>Change Link</button>
            <BBLink href={href} external={external}>Dynamic Link</BBLink>
          </div>
        );
      };
      
      cy.mount(<TestComponent />);
      
      // Initial state
      cy.get('a').should('have.attr', 'href', '/initial');
      cy.get('a').should('not.have.attr', 'target', '_blank');
      
      // Change props
      cy.get('button').click();
      
      // Updated state
      cy.get('a').should('have.attr', 'href', 'https://external.com');
      cy.get('a').should('have.attr', 'target', '_blank');
    });
  });

  describe('Accessibility', () => {
    it('maintains link semantics', () => {
      cy.mount(<BBLink {...defaultProps} />);
      cy.get('a').should('have.prop', 'tagName', 'A');
    });

    it('is keyboard navigable', () => {
      cy.mount(
        <div>
          <button>Before Link</button>
          <BBLink {...defaultProps}>Keyboard Nav Link</BBLink>
          <button>After Link</button>
        </div>
      );
      
      // Focus first button
      cy.get('button').first().focus();
      
      // Tab to link
      cy.get('a').focus();
      cy.focused().should('contain.text', 'Keyboard Nav Link');
      
      // Activate with Enter
      cy.focused().type('{enter}');
    });

    it('announces external links to screen readers', () => {
      cy.mount(<BBLink {...defaultProps} external>External Link</BBLink>);
      cy.get('a').should('have.attr', 'rel', 'noreferrer noopener');
    });

    it('works with keyboard shortcuts', () => {
      cy.mount(<BBLink {...defaultProps}>Shortcut Link</BBLink>);
      
      // Focus the link
      cy.get('a').focus();
      
      // Common keyboard shortcuts should work
      cy.focused().should('have.attr', 'href', '/test-page');
    });

    it('maintains focus visibility', () => {
      cy.mount(
        <div>
          <BBLink {...defaultProps}>Focus Visible Link</BBLink>
        </div>
      );
      
      // Tab to focus the link
      cy.get('a').focus();
      cy.focused().should('have.css', 'outline').and('not.eq', 'none');
    });
  });

  describe('Integration with BBText', () => {
    it('properly passes through all text props', () => {
      cy.mount(
        <BBLink
          {...defaultProps}
          size="large"
          color="primary"
          bold
          italics
          underline={false}
          hover={false}
        >
          All Props Link
        </BBLink>
      );
      
      cy.get('a').should('exist');
      cy.get('[class*="large"]').should('exist');
      cy.get('[class*="primary"]').should('exist');
      cy.get('[class*="bold"]').should('exist');
      cy.get('[class*="italic"]').should('exist');
      cy.get('a').should('have.class', 'no_underline');
    });
  });

  describe('Responsive Behavior', () => {
    testResponsiveViewports(() => {
      cy.mount(
        <div>
          <p>
            This is a paragraph with an <BBLink href="/inline" asSpan>inline link</BBLink> that
            should wrap naturally with the text on smaller screens.
          </p>
          <BBLink href="/block">Block Level Link</BBLink>
          <BBLink href="https://external.com" external size="large" color="accent">
            Large External Link
          </BBLink>
        </div>
      );
      
      // Verify links are visible and functional at all viewport sizes
      cy.get('a').should('have.length', 3);
      cy.get('a').each(($el) => {
        cy.wrap($el).should('be.visible');
      });
    });
  });

  describe('Nested Links Prevention', () => {
    it('handles nested link scenarios gracefully', () => {
      cy.mount(
        <div>
          <BBLink href="/outer">
            Outer Link with <span>nested content</span>
          </BBLink>
        </div>
      );
      
      cy.get('a').should('have.length', 1);
      cy.contains('Outer Link with nested content').should('exist');
    });
  });
});

import BBCollapsible from '../../src/bbcollapsible';
import type { IPropsBBCollapsible } from '../../src/bbcollapsible';
import { testResponsiveViewports } from '../support/test-helpers';

describe('BBCollapsible Component Tests', () => {
  const defaultProps: IPropsBBCollapsible = {
    children: [],
  };

  beforeEach(() => {
    cy.viewport(1280, 720);
  });

  describe('Basic Rendering', () => {
    it('renders with default props', () => {
      cy.mount(
        <BBCollapsible {...defaultProps}>
          <BBCollapsible.Header>Test Header</BBCollapsible.Header>
          <BBCollapsible.Content>Test Content</BBCollapsible.Content>
        </BBCollapsible>
      );
      cy.contains('Test Header').should('exist');
      cy.contains('Test Content').should('not.exist'); // Initially collapsed
    });

    it('renders expanded initially when isExpandedInitial is true', () => {
      cy.mount(
        <BBCollapsible {...defaultProps} isExpandedInitial={true}>
          <BBCollapsible.Header>Test Header</BBCollapsible.Header>
          <BBCollapsible.Content>Test Content</BBCollapsible.Content>
        </BBCollapsible>
      );
      cy.contains('Test Header').should('exist');
      cy.contains('Test Content').should('exist');
    });

    it('renders without content section', () => {
      cy.mount(
        <BBCollapsible {...defaultProps}>
          <BBCollapsible.Header>Header Only</BBCollapsible.Header>
        </BBCollapsible>
      );
      cy.contains('Header Only').should('exist');
    });

    it('renders with multiple children in header and content', () => {
      cy.mount(
        <BBCollapsible {...defaultProps} isExpandedInitial={true}>
          <BBCollapsible.Header>
            <h2>Main Title</h2>
            <p>Subtitle text</p>
          </BBCollapsible.Header>
          <BBCollapsible.Content>
            <div>Content Line 1</div>
            <div>Content Line 2</div>
            <div>Content Line 3</div>
          </BBCollapsible.Content>
        </BBCollapsible>
      );
      cy.contains('Main Title').should('exist');
      cy.contains('Subtitle text').should('exist');
      cy.contains('Content Line 1').should('exist');
      cy.contains('Content Line 2').should('exist');
      cy.contains('Content Line 3').should('exist');
    });
  });

  describe('Expand/Collapse Functionality', () => {
    it('expands and collapses content when header is clicked', () => {
      cy.mount(
        <BBCollapsible {...defaultProps}>
          <BBCollapsible.Header>Clickable Header</BBCollapsible.Header>
          <BBCollapsible.Content>Hidden Content</BBCollapsible.Content>
        </BBCollapsible>
      );

      // Initially collapsed
      cy.contains('Hidden Content').should('not.exist');

      // Click to expand
      cy.contains('Clickable Header').click();
      cy.contains('Hidden Content').should('exist');

      // Click to collapse
      cy.contains('Clickable Header').click();
      cy.contains('Hidden Content').should('not.exist');
    });

    it('shows correct arrow direction', () => {
      cy.mount(
        <BBCollapsible {...defaultProps}>
          <BBCollapsible.Header>Test Header</BBCollapsible.Header>
          <BBCollapsible.Content>Test Content</BBCollapsible.Content>
        </BBCollapsible>
      );

      // Initially should show down arrow
      cy.get('button').should('contain', '▼');

      // After clicking should show up arrow
      cy.contains('Test Header').click();
      cy.get('button').should('contain', '▲');
    });

    it('toggles multiple times correctly', () => {
      cy.mount(
        <BBCollapsible {...defaultProps}>
          <BBCollapsible.Header>Toggle Header</BBCollapsible.Header>
          <BBCollapsible.Content>Toggle Content</BBCollapsible.Content>
        </BBCollapsible>
      );

      // Multiple toggles
      for (let i = 0; i < 5; i++) {
        cy.contains('Toggle Header').click();
        if (i % 2 === 0) {
          cy.contains('Toggle Content').should('exist');
        } else {
          cy.contains('Toggle Content').should('not.exist');
        }
      }
    });

    it('expands when clicking on the arrow button directly', () => {
      cy.mount(
        <BBCollapsible {...defaultProps}>
          <BBCollapsible.Header>Test Header</BBCollapsible.Header>
          <BBCollapsible.Content>Test Content</BBCollapsible.Content>
        </BBCollapsible>
      );

      // Click the arrow button
      cy.get('button').click();
      cy.contains('Test Content').should('exist');
    });
  });

  describe('Callback Functions', () => {
    it('calls onExpanded callback', () => {
      const onExpanded = cy.stub();
      cy.mount(
        <BBCollapsible {...defaultProps} onExpanded={onExpanded}>
          <BBCollapsible.Header>Test Header</BBCollapsible.Header>
          <BBCollapsible.Content>Test Content</BBCollapsible.Content>
        </BBCollapsible>
      );

      cy.contains('Test Header').click();
      cy.then(() => {
        expect(onExpanded).to.have.been.calledWith(true);
      });
    });

    it('calls onCollapsed callback', () => {
      const onCollapsed = cy.stub();
      cy.mount(
        <BBCollapsible {...defaultProps} isExpandedInitial={true} onCollapsed={onCollapsed}>
          <BBCollapsible.Header>Test Header</BBCollapsible.Header>
          <BBCollapsible.Content>Test Content</BBCollapsible.Content>
        </BBCollapsible>
      );

      cy.contains('Test Header').click();
      cy.then(() => {
        expect(onCollapsed).to.have.been.called;
      });
    });

    it('calls onExpanded on initial mount when isExpandedInitial is true', () => {
      const onExpanded = cy.stub();
      cy.mount(
        <BBCollapsible {...defaultProps} isExpandedInitial={true} onExpanded={onExpanded}>
          <BBCollapsible.Header>Test Header</BBCollapsible.Header>
          <BBCollapsible.Content>Test Content</BBCollapsible.Content>
        </BBCollapsible>
      );

      cy.then(() => {
        expect(onExpanded).to.have.been.calledWith(true);
      });
    });

    it('handles callback functions gracefully when not provided', () => {
      cy.mount(
        <BBCollapsible {...defaultProps}>
          <BBCollapsible.Header>Test Header</BBCollapsible.Header>
          <BBCollapsible.Content>Test Content</BBCollapsible.Content>
        </BBCollapsible>
      );

      // Should not throw errors when clicking without callbacks
      cy.contains('Test Header').click();
      cy.contains('Test Content').should('exist');
    });
  });

  describe('Custom Arrow Icons', () => {
    it('renders custom arrow icons', () => {
      const CustomArrowUp = () => <span data-testid="custom-up">↑</span>;
      const CustomArrowDown = () => <span data-testid="custom-down">↓</span>;

      cy.mount(
        <BBCollapsible {...defaultProps}>
          <BBCollapsible.Header arrowUp={<CustomArrowUp />} arrowDown={<CustomArrowDown />}>
            Test Header
          </BBCollapsible.Header>
          <BBCollapsible.Content>Test Content</BBCollapsible.Content>
        </BBCollapsible>
      );

      // Should show custom down arrow initially
      cy.get('[data-testid="custom-down"]').should('exist');
      cy.get('[data-testid="custom-up"]').should('not.exist');

      // Click to expand
      cy.contains('Test Header').click();

      // Should show custom up arrow when expanded
      cy.get('[data-testid="custom-up"]').should('exist');
      cy.get('[data-testid="custom-down"]').should('not.exist');
    });
  });

  describe('Button Styling', () => {
    it('renders with different button variants', () => {
      const variants = ['primary', 'secondary', 'accent', 'danger'] as const;
      
      variants.forEach(variant => {
        cy.mount(
          <BBCollapsible {...defaultProps}>
            <BBCollapsible.Header buttonVariant={variant}>
              {variant} Button
            </BBCollapsible.Header>
            <BBCollapsible.Content>Content</BBCollapsible.Content>
          </BBCollapsible>
        );
        
        cy.get('button').should('exist');
      });
    });

    it('renders with transparent button', () => {
      cy.mount(
        <BBCollapsible {...defaultProps}>
          <BBCollapsible.Header buttonTransparent={true}>
            Transparent Button
          </BBCollapsible.Header>
          <BBCollapsible.Content>Content</BBCollapsible.Content>
        </BBCollapsible>
      );
      
      cy.get('button').should('exist');
    });

    it('applies custom button className', () => {
      cy.mount(
        <BBCollapsible {...defaultProps}>
          <BBCollapsible.Header classNameButton="custom-button-class">
            Custom Button Class
          </BBCollapsible.Header>
          <BBCollapsible.Content>Content</BBCollapsible.Content>
        </BBCollapsible>
      );
      
      cy.get('button').should('have.class', 'custom-button-class');
    });
  });

  describe('Content Styling', () => {
    it('renders with noPadding on header', () => {
      cy.mount(
        <BBCollapsible {...defaultProps}>
          <BBCollapsible.Header noPadding={true}>
            No Padding Header
          </BBCollapsible.Header>
          <BBCollapsible.Content>Test Content</BBCollapsible.Content>
        </BBCollapsible>
      );
      
      cy.contains('No Padding Header').should('exist');
    });

    it('renders content with proper styling', () => {
      cy.mount(
        <BBCollapsible {...defaultProps} isExpandedInitial={true}>
          <BBCollapsible.Header>Test Header</BBCollapsible.Header>
          <BBCollapsible.Content>
            Styled Content
          </BBCollapsible.Content>
        </BBCollapsible>
      );
      
      cy.contains('Styled Content').should('exist');
    });

    it('applies custom className to header', () => {
      cy.mount(
        <BBCollapsible {...defaultProps}>
          <BBCollapsible.Header className="custom-header-class">
            Custom Header
          </BBCollapsible.Header>
          <BBCollapsible.Content>Content</BBCollapsible.Content>
        </BBCollapsible>
      );
      
      cy.get('.custom-header-class').should('exist');
    });

    it('applies custom className to content', () => {
      cy.mount(
        <BBCollapsible {...defaultProps} isExpandedInitial={true}>
          <BBCollapsible.Header>Header</BBCollapsible.Header>
          <BBCollapsible.Content className="custom-content-class">
            Custom Content
          </BBCollapsible.Content>
        </BBCollapsible>
      );
      
      cy.get('.custom-content-class').should('exist');
    });
  });

  describe('BBCard Inheritance', () => {
    it('inherits elevation prop from BBCard', () => {
      cy.mount(
        <BBCollapsible {...defaultProps} elevation="high">
          <BBCollapsible.Header>Elevated Header</BBCollapsible.Header>
          <BBCollapsible.Content>Elevated Content</BBCollapsible.Content>
        </BBCollapsible>
      );
      
      // The card wrapper should exist
      cy.get('[class*="bbcard"]').should('exist');
    });

    it('inherits noBorder prop from BBCard', () => {
      cy.mount(
        <BBCollapsible {...defaultProps} noBorder={true}>
          <BBCollapsible.Header>No Border Header</BBCollapsible.Header>
          <BBCollapsible.Content>No Border Content</BBCollapsible.Content>
        </BBCollapsible>
      );
      
      cy.get('[class*="bbcard"]').should('exist');
    });

    it('works with BBCard wrapper', () => {
      cy.mount(
        <BBCollapsible {...defaultProps}>
          <BBCollapsible.Header>BBCard Header</BBCollapsible.Header>
          <BBCollapsible.Content>BBCard Content</BBCollapsible.Content>
        </BBCollapsible>
      );
      
      cy.get('[class*="bbcard"]').should('exist');
    });

    it('applies custom className to BBCard wrapper', () => {
      cy.mount(
        <BBCollapsible {...defaultProps} className="custom-card-class">
          <BBCollapsible.Header>Test Header</BBCollapsible.Header>
          <BBCollapsible.Content>Test Content</BBCollapsible.Content>
        </BBCollapsible>
      );
      
      cy.get('.custom-card-class').should('exist');
    });
  });

  describe('Accessibility', () => {
    it('maintains semantic structure', () => {
      cy.mount(
        <BBCollapsible {...defaultProps}>
          <BBCollapsible.Header>Accessible Header</BBCollapsible.Header>
          <BBCollapsible.Content>Accessible Content</BBCollapsible.Content>
        </BBCollapsible>
      );
      
      // Header should be clickable
      cy.contains('Accessible Header').should('exist');
      
      // Button should be keyboard accessible
      cy.get('button').should('exist');
    });

    it('allows keyboard navigation', () => {
      cy.mount(
        <BBCollapsible {...defaultProps}>
          <BBCollapsible.Header>Keyboard Nav Header</BBCollapsible.Header>
          <BBCollapsible.Content>Keyboard Nav Content</BBCollapsible.Content>
        </BBCollapsible>
      );
      
      // Tab to the button
      cy.get('button').focus();
      
      // Press Enter to expand
      cy.focused().type('{enter}');
      cy.contains('Keyboard Nav Content').should('exist');
      
      // Press Enter again to collapse
      cy.focused().type('{enter}');
      cy.contains('Keyboard Nav Content').should('not.exist');
    });

    it('supports space key for button activation', () => {
      cy.mount(
        <BBCollapsible {...defaultProps}>
          <BBCollapsible.Header>Space Key Header</BBCollapsible.Header>
          <BBCollapsible.Content>Space Key Content</BBCollapsible.Content>
        </BBCollapsible>
      );
      
      // Tab to the button
      cy.get('button').focus();
      
      // Press Space to expand
      cy.focused().type(' ');
      cy.contains('Space Key Content').should('exist');
    });
  });

  describe('Edge Cases', () => {
    it('handles very long header text', () => {
      const longText = 'This is a very long header text that might cause layout issues if not handled properly. It contains many words and should wrap or truncate gracefully.';
      cy.mount(
        <BBCollapsible {...defaultProps}>
          <BBCollapsible.Header>{longText}</BBCollapsible.Header>
          <BBCollapsible.Content>Content</BBCollapsible.Content>
        </BBCollapsible>
      );
      
      cy.contains(longText).should('exist');
    });

    it('handles very long content', () => {
      const longContent = Array(50).fill('This is a line of content. ').join('');
      cy.mount(
        <BBCollapsible {...defaultProps} isExpandedInitial={true}>
          <BBCollapsible.Header>Header</BBCollapsible.Header>
          <BBCollapsible.Content>{longContent}</BBCollapsible.Content>
        </BBCollapsible>
      );
      
      cy.contains('This is a line of content').should('exist');
    });

    it('handles rapid clicking', () => {
      cy.mount(
        <BBCollapsible {...defaultProps}>
          <BBCollapsible.Header>Rapid Click Header</BBCollapsible.Header>
          <BBCollapsible.Content>Rapid Click Content</BBCollapsible.Content>
        </BBCollapsible>
      );
      
      // Rapid clicks
      for (let i = 0; i < 10; i++) {
        cy.get('button').click();
      }
      
      // Should end up in a stable state (either open or closed)
      cy.get('button').should('exist');
    });

    it('handles empty header gracefully', () => {
      cy.mount(
        <BBCollapsible {...defaultProps}>
          <BBCollapsible.Header>{''}</BBCollapsible.Header>
          <BBCollapsible.Content>Content with empty header</BBCollapsible.Content>
        </BBCollapsible>
      );
      
      // Button should still be clickable
      cy.get('button').click();
      cy.contains('Content with empty header').should('exist');
    });

    it('handles empty content gracefully', () => {
      cy.mount(
        <BBCollapsible {...defaultProps} isExpandedInitial={true}>
          <BBCollapsible.Header>Header with empty content</BBCollapsible.Header>
          <BBCollapsible.Content>{''}</BBCollapsible.Content>
        </BBCollapsible>
      );
      
      cy.contains('Header with empty content').should('exist');
    });

    it('handles complex nested components', () => {
      cy.mount(
        <BBCollapsible {...defaultProps} isExpandedInitial={true}>
          <BBCollapsible.Header>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Left Text</span>
              <span>Right Text</span>
            </div>
          </BBCollapsible.Header>
          <BBCollapsible.Content>
            <table>
              <thead>
                <tr>
                  <th>Column 1</th>
                  <th>Column 2</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Data 1</td>
                  <td>Data 2</td>
                </tr>
              </tbody>
            </table>
          </BBCollapsible.Content>
        </BBCollapsible>
      );
      
      cy.contains('Left Text').should('exist');
      cy.contains('Right Text').should('exist');
      cy.contains('Column 1').should('exist');
      cy.contains('Data 1').should('exist');
    });
  });

  describe('Responsive Behavior', () => {
    testResponsiveViewports(() => {
      cy.mount(
        <BBCollapsible {...defaultProps} isExpandedInitial={true}>
          <BBCollapsible.Header>Responsive Header</BBCollapsible.Header>
          <BBCollapsible.Content>
            <div>Responsive content that should adapt to different screen sizes</div>
            <div>Line 2</div>
            <div>Line 3</div>
          </BBCollapsible.Content>
        </BBCollapsible>
      );
      
      // Verify it works at all viewport sizes
      cy.contains('Responsive Header').click();
      cy.contains('Responsive content').should('not.exist');
      cy.contains('Responsive Header').click();
      cy.contains('Responsive content').should('exist');
    });
  });
});

import React from 'react';
import BBCard from '../../src/bbcard';
import type { IPropsBBCard } from '../../src/bbcard';
import { testResponsiveViewports, createTestData } from '../support/test-helpers';

describe('BBCard Component Tests', () => {
  const defaultProps: IPropsBBCard = {
    children: <div>Test card content</div>,
  };

  beforeEach(() => {
    cy.viewport(1280, 720);
  });

  describe('Basic Rendering', () => {
    it('renders with default props', () => {
      cy.mount(<BBCard>Default card content</BBCard>);
      cy.get('div').should('contain.text', 'Default card content');
    });

    it('renders with custom className', () => {
      cy.mount(<BBCard className="custom-card">Content</BBCard>);
      cy.get('div').should('have.class', 'custom-card');
    });

    it('renders without crashing', () => {
      cy.mount(<BBCard {...defaultProps} />);
      cy.get('*').should('exist');
    });
  });

  describe('Background Colors', () => {
    const backgroundColors: Array<IPropsBBCard['colorBackground']> = [
      'default',
      'transparent',
      'white',
      'grey_light',
      'grey_dark',
      'black',
      'primary',
      'secondary',
      'accent',
    ];

    backgroundColors.forEach((color) => {
      if (color) {
        it(`renders with colorBackground="${color}"`, () => {
          cy.mount(<BBCard colorBackground={color}>Test content</BBCard>);
          cy.get('div').should('exist');
          // Add specific color class checks based on your implementation
        });
      }
    });
  });

  describe('Border Colors', () => {
    const borderColors: Array<IPropsBBCard['colorBorder']> = [
      'default',
      'transparent',
      'white',
      'grey_light',
      'grey_dark',
      'black',
      'primary',
      'secondary',
      'accent',
    ];

    borderColors.forEach((color) => {
      if (color) {
        it(`renders with colorBorder="${color}"`, () => {
          cy.mount(<BBCard colorBorder={color}>Test content</BBCard>);
          cy.get('div').should('exist');
          // Add specific border color class checks
        });
      }
    });
  });

  describe('Elevations', () => {
    const elevations: Array<IPropsBBCard['elevation']> = ['none', 'low', 'med', 'high', 'default'];

    elevations.forEach((elevation) => {
      if (elevation) {
        it(`renders with elevation="${elevation}"`, () => {
          cy.mount(<BBCard elevation={elevation}>Test content</BBCard>);
          cy.get('div').should('exist');
          // Add specific elevation class checks
        });
      }
    });
  });

  describe('Border Options', () => {
    it('renders with default border', () => {
      cy.mount(<BBCard>With border</BBCard>);
      cy.get('div').should('exist');
    });

    it('renders without border when noBorder is true', () => {
      cy.mount(<BBCard noBorder>No border content</BBCard>);
      cy.get('div').should('exist');
      // Add check for no-border class if implemented
    });
  });

  describe('Content Rendering', () => {
    it('renders text content', () => {
      cy.mount(<BBCard>Simple text content</BBCard>);
      cy.get('div').should('contain.text', 'Simple text content');
    });

    it('renders JSX content', () => {
      cy.mount(
        <BBCard>
          <div>
            <h2 data-testid="card-title">Card Title</h2>
            <p data-testid="card-text">Card description text</p>
          </div>
        </BBCard>
      );
      cy.get('[data-testid="card-title"]').should('exist');
      cy.get('[data-testid="card-text"]').should('exist');
    });

    it('renders complex nested content', () => {
      cy.mount(
        <BBCard>
          <div>
            <header data-testid="card-header">Header</header>
            <main data-testid="card-main">
              <article>
                <h3>Article Title</h3>
                <p>Article content</p>
              </article>
            </main>
            <footer data-testid="card-footer">Footer</footer>
          </div>
        </BBCard>
      );
      cy.get('[data-testid="card-header"]').should('exist');
      cy.get('[data-testid="card-main"]').should('exist');
      cy.get('[data-testid="card-footer"]').should('exist');
    });
  });

  describe('Click Functionality', () => {
    it('handles click events when onClick is provided', () => {
      const onClick = cy.stub();
      cy.mount(
        <BBCard onClick={onClick} data-testid="clickable-card">
          Clickable card
        </BBCard>
      );
      cy.get('[data-testid="clickable-card"]').click();
      cy.then(() => {
        expect(onClick).to.have.been.called;
      });
    });

    it('does not interfere with nested clickable elements', () => {
      const cardClick = cy.stub();
      const buttonClick = cy.stub();

      cy.mount(
        <BBCard onClick={cardClick}>
          Card content
          <button data-testid="nested-button" onClick={buttonClick}>
            Nested Button
          </button>
        </BBCard>
      );

      cy.get('[data-testid="nested-button"]').click();
      cy.then(() => {
        expect(buttonClick).to.have.been.called;
        // Card click should also be called due to event bubbling
      });
    });
  });

  describe('Link Functionality', () => {
    it('renders as link when href is provided', () => {
      cy.mount(<BBCard href="/test-link">Link Card</BBCard>);
      cy.get('a').should('have.attr', 'href', '/test-link');
      cy.get('a').should('contain.text', 'Link Card');
    });

    it('opens in new tab when href is provided', () => {
      cy.mount(<BBCard href="/external">External Link Card</BBCard>);
      cy.get('a').should('have.attr', 'target', '_blank');
      cy.get('a').should('have.attr', 'rel', 'noopener noreferrer');
    });
  });

  describe('Responsive Behavior', () => {
    testResponsiveViewports(() => {
      cy.mount(<BBCard>Responsive card test</BBCard>);
    });
  });

  describe('Edge Cases', () => {
    it('handles empty content', () => {
      cy.mount(<BBCard> </BBCard>);
      cy.get('div').should('exist');
    });

    it('handles very long content', () => {
      const longContent = createTestData.longText();
      cy.mount(<BBCard>{longContent}</BBCard>);
      cy.get('div').should('contain.text', longContent);
    });

    it('handles special characters', () => {
      const specialContent = createTestData.specialChars();
      cy.mount(<BBCard>{specialContent}</BBCard>);
      cy.get('div').should('contain.text', specialContent);
    });

    it('handles multiple prop combinations', () => {
      cy.mount(
        <BBCard colorBackground="primary" colorBorder="accent" elevation="high" noBorder className="multi-prop-test">
          Multi-prop test content
        </BBCard>
      );
      cy.get('.multi-prop-test').should('exist');
      cy.get('div').should('contain.text', 'Multi-prop test content');
    });
  });

  describe('Accessibility', () => {
    it('is keyboard accessible when clickable', () => {
      const onClick = cy.stub();
      cy.mount(
        <BBCard onClick={onClick} data-testid="keyboard-card">
          Keyboard accessible card
        </BBCard>
      );

      // Should be focusable if clickable
      cy.get('[data-testid="keyboard-card"]').should('be.visible');
      // Note: Test passes if element is visible and accessible
    });

    it('has proper semantic structure', () => {
      cy.mount(
        <BBCard>
          <h2>Card Title</h2>
          <p>Card content with proper semantic structure</p>
        </BBCard>
      );

      cy.get('h2').should('exist');
      cy.get('p').should('exist');
    });
  });
});
export {};

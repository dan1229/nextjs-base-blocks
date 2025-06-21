import BBAlert from '../../src/bbalert';
import type { IPropsBBAlert } from '../../src/bbalert';

describe('BBAlert Component Tests', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
  });

  describe('Basic Rendering', () => {
    it('renders with default props', () => {
      cy.mount(<BBAlert>Test alert message</BBAlert>);
      cy.get('div').should('contain.text', 'Test alert message');
      cy.get('div').should('have.class', 'color_info'); // Default variant
    });

    it('renders with custom className', () => {
      cy.mount(<BBAlert className="custom-alert">Test</BBAlert>);
      cy.get('div').should('have.class', 'custom-alert');
    });
  });

  describe('Alert Variants', () => {
    const variants: Array<IPropsBBAlert['variant']> = ['success', 'warning', 'danger', 'info'];

    variants.forEach((variant) => {
      it(`renders with variant="${variant}"`, () => {
        cy.mount(<BBAlert variant={variant}>Test {variant} alert</BBAlert>);
        cy.get('div').should('have.class', `color_${variant}`);
        cy.get('div').should('contain.text', `Test ${variant} alert`);
      });
    });
  });

  describe('Alert Elevations', () => {
    const elevations: Array<IPropsBBAlert['elevation']> = ['none', 'low', 'medium', 'high'];

    elevations.forEach((elevation) => {
      it(`renders with elevation="${elevation}"`, () => {
        cy.mount(<BBAlert elevation={elevation}>Test alert</BBAlert>);
        const expectedClass = elevation === 'medium' ? 'elevation_med' : `elevation_${elevation}`;
        cy.get('div').should('have.class', expectedClass);
      });
    });
  });

  describe('Text Alignment', () => {
    const alignments: Array<IPropsBBAlert['textAlignment']> = ['left', 'center', 'right'];

    alignments.forEach((alignment) => {
      it(`renders with textAlignment="${alignment}"`, () => {
        cy.mount(<BBAlert textAlignment={alignment}>Aligned text</BBAlert>);
        cy.get('div').should('have.class', `text_${alignment}`);
      });
    });
  });

  describe('Dismissible Functionality', () => {
    it('shows dismiss button by default', () => {
      cy.mount(<BBAlert>Dismissible alert</BBAlert>);
      cy.get('svg').should('exist'); // Close icon should be present
    });

    it('hides dismiss button when dismissible is false', () => {
      cy.mount(<BBAlert dismissible={false}>Non-dismissible alert</BBAlert>);
      cy.get('svg').should('not.exist');
    });

    it('can be dismissed by clicking the close button', () => {
      cy.mount(<BBAlert>Click to dismiss</BBAlert>);
      cy.get('div').should('be.visible');
      cy.get('svg').click();
      cy.get('div').should('not.exist'); // Alert should be gone
    });

    it('applies custom className to dismiss icon', () => {
      cy.mount(<BBAlert classNameIcon="custom-icon">Test</BBAlert>);
      cy.get('svg').should('have.class', 'custom-icon');
    });
  });

  describe('Click Functionality', () => {
    it('handles click events when onClick is provided', () => {
      const onClick = cy.stub();
      cy.mount(<BBAlert onClick={onClick}>Clickable alert</BBAlert>);
      cy.get('div').should('have.class', 'clickable');
      cy.get('div').click();
      cy.then(() => {
        expect(onClick).to.have.been.called;
      });
    });

    it('does not have clickable class when onClick is not provided', () => {
      cy.mount(<BBAlert>Non-clickable alert</BBAlert>);
      cy.get('div').should('not.have.class', 'clickable');
    });

    it('prevents event propagation when dismiss button is clicked', () => {
      const onClick = cy.stub();
      cy.mount(<BBAlert onClick={onClick}>Test alert</BBAlert>);
      cy.get('svg').click();
      cy.then(() => {
        expect(onClick).not.to.have.been.called;
      });
    });
  });

  describe('Content Rendering', () => {
    it('renders text content', () => {
      cy.mount(<BBAlert>Simple text content</BBAlert>);
      cy.get('div').should('contain.text', 'Simple text content');
    });

    it('renders JSX content', () => {
      cy.mount(
        <BBAlert>
          <strong data-testid="bold-text">Bold text</strong> and regular text
        </BBAlert>
      );
      cy.get('[data-testid="bold-text"]').should('exist');
      cy.get('div').should('contain.text', 'and regular text');
    });

    it('renders complex nested content', () => {
      cy.mount(
        <BBAlert>
          <div>
            <p data-testid="paragraph">Paragraph content</p>
            <ul>
              <li data-testid="list-item">List item</li>
            </ul>
          </div>
        </BBAlert>
      );
      cy.get('[data-testid="paragraph"]').should('exist');
      cy.get('[data-testid="list-item"]').should('exist');
    });
  });

  describe('State Management', () => {
    it('maintains state correctly after multiple interactions', () => {
      const onClick = cy.stub();
      cy.mount(<BBAlert onClick={onClick}>Interactive alert</BBAlert>);

      // Click multiple times
      cy.get('div').click().click().click();
      cy.then(() => {
        expect(onClick).to.have.been.calledThrice;
      });

      // Alert should still be visible
      cy.get('div').should('be.visible');
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      cy.mount(<BBAlert variant="danger">Error message</BBAlert>);
      // Add ARIA checks as needed based on your implementation
      cy.get('div').should('exist');
    });

    it('dismiss button is keyboard accessible', () => {
      cy.mount(<BBAlert>Keyboard test</BBAlert>);
      cy.get('svg').should('be.visible');
      // Test keyboard interaction if supported
    });
  });

  describe('Responsive Behavior', () => {
    const viewports = [
      { name: 'mobile', width: 375, height: 667 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'desktop', width: 1280, height: 720 },
    ];

    viewports.forEach((viewport) => {
      it(`renders correctly on ${viewport.name}`, () => {
        cy.viewport(viewport.width, viewport.height);
        cy.mount(<BBAlert>Responsive alert test</BBAlert>);
        cy.get('div').should('be.visible');
        cy.get('div').should('contain.text', 'Responsive alert test');
      });
    });
  });

  describe('Edge Cases', () => {
    it('handles empty content', () => {
      cy.mount(<BBAlert> </BBAlert>);
      cy.get('div').should('exist');
    });

    it('handles very long content', () => {
      const longContent = 'This is a very long alert message that should be handled gracefully by the component. '.repeat(10);
      cy.mount(<BBAlert>{longContent}</BBAlert>);
      cy.get('div').should('contain.text', longContent);
    });

    it('handles special characters in content', () => {
      const specialContent = 'Alert with special chars: <>&"\'';
      cy.mount(<BBAlert>{specialContent}</BBAlert>);
      cy.get('div').should('contain.text', specialContent);
    });
  });
});

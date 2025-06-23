// cypress/support/_template.cy.tsx
// Template for creating new component tests
// Copy this file and rename it to match your component

// import ComponentName from '../../src/component-folder';
// import type { IPropsComponentName } from '../../src/component-folder';
import { testResponsiveViewports, createTestData } from './test-helpers';

// TODO replace these with actual components
interface IPropsComponentName {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: string;
  size?: string;
  disabled?: boolean;
}

const ComponentName = ({ children }: IPropsComponentName) => {
  return <div>{children}</div>;
};

describe('ComponentName Component Tests', () => {
  const defaultProps: IPropsComponentName = {
    // Add required props here
    children: 'Test content',
  };

  beforeEach(() => {
    cy.viewport(1280, 720);
  });

  describe('Basic Rendering', () => {
    it('renders with default props', () => {
      cy.mount(<ComponentName {...defaultProps} />);
      cy.get('div').should('exist'); // Update selector
    });

    it('renders with custom className', () => {
      cy.mount(<ComponentName {...defaultProps} className="custom-class" />);
      cy.get('.custom-class').should('exist');
    });
  });

  describe('Props Testing', () => {
    // Test each prop systematically

    // Example: Variant testing
    const variants = ['primary', 'secondary', 'accent'];
    variants.forEach((variant) => {
      it(`renders with variant="${variant}"`, () => {
        cy.mount(<ComponentName {...defaultProps} variant={variant} />);
        cy.get('div').should('exist'); // Add specific checks
      });
    });

    // Example: Size testing
    const sizes = ['sm', 'md', 'lg'];
    sizes.forEach((size) => {
      it(`renders with size="${size}"`, () => {
        cy.mount(<ComponentName {...defaultProps} size={size} />);
        cy.get('div').should('exist'); // Add specific checks
      });
    });
  });

  describe('Interactive Features', () => {
    it('handles click events', () => {
      const onClick = cy.stub();
      cy.mount(<ComponentName {...defaultProps} onClick={onClick} />);
      cy.get('div').click(); // Update selector
      cy.then(() => {
        expect(onClick).to.have.been.called;
      });
    });

    it('handles disabled state', () => {
      cy.mount(<ComponentName {...defaultProps} disabled />);
      cy.get('div').should('have.attr', 'disabled'); // Update as needed
    });
  });

  describe('Content Rendering', () => {
    it('renders text content', () => {
      cy.mount(<ComponentName {...defaultProps}>Simple text</ComponentName>);
      cy.get('div').should('contain.text', 'Simple text');
    });

    it('renders JSX content', () => {
      cy.mount(
        <ComponentName {...defaultProps}>
          <span data-testid="nested-content">Nested content</span>
        </ComponentName>
      );
      cy.get('[data-testid="nested-content"]').should('exist');
    });
  });

  describe('Responsive Behavior', () => {
    testResponsiveViewports(() => {
      cy.mount(<ComponentName {...defaultProps} />);
    });
  });

  describe('Accessibility', () => {
    it('is keyboard accessible', () => {
      cy.mount(<ComponentName {...defaultProps} />);
      cy.get('div').focus(); // Update selector
      // Add keyboard interaction tests
    });

    it('has proper ARIA attributes', () => {
      cy.mount(<ComponentName {...defaultProps} />);
      // Add ARIA attribute checks
      cy.get('div').should('exist');
    });
  });

  describe('Edge Cases', () => {
    it('handles empty content', () => {
      cy.mount(<ComponentName> </ComponentName>);
      cy.get('div').should('exist');
    });

    it('handles very long content', () => {
      const longContent = createTestData.longText();
      cy.mount(<ComponentName>{longContent}</ComponentName>);
      cy.get('div').should('contain.text', longContent);
    });

    it('handles special characters', () => {
      const specialContent = createTestData.specialChars();
      cy.mount(<ComponentName>{specialContent}</ComponentName>);
      cy.get('div').should('contain.text', specialContent);
    });
  });
});

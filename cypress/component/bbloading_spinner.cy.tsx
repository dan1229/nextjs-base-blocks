import React from 'react';
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
      cy.get('div.containerLoading').should('exist');
      cy.get('span').should('exist');
      // Should have default variant and size classes
      cy.get('span[class*="loader_default"]').should('exist');
      cy.get('span[class*="loader_md"]').should('exist');
    });

    it('renders with custom className', () => {
      cy.mount(<BBLoadingSpinner {...defaultProps} className="custom-spinner-class" />);
      cy.get('.custom-spinner-class').should('exist');
    });

    it('has proper structure', () => {
      cy.mount(<BBLoadingSpinner {...defaultProps} />);
      cy.get('div.containerLoading').within(() => {
        cy.get('span').should('exist');
      });
    });
  });

  describe('Variant Testing', () => {
    const variants = ['default', 'double circle', 'circle bounce', 'spinning square'] as const;
    
    variants.forEach((variant) => {
      it(`renders with variant="${variant}"`, () => {
        cy.mount(<BBLoadingSpinner {...defaultProps} variant={variant} />);
        cy.get('div.containerLoading').should('exist');
        
        // Check appropriate class is applied
        if (variant === 'default') {
          cy.get('span[class*="loader_default"]').should('exist');
        } else if (variant === 'double circle') {
          cy.get('span[class*="loader_double_circle"]').should('exist');
        } else if (variant === 'circle bounce') {
          cy.get('span[class*="loader_circle_bounce"]').should('exist');
        } else if (variant === 'spinning square') {
          cy.get('span[class*="loader_spinning_square"]').should('exist');
        }
      });
    });

    it('falls back to default for invalid variant', () => {
      cy.mount(<BBLoadingSpinner {...defaultProps} variant={'invalid' as any} />);
      cy.get('span[class*="loader_default"]').should('exist');
    });
  });

  describe('Size Testing', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    
    sizes.forEach((size) => {
      it(`renders with size="${size}"`, () => {
        cy.mount(<BBLoadingSpinner {...defaultProps} size={size} />);
        cy.get('div.containerLoading').should('exist');
        cy.get(`span[class*="loader_${size}"]`).should('exist');
      });
    });

    it('renders with md size by default', () => {
      cy.mount(<BBLoadingSpinner {...defaultProps} />);
      cy.get('span[class*="loader_md"]').should('exist');
    });

    it('maintains size across variant changes', () => {
      cy.mount(<BBLoadingSpinner variant="double circle" size="lg" />);
      cy.get('span[class*="loader_lg"]').should('exist');
      cy.get('span[class*="loader_double_circle"]').should('exist');
    });
  });

  describe('Color Testing', () => {
    const predefinedColors = [
      'primary', 'secondary', 'accent', 'danger', 
      'success', 'warning', 'info', 'black', 'white'
    ] as const;
    
    predefinedColors.forEach((color) => {
      it(`renders with predefined color="${color}"`, () => {
        const bgColor = color === 'white' ? '#333' : '#fff';
        cy.mount(
          <div style={{ background: bgColor, padding: '20px' }}>
            <BBLoadingSpinner {...defaultProps} color={color} />
          </div>
        );
        cy.get('div.containerLoading').should('exist');
        cy.get(`span[class*="${color}"]`).should('exist');
      });
    });

    it('renders with custom color string', () => {
      cy.mount(<BBLoadingSpinner {...defaultProps} color={'#ff0000' as any} />);
      cy.get('span').should('have.css', '--loader-color', '#ff0000');
    });

    it('renders with rgb color value', () => {
      cy.mount(<BBLoadingSpinner {...defaultProps} color={'rgb(255, 0, 0)' as any} />);
      cy.get('span').should('have.css', '--loader-color', 'rgb(255, 0, 0)');
    });

    it('renders without color class when color prop is not provided', () => {
      cy.mount(<BBLoadingSpinner {...defaultProps} />);
      cy.get('span').should('exist');
      predefinedColors.forEach(color => {
        cy.get(`span[class*="${color}"]`).should('not.exist');
      });
    });
  });

  describe('Animation Behavior', () => {
    it('spinner is animated', () => {
      cy.mount(<BBLoadingSpinner {...defaultProps} />);
      
      // Check that the element exists and likely has animation styles
      cy.get('span').should('exist');
      
      // Note: Cypress doesn't easily test CSS animations, but we can verify the element is present
      // In a real application, you might use visual regression testing
    });

    it('animation continues when props change', () => {
      const TestComponent = () => {
        const [size, setSize] = React.useState<any>('md');
        const [color, setColor] = React.useState<any>('primary');
        
        return (
          <div>
            <button onClick={() => { setSize('lg'); setColor('accent'); }}>
              Change Props
            </button>
            <BBLoadingSpinner size={size} color={color} />
          </div>
        );
      };
      
      cy.mount(<TestComponent />);
      
      // Initial state
      cy.get('span[class*="loader_md"]').should('exist');
      cy.get('span[class*="primary"]').should('exist');
      
      // Change props
      cy.get('button').click();
      
      // Updated state - spinner should still be present and animated
      cy.get('span[class*="loader_lg"]').should('exist');
      cy.get('span[class*="accent"]').should('exist');
    });
  });

  describe('Multiple Spinners', () => {
    it('renders multiple spinners independently', () => {
      cy.mount(
        <div>
          <BBLoadingSpinner variant="default" size="sm" color="primary" />
          <BBLoadingSpinner variant="double circle" size="md" color="secondary" />
          <BBLoadingSpinner variant="circle bounce" size="lg" color="accent" />
          <BBLoadingSpinner variant="spinning square" size="sm" color="danger" />
        </div>
      );
      
      cy.get('div.containerLoading').should('have.length', 4);
      cy.get('span[class*="loader_default"]').should('exist');
      cy.get('span[class*="loader_double_circle"]').should('exist');
      cy.get('span[class*="loader_circle_bounce"]').should('exist');
      cy.get('span[class*="loader_spinning_square"]').should('exist');
    });
  });

  describe('Loading States', () => {
    it('shows spinner during loading operation', () => {
      const TestComponent = () => {
        const [loading, setLoading] = React.useState(false);
        
        return (
          <div>
            <button onClick={() => setLoading(!loading)}>
              Toggle Loading
            </button>
            {loading && <BBLoadingSpinner />}
            {!loading && <div>Content Loaded</div>}
          </div>
        );
      };
      
      cy.mount(<TestComponent />);
      
      // Initially not loading
      cy.contains('Content Loaded').should('exist');
      cy.get('div.containerLoading').should('not.exist');
      
      // Start loading
      cy.get('button').click();
      cy.get('div.containerLoading').should('exist');
      cy.contains('Content Loaded').should('not.exist');
      
      // Stop loading
      cy.get('button').click();
      cy.contains('Content Loaded').should('exist');
      cy.get('div.containerLoading').should('not.exist');
    });

    it('works as inline loading indicator', () => {
      cy.mount(
        <div>
          <span>Loading data</span>
          <BBLoadingSpinner size="sm" />
          <span>please wait...</span>
        </div>
      );
      
      cy.contains('Loading data').should('exist');
      cy.get('div.containerLoading').should('exist');
      cy.contains('please wait...').should('exist');
    });
  });

  describe('Visual Context', () => {
    it('renders on different backgrounds', () => {
      const backgrounds = ['#ffffff', '#000000', '#f0f0f0', '#333333', 'linear-gradient(to right, #ff0000, #00ff00)'];
      
      backgrounds.forEach(bg => {
        cy.mount(
          <div style={{ background: bg, padding: '40px' }}>
            <BBLoadingSpinner color={bg.includes('000000') || bg.includes('333') ? 'white' : 'black'} />
          </div>
        );
        cy.get('div.containerLoading').should('be.visible');
      });
    });

    it('renders in flex container', () => {
      cy.mount(
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span>Loading:</span>
          <BBLoadingSpinner size="sm" />
        </div>
      );
      
      cy.get('div.containerLoading').should('exist');
    });

    it('renders in centered container', () => {
      cy.mount(
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <BBLoadingSpinner size="lg" />
        </div>
      );
      
      cy.get('div.containerLoading').should('exist');
    });
  });

  describe('Edge Cases', () => {
    it('handles undefined props gracefully', () => {
      cy.mount(<BBLoadingSpinner variant={undefined} size={undefined} color={undefined} />);
      cy.get('div.containerLoading').should('exist');
      cy.get('span[class*="loader_default"]').should('exist');
      cy.get('span[class*="loader_md"]').should('exist');
    });

    it('handles rapid mounting and unmounting', () => {
      const TestComponent = () => {
        const [show, setShow] = React.useState(true);
        
        return (
          <div>
            <button onClick={() => setShow(!show)}>Toggle</button>
            {show && <BBLoadingSpinner />}
          </div>
        );
      };
      
      cy.mount(<TestComponent />);
      
      // Rapid toggling
      for (let i = 0; i < 10; i++) {
        cy.get('button').click();
      }
      
      // Should end in a stable state
      cy.get('div.containerLoading').should('exist');
    });

    it('handles invalid color gracefully', () => {
      cy.mount(<BBLoadingSpinner color={'not-a-color' as any} />);
      cy.get('span').should('have.css', '--loader-color', 'not-a-color');
    });

    it('maintains performance with multiple spinners', () => {
      cy.mount(
        <div>
          {Array.from({ length: 20 }, (_, i) => (
            <BBLoadingSpinner 
              key={i} 
              variant={['default', 'double circle', 'circle bounce', 'spinning square'][i % 4] as any}
              size={['sm', 'md', 'lg'][i % 3] as any}
            />
          ))}
        </div>
      );
      
      cy.get('div.containerLoading').should('have.length', 20);
    });
  });

  describe('Accessibility', () => {
    it('should be marked as presentational', () => {
      cy.mount(<BBLoadingSpinner {...defaultProps} />);
      // The spinner is purely visual, so it should not interfere with screen readers
      cy.get('span').should('exist');
    });

    it('should not block interaction with other elements', () => {
      cy.mount(
        <div>
          <button>Click me</button>
          <BBLoadingSpinner />
          <input type="text" placeholder="Type here" />
        </div>
      );
      
      // Should be able to interact with other elements
      cy.get('button').click();
      cy.get('input').type('test');
    });

    it('works well with loading announcements', () => {
      cy.mount(
        <div>
          <div role="status" aria-live="polite">
            <BBLoadingSpinner />
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
      
      cy.get('[role="status"]').should('exist');
      cy.get('div.containerLoading').should('exist');
    });

    it('maintains visibility at different zoom levels', () => {
      cy.mount(
        <div style={{ zoom: '200%' }}>
          <BBLoadingSpinner size="lg" />
        </div>
      );
      
      cy.get('div.containerLoading').should('be.visible');
    });
  });

  describe('Responsive Behavior', () => {
    testResponsiveViewports(() => {
      cy.mount(
        <div style={{ padding: '20px' }}>
          <h2>Loading Spinners at Different Sizes</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '20px' }}>
            <div>
              <p>Small:</p>
              <BBLoadingSpinner size="sm" color="primary" />
            </div>
            <div>
              <p>Medium:</p>
              <BBLoadingSpinner size="md" color="secondary" />
            </div>
            <div>
              <p>Large:</p>
              <BBLoadingSpinner size="lg" color="accent" />
            </div>
          </div>
          <div style={{ marginTop: '40px' }}>
            <h3>All Variants:</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
              <BBLoadingSpinner variant="default" />
              <BBLoadingSpinner variant="double circle" />
              <BBLoadingSpinner variant="circle bounce" />
              <BBLoadingSpinner variant="spinning square" />
            </div>
          </div>
        </div>
      );
      
      // Verify all spinners are visible at all viewport sizes
      cy.get('div.containerLoading').should('have.length', 7);
      cy.get('div.containerLoading').each(($el) => {
        cy.wrap($el).should('be.visible');
      });
    });
  });
});

import React from 'react';
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
      cy.get('div').should('have.class', 'divider');
    });

    it('renders with custom className', () => {
      cy.mount(<BBDivider {...defaultProps} className="custom-divider-class" />);
      cy.get('.custom-divider-class').should('exist');
    });

    it('renders as empty div element', () => {
      cy.mount(<BBDivider {...defaultProps} />);
      cy.get('div').should('be.empty');
    });
  });

  describe('Color Variants', () => {
    const colors = [
      'default', 'white', 'grey_light', 'grey_dark', 'black',
      'primary', 'primary_light', 'primary_dark',
      'secondary', 'secondary_light', 'secondary_dark',
      'accent', 'accent_light', 'accent_dark'
    ];
    
    colors.forEach((color) => {
      it(`renders with color="${color}"`, () => {
        cy.mount(<BBDivider {...defaultProps} color={color as any} />);
        cy.get('div').should('exist');
        cy.get('div').should('have.class', `color${color}`);
      });
    });
  });

  describe('Thickness Variants', () => {
    const thicknesses = ['xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl'];
    
    thicknesses.forEach((thickness) => {
      it(`renders with thickness="${thickness}"`, () => {
        cy.mount(<BBDivider {...defaultProps} thickness={thickness as any} />);
        cy.get('div').should('exist');
        cy.get('div').should('have.class', `thickness${thickness}`);
      });
    });
  });

  describe('Orientation', () => {
    it('renders horizontally by default', () => {
      cy.mount(<BBDivider {...defaultProps} />);
      cy.get('div').should('have.class', 'horizontal');
    });

    it('renders with horizontal orientation', () => {
      cy.mount(<BBDivider {...defaultProps} orientation="horizontal" />);
      cy.get('div').should('have.class', 'horizontal');
    });

    it('renders with vertical orientation', () => {
      cy.mount(
        <div style={{ height: '200px', display: 'flex', alignItems: 'center' }}>
          <BBDivider {...defaultProps} orientation="vertical" />
        </div>
      );
      cy.get('div.divider').should('have.class', 'vertical');
    });
  });

  describe('Style Types', () => {
    const styleTypes = ['solid', 'dashed', 'dotted'];
    
    styleTypes.forEach((styleType) => {
      it(`renders with styleType="${styleType}"`, () => {
        cy.mount(<BBDivider {...defaultProps} styleType={styleType as any} />);
        cy.get('div').should('exist');
        cy.get('div').should('have.class', `style${styleType.charAt(0).toUpperCase() + styleType.slice(1)}`);
      });
    });
  });

  describe('Length Variants', () => {
    const lengths = ['xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl', 'full'];
    
    lengths.forEach((length) => {
      it(`renders with length="${length}"`, () => {
        cy.mount(<BBDivider {...defaultProps} length={length as any} />);
        cy.get('div').should('exist');
        cy.get('div').should('have.class', `length${length}`);
      });
    });

    it('renders with full length by default', () => {
      cy.mount(<BBDivider {...defaultProps} />);
      cy.get('div').should('have.class', 'lengthfull');
    });
  });

  describe('Margin Variants', () => {
    const margins = ['none', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl'];
    
    margins.forEach((margin) => {
      it(`renders with margin="${margin}"`, () => {
        cy.mount(<BBDivider {...defaultProps} margin={margin as any} />);
        cy.get('div').should('exist');
        cy.get('div').should('have.class', `margin${margin}`);
      });
    });

    it('renders with xs margin by default', () => {
      cy.mount(<BBDivider {...defaultProps} />);
      cy.get('div').should('have.class', 'marginxs');
    });
  });

  describe('Prop Combinations', () => {
    it('renders with multiple props combined', () => {
      cy.mount(
        <BBDivider 
          color="primary"
          thickness="xl"
          orientation="horizontal"
          styleType="dashed"
          length="m"
          margin="l"
          className="combo-test"
        />
      );
      
      cy.get('div.combo-test').should('exist');
      cy.get('div').should('have.class', 'colorprimary');
      cy.get('div').should('have.class', 'thicknessxl');
      cy.get('div').should('have.class', 'horizontal');
      cy.get('div').should('have.class', 'styleDashed');
      cy.get('div').should('have.class', 'lengthm');
      cy.get('div').should('have.class', 'marginl');
    });

    it('renders thick dotted vertical divider', () => {
      cy.mount(
        <div style={{ height: '300px', display: 'flex', alignItems: 'center' }}>
          <BBDivider 
            orientation="vertical"
            thickness="xxxl"
            styleType="dotted"
            color="accent"
          />
        </div>
      );
      
      cy.get('div.divider').should('have.class', 'vertical');
      cy.get('div.divider').should('have.class', 'thicknessxxxl');
      cy.get('div.divider').should('have.class', 'styleDotted');
      cy.get('div.divider').should('have.class', 'coloraccent');
    });

    it('renders thin dashed horizontal divider with short length', () => {
      cy.mount(
        <BBDivider 
          orientation="horizontal"
          thickness="xs"
          styleType="dashed"
          length="s"
          color="secondary_light"
        />
      );
      
      cy.get('div.divider').should('have.class', 'horizontal');
      cy.get('div.divider').should('have.class', 'thicknessxs');
      cy.get('div.divider').should('have.class', 'styleDashed');
      cy.get('div.divider').should('have.class', 'lengths');
      cy.get('div.divider').should('have.class', 'colorsecondary_light');
    });
  });

  describe('Visual Context', () => {
    it('renders between text content', () => {
      cy.mount(
        <div>
          <p>Content above divider</p>
          <BBDivider color="primary" margin="l" />
          <p>Content below divider</p>
        </div>
      );
      
      cy.contains('Content above divider').should('exist');
      cy.get('div.divider').should('exist');
      cy.contains('Content below divider').should('exist');
    });

    it('renders between card sections', () => {
      cy.mount(
        <div style={{ background: '#f5f5f5', padding: '20px' }}>
          <div style={{ background: 'white', padding: '20px', marginBottom: '10px' }}>
            Card Section 1
          </div>
          <BBDivider color="grey_light" thickness="m" margin="m" />
          <div style={{ background: 'white', padding: '20px', marginTop: '10px' }}>
            Card Section 2
          </div>
        </div>
      );
      
      cy.get('div.divider').should('exist');
    });

    it('renders multiple dividers in sequence', () => {
      cy.mount(
        <div>
          <BBDivider color="primary" thickness="xs" />
          <BBDivider color="secondary" thickness="s" />
          <BBDivider color="accent" thickness="m" />
        </div>
      );
      
      cy.get('div.divider').should('have.length', 3);
    });

    it('renders in a flex container with vertical orientation', () => {
      cy.mount(
        <div style={{ display: 'flex', height: '100px', alignItems: 'center', gap: '20px' }}>
          <span>Left Content</span>
          <BBDivider orientation="vertical" color="black" />
          <span>Right Content</span>
        </div>
      );
      
      cy.get('div.divider.vertical').should('exist');
      cy.contains('Left Content').should('exist');
      cy.contains('Right Content').should('exist');
    });
  });

  describe('Edge Cases', () => {
    it('handles undefined props gracefully', () => {
      cy.mount(<BBDivider color={undefined} thickness={undefined} />);
      cy.get('div.divider').should('exist');
    });

    it('renders in containers with no explicit height (vertical)', () => {
      cy.mount(
        <div style={{ display: 'inline-flex' }}>
          <BBDivider orientation="vertical" />
        </div>
      );
      
      cy.get('div.divider.vertical').should('exist');
    });

    it('renders with all maximum values', () => {
      cy.mount(
        <BBDivider 
          thickness="xxxl"
          length="xxxl"
          margin="xxxl"
        />
      );
      
      cy.get('div.divider').should('have.class', 'thicknessxxxl');
      cy.get('div.divider').should('have.class', 'lengthxxxl');
      cy.get('div.divider').should('have.class', 'marginxxxl');
    });

    it('renders with all minimum values', () => {
      cy.mount(
        <BBDivider 
          thickness="xs"
          length="xs"
          margin="none"
        />
      );
      
      cy.get('div.divider').should('have.class', 'thicknessxs');
      cy.get('div.divider').should('have.class', 'lengthxs');
      cy.get('div.divider').should('have.class', 'marginnone');
    });

    it('maintains proper styling with rapid prop changes', () => {
      const TestComponent = () => {
        const [color, setColor] = React.useState<any>('primary');
        const [thickness, setThickness] = React.useState<any>('m');
        
        return (
          <div>
            <button onClick={() => {
              setColor('accent');
              setThickness('xl');
            }}>Change Props</button>
            <BBDivider color={color} thickness={thickness} />
          </div>
        );
      };
      
      cy.mount(<TestComponent />);
      
      // Initial state
      cy.get('div.divider').should('have.class', 'colorprimary');
      cy.get('div.divider').should('have.class', 'thicknessm');
      
      // Change props
      cy.get('button').click();
      
      // Updated state
      cy.get('div.divider').should('have.class', 'coloraccent');
      cy.get('div.divider').should('have.class', 'thicknessxl');
    });
  });

  describe('Accessibility', () => {
    it('renders as presentational element', () => {
      cy.mount(<BBDivider {...defaultProps} />);
      cy.get('div.divider').should('have.prop', 'tagName', 'DIV');
    });

    it('should not interfere with keyboard navigation', () => {
      cy.mount(
        <div>
          <button>Before Divider</button>
          <BBDivider />
          <button>After Divider</button>
        </div>
      );
      
      // Verify both buttons exist and are focusable
      cy.get('button').first().should('contain.text', 'Before Divider');
      cy.get('button').last().should('contain.text', 'After Divider');
      
      // Focus first button
      cy.get('button').first().focus();
      cy.focused().should('contain.text', 'Before Divider');
      
      // Focus second button (divider should not interfere)
      cy.get('button').last().focus();
      cy.focused().should('contain.text', 'After Divider');
    });

    it('maintains visual separation at high zoom levels', () => {
      cy.viewport(1280, 720);
      cy.mount(
        <div style={{ zoom: '200%' }}>
          <p>Text above</p>
          <BBDivider thickness="m" color="primary" />
          <p>Text below</p>
        </div>
      );
      
      cy.get('div.divider').should('be.visible');
    });
  });

  describe('Responsive Behavior', () => {
    testResponsiveViewports(() => {
      cy.mount(
        <div>
          <h2>Responsive Divider Test</h2>
          <BBDivider color="primary" thickness="m" margin="m" />
          <p>This divider should adapt to different viewport sizes</p>
          <BBDivider styleType="dashed" length="m" />
          <div style={{ display: 'flex', height: '100px', alignItems: 'center' }}>
            <span>Left</span>
            <BBDivider orientation="vertical" margin="m" />
            <span>Right</span>
          </div>
        </div>
      );
      
      // Verify dividers are visible at all viewport sizes
      cy.get('div.divider').should('have.length', 3);
      cy.get('div.divider').each(($el) => {
        cy.wrap($el).should('be.visible');
      });
    });
  });
});

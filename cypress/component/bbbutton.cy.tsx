import React from 'react';
import BBButton from '../../src/bbbutton';

describe('BBButton Component', () => {
  describe('Basic Rendering', () => {
    it('renders with default props', () => {
      cy.mount(<BBButton text="Click me" />);
      cy.get('button').should('exist');
      cy.get('button').should('contain.text', 'Click me');
      cy.get('button').should('have.attr', 'type', 'button');
    });

    it('renders without text', () => {
      cy.mount(<BBButton />);
      cy.get('button').should('exist');
      cy.get('button').should('be.disabled'); // Should be disabled when no onClick and not submit
    });
  });

  describe('Button Variants', () => {
    const variants = [
      'primary', 'secondary', 'accent', 'danger', 'success', 'warning', 'info',
      'black', 'white', 'inverse-primary', 'inverse-secondary', 'inverse-accent',
      'inverse-danger', 'inverse-success', 'inverse-warning', 'inverse-info',
      'transparent-primary', 'transparent-secondary', 'transparent-accent'
    ];

    variants.forEach(variant => {
      it(`renders with ${variant} variant`, () => {
        cy.mount(<BBButton text={variant} variant={variant as any} />);
        cy.get('button').should('contain.text', variant);
      });
    });
  });

  describe('Button Sizes', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];
    
    sizes.forEach(size => {
      it(`renders with ${size} size`, () => {
        cy.mount(<BBButton text={`Size ${size}`} size={size as any} />);
        cy.get('button').should('contain.text', `Size ${size}`);
      });
    });
  });

  describe('Button Elevations', () => {
    const elevations = ['none', 'low', 'medium', 'high'];
    
    elevations.forEach(elevation => {
      it(`renders with ${elevation} elevation`, () => {
        cy.mount(<BBButton text={`Elevation ${elevation}`} elevation={elevation as any} />);
        cy.get('button').should('contain.text', `Elevation ${elevation}`);
      });
    });
  });

  describe('Button Types', () => {
    it('renders with submit type', () => {
      cy.mount(<BBButton text="Submit" type="submit" />);
      cy.get('button').should('have.attr', 'type', 'submit');
      cy.get('button').should('not.be.disabled'); // Submit buttons shouldn't be auto-disabled
    });

    it('renders with reset type', () => {
      cy.mount(<BBButton text="Reset" type="reset" />);
      cy.get('button').should('have.attr', 'type', 'reset');
    });

    it('renders with form attribute', () => {
      cy.mount(<BBButton text="Submit Form" type="submit" idForm="test-form" />);
      cy.get('button').should('have.attr', 'form', 'test-form');
    });
  });

  describe('Click Events', () => {
    it('handles click events', () => {
      const onClick = cy.stub();
      cy.mount(<BBButton text="Clickable" onClick={onClick} />);
      
      cy.get('button').click();
      cy.then(() => {
        expect(onClick).to.have.been.calledOnce;
      });
    });

    it('prevents click when disabled', () => {
      const onClick = cy.stub();
      cy.mount(<BBButton text="Disabled" onClick={onClick} disabled={true} />);
      
      cy.get('button').click({ force: true });
      cy.then(() => {
        expect(onClick).not.to.have.been.called;
      });
    });

    it('passes event object to onClick handler', () => {
      const onClick = cy.stub();
      cy.mount(<BBButton text="Click Event" onClick={onClick} />);
      
      cy.get('button').click();
      cy.then(() => {
        expect(onClick).to.have.been.calledWith(Cypress.sinon.match.has('type', 'click'));
      });
    });
  });

  describe('Button States', () => {
    it('handles disabled state', () => {
      cy.mount(<BBButton text="Disabled" disabled={true} />);
      cy.get('button').should('be.disabled');
    });

    it('auto-disables when no onClick, href, or submit type', () => {
      cy.mount(<BBButton text="Auto Disabled" type="button" />);
      cy.get('button').should('be.disabled');
    });

    it('handles hover state when enabled', () => {
      cy.mount(<BBButton text="Hover Me" hover={true} onClick={() => {}} />);
      cy.get('button').should('exist');
    });

    it('disables hover when hover prop is false', () => {
      cy.mount(<BBButton text="No Hover" hover={false} onClick={() => {}} />);
      cy.get('button').should('exist');
    });

    it('handles focus state', () => {
      cy.mount(<BBButton text="Focused" focus={true} />);
      cy.get('button').should('exist');
    });
  });

  describe('Icon Support', () => {
    const TestIcon = () => <span data-testid="test-icon">★</span>;

    it('renders icon on the left by default', () => {
      cy.mount(<BBButton text="With Icon" icon={{ icon: <TestIcon /> }} />);
      cy.get('[data-testid="test-icon"]').should('exist');
      cy.get('button').should('contain.text', 'With Icon');
    });

    it('renders icon on the right', () => {
      cy.mount(<BBButton text="Icon Right" icon={{ icon: <TestIcon />, align: 'right' }} />);
      cy.get('[data-testid="test-icon"]').should('exist');
    });

    it('renders icon above text', () => {
      cy.mount(<BBButton text="Icon Above" icon={{ icon: <TestIcon />, align: 'above' }} />);
      cy.get('[data-testid="test-icon"]').should('exist');
    });

    it('renders icon below text', () => {
      cy.mount(<BBButton text="Icon Below" icon={{ icon: <TestIcon />, align: 'below' }} />);
      cy.get('[data-testid="test-icon"]').should('exist');
    });

    it('renders icon with space-between alignment', () => {
      cy.mount(<BBButton text="Icon Space" icon={{ icon: <TestIcon />, align: 'space-between' }} />);
      cy.get('[data-testid="test-icon"]').should('exist');
    });

    it('renders icon with custom color', () => {
      cy.mount(<BBButton text="Colored Icon" icon={{ icon: <TestIcon />, color: 'primary' }} />);
      cy.get('[data-testid="test-icon"]').should('exist');
    });

    it('renders without icon when icon is null', () => {
      cy.mount(<BBButton text="No Icon" icon={{ icon: null }} />);
      cy.get('[data-testid="test-icon"]').should('not.exist');
    });
  });

  describe('Link Functionality', () => {
    it('renders as a link when href is provided', () => {
      cy.mount(<BBButton text="Link Button" href="/test-path" />);
      cy.get('a').should('exist');
      cy.get('a').should('have.attr', 'href', '/test-path');
      cy.get('button').should('not.exist');
    });

    it('opens link in new tab when specified', () => {
      cy.mount(<BBButton text="New Tab Link" href="/test" openInNewTab={true} />);
      cy.get('a').should('have.attr', 'target', '_blank');
      cy.get('a').should('have.attr', 'rel', 'noreferrer noopener');
    });

    it('renders as regular link without new tab attributes', () => {
      cy.mount(<BBButton text="Same Tab Link" href="/test" openInNewTab={false} />);
      cy.get('a').should('have.attr', 'target', '_self');
      cy.get('a').should('not.have.attr', 'rel');
    });

    it('renders as disabled button when href is provided but disabled is true', () => {
      cy.mount(<BBButton text="Disabled Link" href="/test" disabled={true} />);
      cy.get('button').should('exist');
      cy.get('button').should('be.disabled');
      cy.get('a').should('not.exist');
    });

    it('warns when both onClick and href are provided', () => {
      cy.spy(console, 'warn');
      cy.mount(<BBButton text="Both Props" href="/test" onClick={() => {}} />);
      cy.then(() => {
        expect(console.warn).to.have.been.calledWith('BBButton: Both onClick and href are defined. onClick will be ignored.');
      });
    });
  });

  describe('Styling Options', () => {
    it('applies custom className', () => {
      cy.mount(<BBButton text="Custom Class" className="custom-button-class" />);
      cy.get('button').should('have.class', 'custom-button-class');
    });

    it('renders with transparent style', () => {
      cy.mount(<BBButton text="Transparent" transparent={true} />);
      cy.get('button').should('exist');
    });

    it('renders without border when noBorder is true', () => {
      cy.mount(<BBButton text="No Border" noBorder={true} />);
      cy.get('button').should('exist');
    });

    it('applies custom text color', () => {
      cy.mount(<BBButton text="Custom Color" colorText="primary" />);
      cy.get('button').should('exist');
    });
  });

  describe('Helper Text on Hover', () => {
    it('shows helper text on hover', () => {
      cy.mount(<BBButton text="Help Me" helperTextOnHover="This is helpful information" />);
      
      // Helper text should be hidden initially
      cy.get('.helperText').should('not.be.visible');
      
      // Hover over button
      cy.get('button').trigger('mouseenter');
      
      // Helper text should be visible
      cy.get('.helperText').should('be.visible');
      cy.get('.helperText').should('contain.text', 'This is helpful information');
      cy.get('.helperText').should('contain.text', '?');
      
      // Mouse leave
      cy.get('button').trigger('mouseleave');
      
      // Helper text should be hidden again
      cy.get('.helperText').should('not.be.visible');
    });

    it('applies custom helper text className', () => {
      cy.mount(
        <BBButton 
          text="Help Class" 
          helperTextOnHover="Helper" 
          classNameHelperText="custom-helper-class" 
        />
      );
      cy.get('.custom-helper-class').should('exist');
    });
  });

  describe('Edge Cases', () => {
    it('handles multiple rapid clicks', () => {
      const onClick = cy.stub();
      cy.mount(<BBButton text="Rapid Click" onClick={onClick} />);
      
      cy.get('button').click().click().click();
      cy.then(() => {
        expect(onClick).to.have.been.calledThrice;
      });
    });

    it('handles very long text gracefully', () => {
      const longText = 'This is a very long button text that might cause layout issues if not handled properly in the component';
      cy.mount(<BBButton text={longText} />);
      cy.get('button').should('contain.text', longText);
    });

    it('handles special characters in text', () => {
      const specialText = '<script>alert("XSS")</script> & "quotes" \'apostrophes\'';
      cy.mount(<BBButton text={specialText} />);
      cy.get('button').should('contain.text', specialText);
    });

    it('maintains functionality with all props combined', () => {
      const onClick = cy.stub();
      const TestIcon = () => <span data-testid="combo-icon">✓</span>;
      
      cy.mount(
        <BBButton
          text="Everything"
          type="button"
          size="lg"
          elevation="high"
          variant="accent"
          disabled={false}
          hover={true}
          focus={true}
          icon={{ icon: <TestIcon />, align: 'left', color: 'white' }}
          className="all-props-class"
          onClick={onClick}
          transparent={false}
          colorText="white"
          helperTextOnHover="All props test"
          noBorder={false}
        />
      );
      
      cy.get('button.all-props-class').should('exist');
      cy.get('button').should('contain.text', 'Everything');
      cy.get('[data-testid="combo-icon"]').should('exist');
      cy.get('button').click();
      cy.then(() => {
        expect(onClick).to.have.been.calledOnce;
      });
    });
  });

  describe('Accessibility', () => {
    it('maintains button semantics', () => {
      cy.mount(<BBButton text="Accessible" onClick={() => {}} />);
      cy.get('button').should('have.prop', 'tagName', 'BUTTON');
    });

    it('properly disables button for screen readers', () => {
      cy.mount(<BBButton text="Disabled for SR" disabled={true} />);
      cy.get('button').should('have.attr', 'disabled');
    });

    it('maintains link semantics when using href', () => {
      cy.mount(<BBButton text="Link Semantics" href="/path" />);
      cy.get('a').should('have.prop', 'tagName', 'A');
    });
  });
});

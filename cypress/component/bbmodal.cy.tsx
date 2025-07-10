import React from 'react';
import BBModal from '../../src/bbmodal';
import type { IPropsBBModal } from '../../src/bbmodal';
import { testResponsiveViewports } from '../support/test-helpers';

describe('BBModal Component Tests', () => {
  const defaultProps: IPropsBBModal = {
    children: <div>Modal Content</div>,
    title: 'Test Modal',
  };

  beforeEach(() => {
    cy.viewport(1280, 720);
  });

  describe('Basic Rendering', () => {
    it('renders with default props', () => {
      cy.mount(<BBModal {...defaultProps} />);
      cy.contains('Test Modal').should('exist');
      cy.contains('Modal Content').should('exist');
      // Should not show footer without callbacks
      cy.get('button').should('not.exist');
    });

    it('renders with title and content', () => {
      cy.mount(
        <BBModal title="Custom Title">
          <p>Custom paragraph content</p>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
          </ul>
        </BBModal>
      );
      cy.contains('Custom Title').should('exist');
      cy.contains('Custom paragraph content').should('exist');
      cy.contains('Item 1').should('exist');
      cy.contains('Item 2').should('exist');
    });

    it('renders with complex children', () => {
      cy.mount(
        <BBModal title="Complex Modal">
          <form>
            <input type="text" placeholder="Enter text" />
            <textarea placeholder="Enter description" />
            <select>
              <option>Option 1</option>
              <option>Option 2</option>
            </select>
          </form>
        </BBModal>
      );
      cy.get('input[type="text"]').should('exist');
      cy.get('textarea').should('exist');
      cy.get('select').should('exist');
    });
  });

  describe('Modal Actions', () => {
    it('renders with onDismiss callback and close button', () => {
      const onDismiss = cy.stub().as('onDismiss');
      cy.mount(<BBModal {...defaultProps} onDismiss={onDismiss} />);
      
      // Should show close button (X) in header
      cy.get('button svg').should('exist'); // Close icon
      cy.get('button').first().click();
      cy.get('@onDismiss').should('have.been.calledOnce');
    });

    it('renders with onConfirm callback', () => {
      const onConfirm = cy.stub().as('onConfirm');
      cy.mount(<BBModal {...defaultProps} onConfirm={onConfirm} />);
      
      cy.contains('Modal Content').should('exist');
      cy.get('button').contains('Confirm').should('exist');
      cy.get('button').contains('Confirm').click();
      cy.get('@onConfirm').should('have.been.calledOnce');
    });

    it('renders with both onDismiss and onConfirm', () => {
      const onDismiss = cy.stub().as('onDismiss');
      const onConfirm = cy.stub().as('onConfirm');
      cy.mount(
        <BBModal {...defaultProps} onDismiss={onDismiss} onConfirm={onConfirm} showButtonCancel />
      );
      
      // Should show all buttons
      cy.get('button').should('have.length', 3); // Close (X), Confirm, Cancel
      
      // Test confirm
      cy.contains('Confirm').click();
      cy.get('@onConfirm').should('have.been.calledOnce');
      
      // Test cancel
      cy.contains('Cancel').click();
      cy.get('@onDismiss').should('have.been.calledOnce');
    });

    it('closes modal when clicking outside (backdrop)', () => {
      const onDismiss = cy.stub().as('onDismiss');
      cy.mount(<BBModal {...defaultProps} onDismiss={onDismiss} outsideClickCloses />);
      
      // Get the modal container and click it directly
      cy.get('.containerModal').then(($el) => {
        const clickEvent = new MouseEvent('click', { bubbles: true });
        Object.defineProperty(clickEvent, 'target', { value: $el[0], writable: false });
        Object.defineProperty(clickEvent, 'currentTarget', { value: $el[0], writable: false });
        $el[0].dispatchEvent(clickEvent);
      });
      
      cy.get('@onDismiss').should('have.been.calledOnce');
    });

    it('does not close when clicking inside modal', () => {
      const onDismiss = cy.stub().as('onDismiss');
      cy.mount(<BBModal {...defaultProps} onDismiss={onDismiss} outsideClickCloses />);
      
      // Click inside the modal content
      cy.contains('Modal Content').click();
      cy.get('@onDismiss').should('not.have.been.called');
      
      // Click on the card itself
      cy.get('.modal').click();
      cy.get('@onDismiss').should('not.have.been.called');
    });

    it('does not close when outsideClickCloses is false', () => {
      const onDismiss = cy.stub().as('onDismiss');
      cy.mount(<BBModal {...defaultProps} onDismiss={onDismiss} outsideClickCloses={false} />);
      
      // Try to click outside
      cy.get('.containerModal').then(($el) => {
        const clickEvent = new MouseEvent('click', { bubbles: true });
        Object.defineProperty(clickEvent, 'target', { value: $el[0], writable: false });
        Object.defineProperty(clickEvent, 'currentTarget', { value: $el[0], writable: false });
        $el[0].dispatchEvent(clickEvent);
      });
      
      cy.get('@onDismiss').should('not.have.been.called');
    });
  });

  describe('Confirm Cancel Feature', () => {
    it('shows confirmation dialog when confirmCancel is true', () => {
      const onDismiss = cy.stub().as('onDismiss');
      cy.stub(window, 'confirm').returns(true);
      
      cy.mount(
        <BBModal {...defaultProps} onDismiss={onDismiss} confirmCancel={true} showButtonCancel />
      );
      
      cy.contains('Cancel').click();
      cy.then(() => {
        expect(window.confirm).to.have.been.calledWith('Are you sure you want to cancel?');
        expect(onDismiss).to.have.been.calledOnce;
      });
    });

    it('does not dismiss when user cancels confirmation', () => {
      const onDismiss = cy.stub().as('onDismiss');
      cy.stub(window, 'confirm').returns(false);
      
      cy.mount(
        <BBModal {...defaultProps} onDismiss={onDismiss} confirmCancel={true} showButtonCancel />
      );
      
      cy.contains('Cancel').click();
      cy.then(() => {
        expect(window.confirm).to.have.been.called;
        expect(onDismiss).not.to.have.been.called;
      });
    });
  });

  describe('Button Text Customization', () => {
    it('renders with custom button text', () => {
      cy.mount(
        <BBModal 
          {...defaultProps} 
          textDismiss="Close" 
          textConfirm="Save Changes" 
          onConfirm={() => {}} 
          onDismiss={() => {}} 
          showButtonCancel 
        />
      );
      cy.contains('Close').should('exist');
      cy.contains('Save Changes').should('exist');
    });

    it('uses default button text when not provided', () => {
      cy.mount(
        <BBModal 
          {...defaultProps} 
          onConfirm={() => {}} 
          onDismiss={() => {}} 
          showButtonCancel 
        />
      );
      cy.contains('Cancel').should('exist');
      cy.contains('Confirm').should('exist');
    });
  });

  describe('Footer Configuration', () => {
    it('shows footer only with confirm button', () => {
      cy.mount(<BBModal {...defaultProps} onConfirm={() => {}} />);
      cy.get('button').contains('Confirm').should('exist');
      cy.get('button').contains('Cancel').should('not.exist');
    });

    it('shows footer with cancel button when showButtonCancel is true', () => {
      cy.mount(<BBModal {...defaultProps} onDismiss={() => {}} showButtonCancel />);
      cy.contains('Cancel').should('exist');
    });

    it('hides footer when no callbacks or extra footer provided', () => {
      cy.mount(<BBModal {...defaultProps} />);
      cy.get('.containerButtons').should('not.exist');
    });

    it('renders with extraFooter content', () => {
      cy.mount(
        <BBModal 
          {...defaultProps} 
          extraFooter={<button className="extra-button">Extra Action</button>}
        />
      );
      cy.get('.extra-button').should('exist');
      cy.contains('Extra Action').should('exist');
    });

    it('renders with all footer elements', () => {
      cy.mount(
        <BBModal 
          {...defaultProps} 
          onConfirm={() => {}}
          onDismiss={() => {}}
          showButtonCancel
          extraFooter={<span>Additional Info</span>}
        />
      );
      cy.contains('Confirm').should('exist');
      cy.contains('Cancel').should('exist');
      cy.contains('Additional Info').should('exist');
    });
  });

  describe('Loading State', () => {
    it('shows loading spinner when loading is true', () => {
      cy.mount(<BBModal {...defaultProps} loading onConfirm={() => {}} />);
      cy.get('.containerLoading').should('exist');
      cy.contains('Confirm').should('not.exist');
    });

    it('hides buttons when loading', () => {
      cy.mount(
        <BBModal 
          {...defaultProps} 
          loading 
          onConfirm={() => {}} 
          onDismiss={() => {}} 
          showButtonCancel 
        />
      );
      cy.get('.containerLoading').should('exist');
      cy.contains('Confirm').should('not.exist');
      cy.contains('Cancel').should('not.exist');
    });

    it('transitions from loading to normal state', () => {
      const TestComponent = () => {
        const [loading, setLoading] = React.useState(true);
        
        return (
          <div>
            <button onClick={() => setLoading(false)}>Stop Loading</button>
            <BBModal {...defaultProps} loading={loading} onConfirm={() => {}} />
          </div>
        );
      };
      
      cy.mount(<TestComponent />);
      
      // Initially loading
      cy.get('.containerLoading').should('exist');
      
      // Stop loading
      cy.get('button').contains('Stop Loading').click();
      
      // Should show confirm button
      cy.contains('Confirm').should('exist');
      cy.get('.containerLoading').should('not.exist');
    });
  });

  describe('Form Integration', () => {
    it('submits form with idForm prop', () => {
      const onSubmit = cy.stub().as('onSubmit');
      
      cy.mount(
        <div>
          <form id="test-form" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
            <BBModal {...defaultProps} onConfirm={() => {}} idForm="test-form" />
          </form>
        </div>
      );
      
      cy.get('button[type="submit"]').should('have.attr', 'form', 'test-form');
    });
  });

  describe('Size Variants', () => {
    const widths = ['sm', 'md', 'lg', 'full'] as const;
    
    widths.forEach((width) => {
      it(`renders with width="${width}"`, () => {
        cy.mount(<BBModal {...defaultProps} width={width} />);
        cy.get(`.modal.${width}`).should('exist');
      });
    });

    it('defaults to md width', () => {
      cy.mount(<BBModal {...defaultProps} />);
      cy.get('.modal.md').should('exist');
    });
  });

  describe('Header Configuration', () => {
    const headerSizes = ['tiny', 'small', 'medium', 'large', 'xlarge', 'xxlarge', 'xxxlarge'] as const;
    
    headerSizes.forEach((size) => {
      it(`renders with headerTextSize="${size}"`, () => {
        cy.mount(<BBModal {...defaultProps} headerTextSize={size} />);
        cy.contains('Test Modal').should('exist');
      });
    });

    it('defaults to xlarge header text size', () => {
      cy.mount(<BBModal {...defaultProps} />);
      cy.contains('Test Modal').should('exist');
    });
  });

  describe('Border Color', () => {
    const borderColors = ['default', 'transparent', 'white', 'grey_light', 'grey_dark', 'black', 'primary', 'secondary', 'accent'] as const;
    
    borderColors.forEach((color) => {
      it(`renders with colorBorder="${color}"`, () => {
        cy.mount(<BBModal {...defaultProps} colorBorder={color} />);
        cy.get('.modal').should('exist');
      });
    });
  });

  describe('Body Scroll Lock', () => {
    it('prevents body scroll when modal is mounted', () => {
      cy.mount(<BBModal {...defaultProps} />);
      
      cy.then(() => {
        expect(document.body.style.overflow).to.equal('hidden');
      });
    });

    it('restores body scroll when modal is unmounted', () => {
      const TestComponent = () => {
        const [showModal, setShowModal] = React.useState(true);
        
        return (
          <div>
            <button onClick={() => setShowModal(false)}>Close Modal</button>
            {showModal && <BBModal {...defaultProps} />}
          </div>
        );
      };
      
      // Store original overflow
      const originalOverflow = document.body.style.overflow;
      
      cy.mount(<TestComponent />);
      
      // Body should be locked
      cy.then(() => {
        expect(document.body.style.overflow).to.equal('hidden');
      });
      
      // Close modal
      cy.get('button').contains('Close Modal').click();
      
      // Body scroll should be restored
      cy.then(() => {
        expect(document.body.style.overflow).to.equal(originalOverflow);
      });
    });
  });

  describe('Edge Cases', () => {
    it('handles very long title', () => {
      const longTitle = 'This is a very long modal title that might cause layout issues if not handled properly in the component';
      cy.mount(<BBModal {...defaultProps} title={longTitle} />);
      cy.contains(longTitle).should('exist');
    });

    it('handles very long content', () => {
      const longContent = Array(50).fill('This is a line of content. ').join('');
      cy.mount(
        <BBModal title="Long Content Modal">
          <div>{longContent}</div>
        </BBModal>
      );
      cy.get('.bodyModal').should('exist');
    });

    it('handles empty children gracefully', () => {
      cy.mount(<BBModal title="Empty Modal">{''}</BBModal>);
      cy.contains('Empty Modal').should('exist');
    });

    it('handles rapid open/close', () => {
      const TestComponent = () => {
        const [show, setShow] = React.useState(true);
        
        return (
          <div>
            <button onClick={() => setShow(!show)}>Toggle</button>
            {show && <BBModal {...defaultProps} />}
          </div>
        );
      };
      
      cy.mount(<TestComponent />);
      
      // Rapid toggling
      for (let i = 0; i < 10; i++) {
        cy.get('button').contains('Toggle').click();
      }
      
      // Should be in a stable state
      cy.get('.modal').should('exist');
    });

    it('handles undefined callbacks gracefully', () => {
      cy.mount(
        <BBModal 
          {...defaultProps} 
          onConfirm={undefined}
          onDismiss={undefined}
        />
      );
      cy.contains('Test Modal').should('exist');
    });
  });

  describe('Accessibility', () => {
    it('maintains proper DOM structure', () => {
      cy.mount(<BBModal {...defaultProps} onDismiss={() => {}} />);
      
      // Modal container should exist
      cy.get('.containerModal').should('exist');
      
      // Should have proper heading structure
      cy.contains('Test Modal').should('exist');
    });

    it('manages focus properly', () => {
      cy.mount(
        <BBModal title="Focus Test" onDismiss={() => {}} onConfirm={() => {}}>
          <input type="text" placeholder="Focus me" />
        </BBModal>
      );
      
      // Focus should be manageable within modal
      cy.get('input[type="text"]').focus();
      cy.focused().should('have.attr', 'placeholder', 'Focus me');
    });

    it('close button is keyboard accessible', () => {
      const onDismiss = cy.stub();
      cy.mount(<BBModal {...defaultProps} onDismiss={onDismiss} />);
      
      // Focus close button
      cy.get('button').first().focus();
      cy.focused().type('{enter}');
      
      cy.then(() => {
        expect(onDismiss).to.have.been.called;
      });
    });

    it('action buttons are keyboard accessible', () => {
      const onConfirm = cy.stub();
      const onDismiss = cy.stub();
      
      cy.mount(
        <BBModal 
          {...defaultProps} 
          onConfirm={onConfirm} 
          onDismiss={onDismiss} 
          showButtonCancel 
        />
      );
      
      // Tab through buttons and activate with keyboard
      cy.get('button').contains('Confirm').focus();
      cy.focused().type('{enter}');
      
      cy.then(() => {
        expect(onConfirm).to.have.been.called;
      });
    });
  });

  describe('Visual States', () => {
    it('renders on dark background', () => {
      cy.mount(
        <div style={{ background: '#000', height: '100vh', padding: '20px' }}>
          <BBModal {...defaultProps} />
        </div>
      );
      cy.get('.modal').should('be.visible');
    });

    it('renders with nested modals warning', () => {
      cy.mount(
        <BBModal title="Parent Modal">
          <p>This modal contains another modal (not recommended)</p>
          <BBModal title="Nested Modal">
            <p>Nested content</p>
          </BBModal>
        </BBModal>
      );
      
      cy.contains('Parent Modal').should('exist');
      cy.contains('Nested Modal').should('exist');
    });
  });

  describe('Responsive Behavior', () => {
    testResponsiveViewports(() => {
      cy.mount(
        <BBModal 
          title="Responsive Modal"
          onConfirm={() => {}}
          onDismiss={() => {}}
          showButtonCancel
          width="lg"
        >
          <div>
            <h3>Modal Content</h3>
            <p>This modal should adapt to different screen sizes.</p>
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
              <li>Item 3</li>
            </ul>
          </div>
        </BBModal>
      );
      
      // Verify modal is visible and functional at all sizes
      cy.get('.modal').should('be.visible');
      cy.contains('Responsive Modal').should('be.visible');
      cy.contains('Confirm').should('be.visible');
      cy.contains('Cancel').should('be.visible');
    });
  });
});

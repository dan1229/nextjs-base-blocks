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
      cy.contains('Modal Content').should('exist');
      cy.contains('Test Modal').should('exist');
      cy.get('.containerModal').should('exist');
    });

    it('renders with onDismiss callback', () => {
      const onDismiss = cy.stub();
      cy.mount(<BBModal {...defaultProps} onDismiss={onDismiss} />);
      cy.get('button[aria-label*="close"], button').first().click();
      cy.then(() => {
        expect(onDismiss).to.have.been.called;
      });
    });

    it('renders with onConfirm callback', () => {
      const onConfirm = cy.stub();
      cy.mount(<BBModal {...defaultProps} onConfirm={onConfirm} />);
      cy.contains('Confirm').click();
      cy.then(() => {
        expect(onConfirm).to.have.been.called;
      });
    });
  });

  describe('Modal Actions', () => {
    it('closes modal when clicking outside (backdrop)', () => {
      const onDismiss = cy.stub();
      cy.mount(<BBModal {...defaultProps} onDismiss={onDismiss} outsideClickCloses />);
      cy.get('.containerModal').click();
      cy.then(() => {
        expect(onDismiss).to.have.been.called;
      });
    });

    it('does not close when outsideClickCloses is false', () => {
      const onDismiss = cy.stub();
      cy.mount(<BBModal {...defaultProps} onDismiss={onDismiss} outsideClickCloses={false} />);
      cy.get('.containerModal').click();
      cy.then(() => {
        expect(onDismiss).not.to.have.been.called;
      });
    });
  });

  describe('Props Testing', () => {
    it('renders with custom button text', () => {
      cy.mount(<BBModal {...defaultProps} onConfirm={() => {}} textConfirm="Save Changes" />);
      cy.contains('Save Changes').should('exist');
    });

    it('renders with showButtonCancel', () => {
      cy.mount(<BBModal {...defaultProps} onDismiss={() => {}} showButtonCancel />);
      cy.contains('Cancel').should('exist');
    });

    it('renders with loading state', () => {
      cy.mount(<BBModal {...defaultProps} onConfirm={() => {}} loading />);
      cy.get('.containerLoading').should('exist'); // Loading spinner
    });

    // Width variants
    const widths = ['sm', 'md', 'lg', 'xl'];
    widths.forEach((width) => {
      it(`renders with width="${width}"`, () => {
        cy.mount(<BBModal {...defaultProps} width={width as any} />);
        cy.get('.modal').should('exist');
      });
    });
  });

  describe('Responsive Behavior', () => {
    testResponsiveViewports(() => {
      cy.mount(<BBModal {...defaultProps} />);
    });
  });

  // TODO: Test confirmCancel confirmation dialog
  // TODO: Test form submission with idForm prop
  // TODO: Test keyboard accessibility (Escape key, focus trap)
  // TODO: Test modal animations and z-index stacking
  // TODO: Test extraFooter content
});

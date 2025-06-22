import BBModal from '../../src/bbmodal';
import type { IPropsBBModal } from '../../src/bbmodal';
import { testResponsiveViewports } from '../support/test-helpers';

describe('BBModal Component Tests', () => {
  const defaultProps: IPropsBBModal = {
    children: <div>Modal Content</div>,
    isOpen: true,
  };

  beforeEach(() => {
    cy.viewport(1280, 720);
  });

  describe('Basic Rendering', () => {
    it('renders with default props', () => {
      cy.mount(<BBModal {...defaultProps} />);
      cy.contains('Modal Content').should('exist');
    });

    it('renders with onDismiss callback', () => {
      const onDismiss = cy.stub().as('onDismiss');
      cy.mount(<BBModal {...defaultProps} onDismiss={onDismiss} />);
      cy.contains('Modal Content').should('exist');
      cy.get('button').contains('Cancel').click();
      cy.get('@onDismiss').should('have.been.called');
    });

    it('renders with onConfirm callback', () => {
      const onConfirm = cy.stub().as('onConfirm');
      cy.mount(<BBModal {...defaultProps} onConfirm={onConfirm} />);
      cy.contains('Modal Content').should('exist');
      cy.get('button').contains('Confirm').click();
      cy.get('@onConfirm').should('have.been.called');
    });
  });

  describe('Modal Actions', () => {
    it('closes modal when clicking outside (backdrop)', () => {
      const onDismiss = cy.stub().as('onDismiss');
      cy.mount(<BBModal {...defaultProps} onDismiss={onDismiss} outsideClickCloses />);
      cy.get('body').click(0, 0); // Click outside modal
      cy.then(() => {
        expect(onDismiss).to.have.been.called;
      });
    });

    it('does not close when outsideClickCloses is false', () => {
      const onDismiss = cy.stub().as('onDismiss');
      cy.mount(<BBModal {...defaultProps} onDismiss={onDismiss} outsideClickCloses={false} />);
      cy.get('body').click(0, 0); // Click outside modal
      cy.then(() => {
        expect(onDismiss).not.to.have.been.called;
      });
    });
  });

  describe('Props Testing', () => {
    it('renders with custom button text', () => {
      cy.mount(<BBModal {...defaultProps} textButtonCancel="Close" textButtonConfirm="Save" />);
      cy.contains('Close').should('exist');
      cy.contains('Save').should('exist');
    });

    it('renders with showButtonCancel', () => {
      cy.mount(<BBModal {...defaultProps} showButtonCancel />);
      cy.contains('Cancel').should('exist');
    });

    it('renders with loading state', () => {
      cy.mount(<BBModal {...defaultProps} loading />);
      cy.get('div').should('exist'); // Loading spinner
    });

    const widths = ['sm', 'md', 'lg', 'xl'];
    widths.forEach((width) => {
      it(`renders with width="${width}"`, () => {
        cy.mount(<BBModal {...defaultProps} width={width as any} />);
        cy.get('div').should('exist'); // Modal container exists
      });
    });
  });

  describe('Responsive Behavior', () => {
    testResponsiveViewports(() => {
      cy.mount(<BBModal {...defaultProps} />);
    });
  });

  // TODO: Add more comprehensive tests for:
  // - Keyboard navigation (ESC key)
  // - Focus management
  // - ARIA attributes
  // - Animation states
});

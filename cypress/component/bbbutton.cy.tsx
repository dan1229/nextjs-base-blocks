import React from 'react';
import BBButton from '../../src/bbbutton';

describe('BBButton Component Tests', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
  });

  describe('Basic Rendering', () => {
    it('renders with default props', () => {
      cy.mount(<BBButton text="Test Button" />);
      cy.get('button').should('contain.text', 'Test Button');
    });

    it('renders with custom className', () => {
      cy.mount(<BBButton text="Test" className="custom-button" />);
      cy.get('button').should('have.class', 'custom-button');
    });
  });

  describe('Button Variants', () => {
    const variants = ['primary', 'secondary', 'accent', 'danger', 'success', 'warning'] as const;

    variants.forEach((variant) => {
      it(`renders with variant="${variant}"`, () => {
        cy.mount(<BBButton text={`Test ${variant}`} variant={variant} />);
        cy.get('button').should('contain.text', `Test ${variant}`);
      });
    });
  });

  describe('Interactive Features', () => {
    it('handles click events', () => {
      const onClick = cy.stub();
      cy.mount(<BBButton text="Clickable" onClick={onClick} />);
      cy.get('button').click();
      cy.then(() => {
        expect(onClick).to.have.been.called;
      });
    });

    it('handles disabled state', () => {
      cy.mount(<BBButton text="Disabled" disabled />);
      cy.get('button').should('be.disabled');
    });
  });
});

// Simple test component to verify Cypress setup
const SimpleButton = ({ text, onClick }: { text: string; onClick?: () => void }) => (
  <button onClick={onClick} style={{ padding: '10px', margin: '5px' }}>
    {text}
  </button>
);

describe('Simple Button Test (Setup Verification)', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
  });

  describe('Basic Rendering', () => {
    it('renders a simple button', () => {
      cy.mount(<SimpleButton text="Test Button" />);
      cy.get('button').should('contain.text', 'Test Button');
      cy.get('button').should('have.css', 'padding', '10px');
    });

    it('handles click events', () => {
      const onClick = cy.stub();
      cy.mount(<SimpleButton text="Clickable" onClick={onClick} />);
      cy.get('button').click();
      cy.then(() => {
        expect(onClick).to.have.been.called;
      });
    });
  });
});

import React from 'react';

// Simple test component without CSS modules
const SimpleButton = ({
  text,
  onClick,
  className,
  disabled,
}: {
  text: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}) => (
  <button
    onClick={onClick}
    className={className}
    disabled={disabled}
    style={{
      padding: '10px 16px',
      margin: '5px',
      backgroundColor: disabled ? '#ccc' : '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: disabled ? 'not-allowed' : 'pointer',
    }}
  >
    {text}
  </button>
);

describe('Simple Component Test (Setup Verification)', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
  });

  describe('Basic Rendering', () => {
    it('renders a simple button', () => {
      cy.mount(<SimpleButton text="Test Button" />);
      cy.get('button').should('contain.text', 'Test Button');
      cy.get('button').should('have.css', 'padding', '10px 16px');
    });

    it('renders with custom className', () => {
      cy.mount(<SimpleButton text="Test" className="custom-button" />);
      cy.get('button').should('have.class', 'custom-button');
    });
  });

  describe('Interactive Features', () => {
    it('handles click events', () => {
      const onClick = cy.stub();
      cy.mount(<SimpleButton text="Clickable" onClick={onClick} />);
      cy.get('button').click();
      cy.then(() => {
        expect(onClick).to.have.been.called;
      });
    });

    it('handles disabled state', () => {
      cy.mount(<SimpleButton text="Disabled" disabled />);
      cy.get('button').should('be.disabled');
      cy.get('button').should('have.css', 'background-color', 'rgb(204, 204, 204)');
    });
  });

  describe('Content Rendering', () => {
    it('renders text content', () => {
      cy.mount(<SimpleButton text="Simple text content" />);
      cy.get('button').should('contain.text', 'Simple text content');
    });

    it('handles special characters', () => {
      const specialText = 'Special chars: <>&"\'';
      cy.mount(<SimpleButton text={specialText} />);
      cy.get('button').should('contain.text', specialText);
    });
  });
});

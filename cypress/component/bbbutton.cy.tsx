import React from 'react';
import BBButton from '../../src/bbbutton';

describe('BBButton Component', () => {
  it('renders with default props', () => {
    cy.mount(<BBButton text="Click me" />);
    cy.get('button').should('exist');
    cy.get('button').should('contain.text', 'Click me');
  });

  it('renders with primary variant', () => {
    cy.mount(<BBButton text="Primary" variant="primary" />);
    cy.get('button').should('contain.text', 'Primary');
  });

  it('renders with secondary variant', () => {
    cy.mount(<BBButton text="Secondary" variant="secondary" />);
    cy.get('button').should('contain.text', 'Secondary');
  });

  it('handles click events', () => {
    const onClick = cy.stub();
    cy.mount(<BBButton text="Clickable" onClick={onClick} />);

    cy.get('button').click();
    cy.then(() => {
      expect(onClick).to.have.been.called;
    });
  });

  it('handles disabled state', () => {
    cy.mount(<BBButton text="Disabled" disabled={true} />);
    cy.get('button').should('be.disabled');
  });

  it('applies custom className', () => {
    cy.mount(<BBButton text="Custom" className="custom-class" />);
    cy.get('button').should('have.class', 'custom-class');
  });

  it('handles different button types', () => {
    cy.mount(<BBButton text="Submit" type="submit" />);
    cy.get('button').should('have.attr', 'type', 'submit');
  });
});

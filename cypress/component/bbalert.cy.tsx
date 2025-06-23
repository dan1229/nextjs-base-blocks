import React from 'react';
import BBAlert from '../../src/bbalert';

describe('BBAlert Component', () => {
  it('renders with default props', () => {
    cy.mount(<BBAlert>Test alert message</BBAlert>);
    cy.get('div').should('exist');
    cy.get('div').should('contain.text', 'Test alert message');
  });

  it('renders with success variant', () => {
    cy.mount(<BBAlert variant="success">Success message</BBAlert>);
    cy.get('div').should('contain.text', 'Success message');
  });

  it('renders with danger variant', () => {
    cy.mount(<BBAlert variant="danger">Error message</BBAlert>);
    cy.get('div').should('contain.text', 'Error message');
  });

  it('renders with warning variant', () => {
    cy.mount(<BBAlert variant="warning">Warning message</BBAlert>);
    cy.get('div').should('contain.text', 'Warning message');
  });

  it('renders with info variant', () => {
    cy.mount(<BBAlert variant="info">Info message</BBAlert>);
    cy.get('div').should('contain.text', 'Info message');
  });

  it('handles dismissible functionality', () => {
    cy.mount(<BBAlert>Dismissible alert</BBAlert>);
    cy.get('svg').should('exist'); // Close icon should be present by default
  });

  it('applies custom className', () => {
    cy.mount(<BBAlert className="custom-class">Custom class alert</BBAlert>);
    cy.get('div').should('have.class', 'custom-class');
  });
});

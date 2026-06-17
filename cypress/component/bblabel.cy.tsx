import React from 'react';
import BBLabel from '../../src/bblabel';

describe('BBLabel Component Tests', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
  });

  describe('Basic Rendering', () => {
    it('renders the label text in a span', () => {
      cy.mount(<BBLabel>Pricing</BBLabel>);
      cy.get('span').should('contain.text', 'Pricing');
    });

    it('renders as a span (inline label)', () => {
      cy.mount(<BBLabel>why preon</BBLabel>);
      cy.get('span').should('exist');
      cy.get('span').should('contain.text', 'why preon');
    });

    it('renders with custom className', () => {
      cy.mount(<BBLabel className="custom-label">Label</BBLabel>);
      cy.get('.custom-label').should('exist');
    });
  });

  describe('Color', () => {
    it('renders with an explicit color', () => {
      cy.mount(<BBLabel color="primary">Tag</BBLabel>);
      cy.get('span').should('contain.text', 'Tag');
    });
  });

  describe('Styling', () => {
    it('renders the text in a monospace font', () => {
      cy.mount(<BBLabel>mono</BBLabel>);
      cy.get('span')
        .should('have.css', 'font-family')
        .and('match', /mono|monospace|Consolas|Menlo/i);
    });
  });
});

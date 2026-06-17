import React from 'react';
import BBCode from '../../src/bbcode';

describe('BBCode Component Tests', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
  });

  describe('Basic Rendering', () => {
    it('renders inline code by default', () => {
      cy.mount(<BBCode>npm run build</BBCode>);
      cy.get('code').should('contain.text', 'npm run build');
      cy.get('pre').should('not.exist');
    });

    it('renders block code with pre when block is set', () => {
      cy.mount(<BBCode block>$ docker compose up</BBCode>);
      cy.get('pre').should('exist');
      cy.get('pre code').should('contain.text', '$ docker compose up');
    });

    it('renders with custom className', () => {
      cy.mount(<BBCode className="custom-code">x = 1</BBCode>);
      cy.get('code.custom-code').should('exist');
    });
  });

  describe('Styling', () => {
    it('renders the text in a monospace font', () => {
      cy.mount(<BBCode>mono()</BBCode>);
      cy.get('code span')
        .should('have.css', 'font-family')
        .and('match', /mono|Consolas|Menlo|monospace/i);
    });
  });

  describe('Edge Cases', () => {
    it('handles special characters', () => {
      cy.mount(<BBCode>{'preon trace SN-4471 | grep heat'}</BBCode>);
      cy.get('code').should('contain.text', 'preon trace SN-4471 | grep heat');
    });
  });
});

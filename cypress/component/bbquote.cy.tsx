import React from 'react';
import BBQuote from '../../src/bbquote';

describe('BBQuote Component Tests', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
  });

  describe('Basic Rendering', () => {
    it('renders the quote body inside figure/blockquote', () => {
      cy.mount(<BBQuote>We said we have traceability.</BBQuote>);
      cy.get('figure blockquote').should('contain.text', 'We said we have traceability.');
    });

    it('renders attribution inside figcaption/cite when cite is provided', () => {
      cy.mount(<BBQuote cite="Quality lead, tier-2 aero shop">Quote text</BBQuote>);
      cy.get('figure figcaption cite').should('contain.text', 'Quality lead, tier-2 aero shop');
    });

    it('omits figcaption when no cite is provided', () => {
      cy.mount(<BBQuote>Just a quote</BBQuote>);
      cy.get('figcaption').should('not.exist');
    });

    it('applies custom className to the figure', () => {
      cy.mount(<BBQuote className="custom-quote">Quote</BBQuote>);
      cy.get('figure.custom-quote').should('exist');
    });
  });

  describe('Edge Cases', () => {
    it('renders JSX cite content', () => {
      cy.mount(
        <BBQuote cite={<span data-testid="cite-jsx">Scott</span>}>Quote</BBQuote>
      );
      cy.get('[data-testid="cite-jsx"]').should('exist');
    });
  });
});

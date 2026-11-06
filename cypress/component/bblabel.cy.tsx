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
    it("sets no font of its own, so BBText's main font applies", () => {
      // Component tests stub every `.module.scss` (cypress.config.ts), so the font BBText's
      // class sets never loads here. What this can see is the inline font BBLabel used to
      // write, the mono stack, which overrode that class in a real host.
      cy.mount(<BBLabel>label</BBLabel>);
      cy.get('span').should(($span) => {
        expect($span[0].style.fontFamily, 'no inline font').to.equal('');
      });
    });
  });
});

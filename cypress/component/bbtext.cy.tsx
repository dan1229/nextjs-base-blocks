import React from 'react';
import BBText from '../../src/bbtext';
import type { IPropsBBText } from '../../src/bbtext';
import { testResponsiveViewports, createTestData } from '../support/test-helpers';

describe('BBText Component Tests', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
  });

  describe('Basic Rendering', () => {
    it('renders with default props', () => {
      cy.mount(<BBText>Test text content</BBText>);
      cy.get('span').should('contain.text', 'Test text content');
    });

    it('renders with custom className', () => {
      cy.mount(<BBText className="custom-text">Content</BBText>);
      cy.get('.custom-text').should('exist');
    });
  });

  describe('Text Sizes', () => {
    const sizes: Array<IPropsBBText['size']> = ['tiny', 'small', 'medium', 'large', 'xlarge', 'xxlarge', 'xxxlarge'];

    sizes.forEach((size) => {
      if (size) {
        it(`renders with size="${size}"`, () => {
          cy.mount(<BBText size={size}>Test content</BBText>);
          cy.get('span').should('exist');
          // You could add specific size class checks here
        });
      }
    });
  });

  describe('Text Colors', () => {
    const colors: Array<IPropsBBText['color']> = [
      'grey_light',
      'grey_dark',
      'black',
      'white',
      'primary',
      'secondary',
      'accent',
      'success',
      'warning',
      'danger',
      'info',
    ];

    colors.forEach((color) => {
      if (color) {
        it(`renders with color="${color}"`, () => {
          cy.mount(<BBText color={color}>Colored text</BBText>);
          cy.get('span').should('exist');
          // You could add specific color class checks here
        });
      }
    });
  });

  describe('Text Styles', () => {
    it('renders bold text', () => {
      cy.mount(<BBText bold>Bold text</BBText>);
      cy.get('span').should('exist');
    });

    it('renders italic text', () => {
      cy.mount(<BBText italics>Italic text</BBText>);
      cy.get('span').should('exist');
    });

    it('renders underlined text', () => {
      cy.mount(<BBText underline>Underlined text</BBText>);
      cy.get('span').should('exist');
    });
  });

  describe('Content Rendering', () => {
    it('renders text content', () => {
      cy.mount(<BBText>Simple text content</BBText>);
      cy.get('span').should('contain.text', 'Simple text content');
    });

    it('renders JSX content', () => {
      cy.mount(
        <BBText>
          <strong data-testid="bold-text">Bold text</strong>
        </BBText>
      );
      cy.get('[data-testid="bold-text"]').should('exist');
    });
  });

  describe('Responsive Behavior', () => {
    testResponsiveViewports(() => {
      cy.mount(<BBText>Responsive text test</BBText>);
    });
  });

  describe('Edge Cases', () => {
    it('handles empty content', () => {
      cy.mount(<BBText> </BBText>);
      cy.get('span').should('exist');
    });

    it('handles very long content', () => {
      const longContent = createTestData.longText();
      cy.mount(<BBText>{longContent}</BBText>);
      cy.get('span').should('contain.text', longContent);
    });

    it('handles special characters', () => {
      const specialContent = createTestData.specialChars();
      cy.mount(<BBText>{specialContent}</BBText>);
      cy.get('span').should('contain.text', specialContent);
    });

    it('handles multiple style combinations', () => {
      cy.mount(
        <BBText size="large" color="primary" bold italics className="multi-style-test">
          Multi-style text
        </BBText>
      );
      cy.get('.multi-style-test').should('exist');
      cy.get('span').should('contain.text', 'Multi-style text');
    });
  });
});

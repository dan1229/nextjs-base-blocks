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
      cy.get('p').should('contain.text', 'Test text content'); // medium size = p tag
    });

    it('renders with custom className', () => {
      cy.mount(<BBText className="custom-text">Content</BBText>);
      cy.get('.custom-text').should('exist');
    });

    it('renders as span when asSpan is true', () => {
      cy.mount(<BBText asSpan>Test text content</BBText>);
      cy.get('span').should('contain.text', 'Test text content');
    });
  });

  describe('Text Sizes', () => {
    const sizeToTag = {
      tiny: 'p',
      small: 'p',
      medium: 'p',
      large: 'h4',
      xlarge: 'h3',
      xxlarge: 'h2',
      xxxlarge: 'h1',
    };

    Object.entries(sizeToTag).forEach(([size, expectedTag]) => {
      it(`renders with size="${size}" as ${expectedTag}`, () => {
        cy.mount(<BBText size={size as IPropsBBText['size']}>Test content</BBText>);
        cy.get(expectedTag).should('exist');
        cy.get(expectedTag).should('contain.text', 'Test content');
      });
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
          cy.mount(
            <BBText color={color} asSpan>
              Colored text
            </BBText>
          );
          cy.get('span').should('exist');
          cy.get('span').should('contain.text', 'Colored text');
        });
      }
    });
  });

  describe('Text Styles', () => {
    it('renders bold text', () => {
      cy.mount(
        <BBText bold asSpan>
          Bold text
        </BBText>
      );
      cy.get('span').should('exist');
      cy.get('span').should('contain.text', 'Bold text');
    });

    it('renders italic text', () => {
      cy.mount(
        <BBText italics asSpan>
          Italic text
        </BBText>
      );
      cy.get('span').should('exist');
      cy.get('span').should('contain.text', 'Italic text');
    });

    it('renders underlined text', () => {
      cy.mount(
        <BBText underline asSpan>
          Underlined text
        </BBText>
      );
      cy.get('span').should('exist');
      cy.get('span').should('contain.text', 'Underlined text');
    });
  });

  describe('Content Rendering', () => {
    it('renders text content', () => {
      cy.mount(<BBText>Simple text content</BBText>);
      cy.get('p').should('contain.text', 'Simple text content');
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
      cy.mount(<BBText asSpan> </BBText>);
      cy.get('span').should('exist');
    });

    it('handles very long content', () => {
      const longContent = createTestData.longText();
      cy.mount(<BBText asSpan>{longContent}</BBText>);
      cy.get('span').should('contain.text', longContent);
    });

    it('handles special characters', () => {
      const specialContent = createTestData.specialChars();
      cy.mount(<BBText asSpan>{specialContent}</BBText>);
      cy.get('span').should('contain.text', specialContent);
    });

    it('handles multiple style combinations', () => {
      cy.mount(
        <BBText size="large" color="primary" bold italics className="multi-style-test">
          Multi-style text
        </BBText>
      );
      cy.get('.multi-style-test').should('exist');
      cy.get('h4').should('contain.text', 'Multi-style text'); // large size = h4 tag
    });
  });
});

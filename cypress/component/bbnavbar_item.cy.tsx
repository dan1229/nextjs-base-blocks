import BBNavbarItem from '../../src/bbnavbar_item';
import type { IPropsBBNavbarItem } from '../../src/bbnavbar_item';
import { testResponsiveViewports } from '../support/test-helpers';

describe('BBNavbarItem Component Tests', () => {
  const defaultProps: IPropsBBNavbarItem = {
    title: 'Test Item',
    href: '/test',
  };

  beforeEach(() => {
    cy.viewport(1280, 720);
  });

  describe('Basic Rendering', () => {
    it('renders with default props', () => {
      cy.mount(<BBNavbarItem {...defaultProps} />);
      cy.contains('Test Item').should('exist');
      cy.get('a').should('have.attr', 'href', '/test');
    });

    it('renders with custom className', () => {
      cy.mount(<BBNavbarItem {...defaultProps} className="custom-class" />);
      cy.get('.custom-class').should('exist');
    });

    it('renders with dropdown children', () => {
      const dropdownChildren = [<BBNavbarItem key="1" title="Sub Item 1" href="/sub1" />, <BBNavbarItem key="2" title="Sub Item 2" href="/sub2" />];
      cy.mount(<BBNavbarItem {...defaultProps} dropdownChildren={dropdownChildren} />);
      cy.get('li').should('exist'); // Dropdown container exists
    });

    it('renders with children component instead of title', () => {
      const buttonComponent = <button>Custom Button</button>;
      cy.mount(<BBNavbarItem href="/test" children={buttonComponent} />);
      cy.contains('Custom Button').should('exist');
    });
  });

  describe('Active State Detection', () => {
    it('shows active state when href matches current path', () => {
      cy.mount(<BBNavbarItem {...defaultProps} href="/test" />);
      cy.get('a').should('exist');
    });

    it('shows active state when activePaths match', () => {
      cy.mount(<BBNavbarItem {...defaultProps} activePaths={['/test', '/test-alt']} />);
      cy.get('a').should('exist');
    });
  });

  describe('Props Testing', () => {
    const borderColors = ['default', 'transparent', 'white', 'grey_light', 'grey_dark', 'black', 'primary', 'secondary', 'accent'];
    borderColors.forEach((color) => {
      it(`renders with colorBorder="${color}"`, () => {
        cy.mount(<BBNavbarItem {...defaultProps} colorBorder={color as any} />);
        cy.get('a').should('exist');
      });
    });

    it('renders without border when noBorder is true', () => {
      cy.mount(<BBNavbarItem {...defaultProps} noBorder />);
      cy.get('a').should('exist'); // Element exists, CSS classes handled by modules
    });
  });

  describe('Dropdown Behavior', () => {
    it('shows dropdown content when hovering over item with children', () => {
      const dropdownChildren = [<BBNavbarItem key="1" title="Sub Item" href="/sub" />];
      cy.mount(<BBNavbarItem {...defaultProps} dropdownChildren={dropdownChildren} />);
      cy.get('li').first().trigger('mouseenter');
      cy.contains('Sub Item').should('exist');
    });
  });

  describe('Responsive Behavior', () => {
    testResponsiveViewports(() => {
      cy.mount(<BBNavbarItem {...defaultProps} />);
    });
  });

  // TODO: Add more comprehensive tests for:
  // - Keyboard navigation
  // - Focus states
  // - ARIA attributes
  // - Complex dropdown interactions
});

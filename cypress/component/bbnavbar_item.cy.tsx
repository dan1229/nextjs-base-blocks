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
      cy.mount(<BBNavbarItem {...defaultProps} className="custom-nav-item" />);
      cy.get('.custom-nav-item').should('exist');
    });

    it('renders with dropdown children', () => {
      const children = [<BBNavbarItem key="1" title="Sub Item 1" href="/sub1" />, <BBNavbarItem key="2" title="Sub Item 2" href="/sub2" />];
      cy.mount(<BBNavbarItem {...defaultProps} children={children} />);
      cy.get('.dropdownContainer').should('exist');
      cy.get('.iconDropdown').should('exist');
    });
  });

  describe('Active State Detection', () => {
    it('shows active state when href matches current path', () => {
      // Note: This test may need mocking of usePathname
      cy.mount(<BBNavbarItem {...defaultProps} href="/current-path" />);
      // TODO: Mock usePathname to return '/current-path' and test active state
    });

    it('shows active state when activePaths match', () => {
      cy.mount(<BBNavbarItem {...defaultProps} activePaths={['/test', '/test-alt']} />);
      // TODO: Mock usePathname and test activePaths functionality
    });
  });

  describe('Props Testing', () => {
    // Color border variants
    const colorBorders = ['default', 'transparent', 'white', 'grey_light', 'grey_dark', 'black', 'primary', 'secondary', 'accent'];
    colorBorders.forEach((colorBorder) => {
      it(`renders with colorBorder="${colorBorder}"`, () => {
        cy.mount(<BBNavbarItem {...defaultProps} colorBorder={colorBorder as any} />);
        cy.get('li').should('exist');
      });
    });

    it('renders without border when noBorder is true', () => {
      cy.mount(<BBNavbarItem {...defaultProps} noBorder />);
      cy.get('.noBorder').should('exist');
    });
  });

  describe('Dropdown Behavior', () => {
    it('shows dropdown content when hovering over item with children', () => {
      const children = [<BBNavbarItem key="1" title="Sub Item 1" href="/sub1" />];
      cy.mount(<BBNavbarItem {...defaultProps} children={children} />);
      cy.get('.dropdownContainer').trigger('mouseenter');
      cy.get('.dropdownContent').should('exist');
    });
  });

  describe('Responsive Behavior', () => {
    testResponsiveViewports(() => {
      cy.mount(<BBNavbarItem {...defaultProps} />);
    });
  });

  // TODO: Test navigation behavior with Next.js router
  // TODO: Test keyboard accessibility (focus, enter key)
  // TODO: Test aria attributes for dropdown menus
  // TODO: Test complex nested dropdown structures
});

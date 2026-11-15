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
      const children = [<BBNavbarItem key="1" title="Sub Item 1" href="/sub1" />, <BBNavbarItem key="2" title="Sub Item 2" href="/sub2" />];
      cy.mount(<BBNavbarItem {...defaultProps} children={children} />);
      cy.get('li').should('exist'); // Dropdown container exists
    });

    it('renders with component as title', () => {
      const buttonTitle = <button data-testid="custom-button">Click Me</button>;
      cy.mount(<BBNavbarItem title={buttonTitle} href="/test" />);
      cy.get('[data-testid="custom-button"]').should('exist');
      cy.get('[data-testid="custom-button"]').should('contain', 'Click Me');
    });

    it('renders with complex component as title', () => {
      const complexTitle = (
        <div data-testid="complex-title">
          <span>Icon</span>
          <span>Text</span>
        </div>
      );
      cy.mount(<BBNavbarItem title={complexTitle} href="/test" />);
      cy.get('[data-testid="complex-title"]').should('exist');
      cy.get('[data-testid="complex-title"]').should('contain', 'Icon');
      cy.get('[data-testid="complex-title"]').should('contain', 'Text');
    });
  });

  describe('Active State Detection', () => {
    // The harness mocks usePathname to '/', so href="/" is the page being shown.
    it('marks the link to this page aria-current="page"', () => {
      cy.mount(<BBNavbarItem {...defaultProps} href="/" />);
      cy.get('a').should('have.attr', 'aria-current', 'page');
    });

    it('leaves other links unmarked', () => {
      cy.mount(<BBNavbarItem {...defaultProps} href="/about" />);
      cy.get('a').should('not.have.attr', 'aria-current');
    });

    it('marks an item lit by activePaths aria-current="true"', () => {
      cy.mount(<BBNavbarItem {...defaultProps} href="/about" activePaths={['/']} />);
      cy.get('a').should('have.attr', 'aria-current', 'true');
    });

    it('marks the parent "true" and the child "page" when a dropdown child is this page', () => {
      const children = [<BBNavbarItem key="1" title="Home" href="/" />];
      cy.mount(<BBNavbarItem title="Parent" href="/about" children={children} />);
      cy.get('#nav-item-parent a').first().should('have.attr', 'aria-current', 'true');
      cy.get('#nav-item-home a').should('have.attr', 'aria-current', 'page');
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
      const children = [<BBNavbarItem key="1" title="Sub Item" href="/sub" />];
      cy.mount(<BBNavbarItem {...defaultProps} children={children} />);
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

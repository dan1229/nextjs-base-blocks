import BBNavbar from '../../src/bbnavbar';
import BBNavbarItem from '../../src/bbnavbar_item';
import type { IPropsBBNavbar } from '../../src/bbnavbar';
import { testResponsiveViewports } from '../support/test-helpers';

describe('BBNavbar Component Tests', () => {
  const defaultProps: IPropsBBNavbar = {
    children: (
      <>
        <BBNavbarItem title="Home" href="/" />
        <BBNavbarItem title="About" href="/about" />
      </>
    ),
    mainContent: <div>Main content area</div>,
  };

  beforeEach(() => {
    cy.viewport(1280, 720);
  });

  describe('Basic Rendering', () => {
    it('renders with default props', () => {
      cy.mount(<BBNavbar {...defaultProps} />);
      cy.get('nav').should('exist');
      cy.contains('Home').should('exist');
      cy.contains('About').should('exist');
      cy.contains('Main content area').should('exist');
    });

    it('renders with title', () => {
      cy.mount(<BBNavbar {...defaultProps} title="My App" />);
      cy.contains('My App').should('exist');
    });

    it('renders with image', () => {
      cy.mount(<BBNavbar {...defaultProps} imageSrc="/logo.png" imageWidth={40} imageHeight={40} />);
      cy.get('img').should('exist').and('have.attr', 'src', '/logo.png');
    });
  });

  describe('Navigation Behavior', () => {
    it('shows mobile menu when hamburger is clicked', () => {
      cy.mount(<BBNavbar {...defaultProps} />);
      cy.get('.iconHamburger').click();
      cy.get('.expanded').should('exist');
    });

    it('hides mobile menu when clicking outside', () => {
      cy.mount(<BBNavbar {...defaultProps} />);
      cy.get('.iconHamburger').click();
      cy.get('.expanded').should('exist');
      cy.get('body').click();
      cy.get('.expanded').should('not.exist');
    });

    it('navigates when brand is clicked', () => {
      cy.mount(<BBNavbar {...defaultProps} routeBrand="/home" />);
      cy.get('.containerBrand').click();
      // TODO: Test actual navigation - requires router setup
    });
  });

  describe('Props Testing', () => {
    // Elevation variants
    const elevations = ['none', 'low', 'high', 'rainbow'];
    elevations.forEach((elevation) => {
      it(`renders with elevation="${elevation}"`, () => {
        cy.mount(<BBNavbar {...defaultProps} elevation={elevation as any} />);
        cy.get('nav').should('exist');
      });
    });

    it('renders in vertical mode', () => {
      cy.mount(<BBNavbar {...defaultProps} vertical />);
      cy.get('nav')
        .should('have.class')
        .and('match', /vertical/);
    });

    it('renders with action buttons', () => {
      const actionButtons = <button>Login</button>;
      cy.mount(<BBNavbar {...defaultProps} buttonsAction={actionButtons} showButtonsAction />);
      cy.contains('Login').should('exist');
    });

    // Menu alignment
    const alignments = ['left', 'center', 'right'];
    alignments.forEach((alignment) => {
      it(`renders with menuAlignment="${alignment}"`, () => {
        cy.mount(<BBNavbar {...defaultProps} menuAlignment={alignment as any} />);
        cy.get('.navigationMenu').should('exist');
      });
    });
  });

  describe('Responsive Behavior', () => {
    testResponsiveViewports(() => {
      cy.mount(<BBNavbar {...defaultProps} />);
    });
  });

  // TODO: Test keyboard navigation
  // TODO: Test accessibility attributes
  // TODO: Test brand horizontal/vertical layout
  // TODO: Test with complex navigation structures
});

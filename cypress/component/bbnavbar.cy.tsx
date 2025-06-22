import BBNavbar from '../../src/bbnavbar';
import BBNavbarItem from '../../src/bbnavbar_item';
import type { IPropsBBNavbar } from '../../src/bbnavbar';
import { testResponsiveViewports } from '../support/test-helpers';

// Mock Next.js router properly
beforeEach(() => {
  // Mock the useRouter hook from next/navigation
  cy.window().then((win) => {
    // Create a mock router object
    const mockRouter = {
      push: cy.stub().as('routerPush'),
      replace: cy.stub().as('routerReplace'),
      back: cy.stub().as('routerBack'),
      forward: cy.stub().as('routerForward'),
      refresh: cy.stub().as('routerRefresh'),
      pathname: '/',
      query: {},
      asPath: '/',
    };

    // Mock the module
    (win as any).next = {
      router: mockRouter,
    };

    // Also set the __NEXT_ROUTER__ for compatibility
    (win as any).__NEXT_ROUTER__ = mockRouter;
  });
});

describe('BBNavbar Component Tests', () => {
  const defaultProps: IPropsBBNavbar = {
    children: (
      <>
        <BBNavbarItem title="Home" href="/" />
        <BBNavbarItem title="About" href="/about" />
      </>
    ),
    mainContent: <div>Main Content</div>,
  };

  describe('Basic Rendering', () => {
    it('renders with default props', () => {
      cy.mount(<BBNavbar {...defaultProps} />);
      cy.contains('Main Content').should('exist');
      cy.get('nav').should('exist');
    });

    it('renders with title', () => {
      cy.mount(<BBNavbar {...defaultProps} title="Test App" />);
      cy.contains('Test App').should('exist');
    });

    it('renders with image', () => {
      cy.mount(<BBNavbar {...defaultProps} imageSrc="/test-logo.png" imageWidth={50} imageHeight={50} />);
      cy.get('img').should('exist');
    });
  });

  describe('Navigation Behavior', () => {
    it('shows mobile menu when hamburger is clicked', () => {
      cy.viewport(375, 667); // Mobile viewport
      cy.mount(<BBNavbar {...defaultProps} />);
      cy.get('[data-cy="hamburger"]').click();
      cy.get('.expanded').should('exist');
    });

    it('hides mobile menu when clicking outside', () => {
      cy.viewport(375, 667);
      cy.mount(<BBNavbar {...defaultProps} />);
      cy.get('[data-cy="hamburger"]').click();
      cy.get('.expanded').should('exist');
      cy.get('body').click(0, 0);
      cy.get('.expanded').should('not.exist');
    });

    it('navigates when brand is clicked', () => {
      cy.mount(<BBNavbar {...defaultProps} title="Test App" routeBrand="/home" />);
      cy.contains('Test App').click();
      cy.get('@routerPush').should('have.been.calledWith', '/home');
    });
  });

  describe('Props Testing', () => {
    const elevations = ['none', 'low', 'high', 'rainbow'];
    elevations.forEach((elevation) => {
      it(`renders with elevation="${elevation}"`, () => {
        cy.mount(<BBNavbar {...defaultProps} elevation={elevation as any} />);
        cy.get('nav').should('exist');
      });
    });

    it('renders in vertical mode', () => {
      cy.mount(<BBNavbar {...defaultProps} vertical />);
      cy.get('nav').should('exist');
    });

    it('renders with action buttons', () => {
      const actionButtons = <button>Login</button>;
      cy.mount(<BBNavbar {...defaultProps} buttonsAction={actionButtons} showButtonsAction />);
      cy.contains('Login').should('exist');
    });

    const alignments = ['left', 'center', 'right'];
    alignments.forEach((alignment) => {
      it(`renders with menuAlignment="${alignment}"`, () => {
        cy.mount(<BBNavbar {...defaultProps} menuAlignment={alignment as any} />);
        cy.get('nav').should('exist');
      });
    });
  });

  describe('Responsive Behavior', () => {
    testResponsiveViewports(() => {
      cy.mount(<BBNavbar {...defaultProps} />);
    });
  });

  // TODO: Add more comprehensive tests for:
  // - Keyboard navigation
  // - ARIA attributes
  // - Complex menu structures
});

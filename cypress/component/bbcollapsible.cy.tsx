import BBCollapsible from '../../src/bbcollapsible';
import type { IPropsBBCollapsible } from '../../src/bbcollapsible';
import { testResponsiveViewports } from '../support/test-helpers';

describe('BBCollapsible Component Tests', () => {
  const defaultProps: IPropsBBCollapsible = {
    children: [],
  };

  beforeEach(() => {
    cy.viewport(1280, 720);
  });

  describe('Basic Rendering', () => {
    it('renders with default props', () => {
      cy.mount(
        <BBCollapsible {...defaultProps}>
          <BBCollapsible.Header>Test Header</BBCollapsible.Header>
          <BBCollapsible.Content>Test Content</BBCollapsible.Content>
        </BBCollapsible>
      );
      cy.contains('Test Header').should('exist');
      cy.contains('Test Content').should('not.exist'); // Initially collapsed
    });

    it('renders expanded initially when isExpandedInitial is true', () => {
      cy.mount(
        <BBCollapsible {...defaultProps} isExpandedInitial={true}>
          <BBCollapsible.Header>Test Header</BBCollapsible.Header>
          <BBCollapsible.Content>Test Content</BBCollapsible.Content>
        </BBCollapsible>
      );
      cy.contains('Test Header').should('exist');
      cy.contains('Test Content').should('exist');
    });
  });

  describe('Expand/Collapse Functionality', () => {
    it('expands and collapses content when header is clicked', () => {
      cy.mount(
        <BBCollapsible {...defaultProps}>
          <BBCollapsible.Header>Clickable Header</BBCollapsible.Header>
          <BBCollapsible.Content>Hidden Content</BBCollapsible.Content>
        </BBCollapsible>
      );

      // Initially collapsed
      cy.contains('Hidden Content').should('not.exist');

      // Click to expand
      cy.contains('Clickable Header').click();
      cy.contains('Hidden Content').should('exist');

      // Click to collapse
      cy.contains('Clickable Header').click();
      cy.contains('Hidden Content').should('not.exist');
    });

    it('shows correct arrow direction', () => {
      cy.mount(
        <BBCollapsible {...defaultProps}>
          <BBCollapsible.Header>Test Header</BBCollapsible.Header>
          <BBCollapsible.Content>Test Content</BBCollapsible.Content>
        </BBCollapsible>
      );

      // Initially should show down arrow
      cy.get('button').should('contain', '▼');

      // After clicking should show up arrow
      cy.contains('Test Header').click();
      cy.get('button').should('contain', '▲');
    });
  });

  describe('Callback Functions', () => {
    it('calls onExpanded callback', () => {
      const onExpanded = cy.stub();
      cy.mount(
        <BBCollapsible {...defaultProps} onExpanded={onExpanded}>
          <BBCollapsible.Header>Test Header</BBCollapsible.Header>
          <BBCollapsible.Content>Test Content</BBCollapsible.Content>
        </BBCollapsible>
      );

      cy.contains('Test Header').click();
      cy.then(() => {
        expect(onExpanded).to.have.been.calledWith(true);
      });
    });

    it('calls onCollapsed callback', () => {
      const onCollapsed = cy.stub();
      cy.mount(
        <BBCollapsible {...defaultProps} isExpandedInitial={true} onCollapsed={onCollapsed}>
          <BBCollapsible.Header>Test Header</BBCollapsible.Header>
          <BBCollapsible.Content>Test Content</BBCollapsible.Content>
        </BBCollapsible>
      );

      cy.contains('Test Header').click();
      cy.then(() => {
        expect(onCollapsed).to.have.been.called;
      });
    });
  });

  describe('Responsive Behavior', () => {
    testResponsiveViewports(() => {
      cy.mount(
        <BBCollapsible {...defaultProps}>
          <BBCollapsible.Header>Test Header</BBCollapsible.Header>
          <BBCollapsible.Content>Test Content</BBCollapsible.Content>
        </BBCollapsible>
      );
    });
  });

  // TODO: Test custom arrow icons
  // TODO: Test different button variants
  // TODO: Test noPadding prop
  // TODO: Add accessibility tests for keyboard navigation
  // TODO: Test BBCard inheritance (elevation, shadows, etc.)
});

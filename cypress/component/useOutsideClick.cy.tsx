import React, { useRef, useState } from 'react';
import useOutsideClick from '../../src/utils/hooks/UseOutsideClick';

// Test component that uses the useOutsideClick hook
const TestComponent: React.FC = () => {
  const [clickedOutside, setClickedOutside] = useState(false);
  const [clickedInside, setClickedInside] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => {
    setClickedOutside(true);
  });

  const handleInsideClick = () => {
    setClickedInside(true);
  };

  const reset = () => {
    setClickedOutside(false);
    setClickedInside(false);
  };

  return (
    <div style={{ padding: '20px', height: '100vh' }}>
      <div
        ref={ref}
        onClick={handleInsideClick}
        style={{
          width: '200px',
          height: '200px',
          backgroundColor: '#f0f0f0',
          border: '2px solid #ccc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          margin: '20px',
        }}
        data-testid="inside-element"
      >
        Inside Element
      </div>
      
      <div
        style={{
          width: '200px',
          height: '100px',
          backgroundColor: '#e0e0e0',
          border: '2px solid #999',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          margin: '20px',
        }}
        data-testid="outside-element"
      >
        Outside Element
      </div>

      <div data-testid="status" style={{ marginTop: '20px' }}>
        <div data-testid="outside-status">
          Clicked Outside: {clickedOutside ? 'Yes' : 'No'}
        </div>
        <div data-testid="inside-status">
          Clicked Inside: {clickedInside ? 'Yes' : 'No'}
        </div>
        <button onClick={reset} data-testid="reset-button">
          Reset
        </button>
      </div>
    </div>
  );
};

// Test component for testing mouseup vs mousedown
const MouseEventTestComponent: React.FC<{ mouseEvent?: 'mousedown' | 'mouseup' }> = ({ 
  mouseEvent = 'mousedown' 
}) => {
  const [triggered, setTriggered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => {
    setTriggered(true);
  }, mouseEvent);

  return (
    <div style={{ padding: '20px', height: '100vh' }}>
      <div
        ref={ref}
        style={{
          width: '200px',
          height: '200px',
          backgroundColor: '#f0f0f0',
          border: '2px solid #ccc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '20px',
        }}
        data-testid="target-element"
      >
        Target Element
      </div>
      
      <div
        style={{
          width: '200px',
          height: '100px',
          backgroundColor: '#e0e0e0',
          margin: '20px',
        }}
        data-testid="outside-area"
      >
        Outside Area
      </div>

      <div data-testid="trigger-status">
        Hook Triggered ({mouseEvent}): {triggered ? 'Yes' : 'No'}
      </div>
    </div>
  );
};

describe('useOutsideClick Hook Tests', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
  });

  describe('Basic Functionality', () => {
    it('should trigger callback when clicking outside the referenced element', () => {
      cy.mount(<TestComponent />);

      // Initially, no clicks should be registered
      cy.get('[data-testid="outside-status"]').should('contain', 'Clicked Outside: No');
      cy.get('[data-testid="inside-status"]').should('contain', 'Clicked Inside: No');

      // Click outside the referenced element
      cy.get('[data-testid="outside-element"]').click();

      // Should trigger outside click
      cy.get('[data-testid="outside-status"]').should('contain', 'Clicked Outside: Yes');
      cy.get('[data-testid="inside-status"]').should('contain', 'Clicked Inside: No');
    });

    it('should NOT trigger callback when clicking inside the referenced element', () => {
      cy.mount(<TestComponent />);

      // Click inside the referenced element
      cy.get('[data-testid="inside-element"]').click();

      // Should NOT trigger outside click, but should trigger inside click
      cy.get('[data-testid="outside-status"]').should('contain', 'Clicked Outside: No');
      cy.get('[data-testid="inside-status"]').should('contain', 'Clicked Inside: Yes');
    });

    it('should trigger callback when clicking on the document body', () => {
      cy.mount(<TestComponent />);

      // Click on empty area (document body)
      cy.get('body').click(50, 50);

      // Should trigger outside click
      cy.get('[data-testid="outside-status"]').should('contain', 'Clicked Outside: Yes');
    });
  });

  describe('Mouse Event Types', () => {
    it('should work with mousedown event (default)', () => {
      cy.mount(<MouseEventTestComponent mouseEvent="mousedown" />);

      cy.get('[data-testid="trigger-status"]').should('contain', 'Hook Triggered (mousedown): No');

      // Click outside
      cy.get('[data-testid="outside-area"]').click();

      cy.get('[data-testid="trigger-status"]').should('contain', 'Hook Triggered (mousedown): Yes');
    });

    it('should work with mouseup event', () => {
      cy.mount(<MouseEventTestComponent mouseEvent="mouseup" />);

      cy.get('[data-testid="trigger-status"]').should('contain', 'Hook Triggered (mouseup): No');

      // Click outside
      cy.get('[data-testid="outside-area"]').click();

      cy.get('[data-testid="trigger-status"]').should('contain', 'Hook Triggered (mouseup): Yes');
    });
  });

  describe('Edge Cases', () => {
    it('should handle multiple rapid clicks correctly', () => {
      const onClick = cy.stub().as('outsideClickHandler');
      
      const MultiClickComponent = () => {
        const ref = useRef<HTMLDivElement>(null);
        useOutsideClick(ref, onClick);

        return (
          <div style={{ padding: '20px' }}>
            <div ref={ref} data-testid="inside" style={{ width: '100px', height: '100px', background: '#f0f0f0' }}>
              Inside
            </div>
            <div data-testid="outside" style={{ width: '100px', height: '100px', background: '#e0e0e0' }}>
              Outside
            </div>
          </div>
        );
      };

      cy.mount(<MultiClickComponent />);

      // Multiple rapid clicks outside
      cy.get('[data-testid="outside"]')
        .click()
        .click()
        .click();

      cy.get('@outsideClickHandler').should('have.callCount', 3);
    });

    it('should handle null ref gracefully', () => {
      const NullRefComponent = () => {
        const ref = useRef<HTMLDivElement>(null);
        const [clicked, setClicked] = useState(false);

        useOutsideClick(ref, () => setClicked(true));

        return (
          <div data-testid="container" style={{ padding: '20px' }}>
            {/* ref is never assigned to any element */}
            <div data-testid="clickable">Click me</div>
            <div data-testid="status">Clicked: {clicked ? 'Yes' : 'No'}</div>
          </div>
        );
      };

      cy.mount(<NullRefComponent />);

      // Should not throw an error when ref is null
      // Since ref.current is null, the hook should do nothing (not trigger)
      cy.get('[data-testid="clickable"]').click();
      cy.get('[data-testid="status"]').should('contain', 'Clicked: No');
      
      // The test just verifies it doesn't crash with null ref
      cy.get('[data-testid="container"]').should('be.visible');
    });

    it('should handle nested elements correctly', () => {
      const NestedComponent = () => {
        const ref = useRef<HTMLDivElement>(null);
        const [clicked, setClicked] = useState(false);

        useOutsideClick(ref, () => setClicked(true));

        return (
          <div style={{ padding: '20px' }}>
            <div ref={ref} data-testid="parent-element" style={{ padding: '20px', background: '#f0f0f0' }}>
              <div data-testid="child-element" style={{ padding: '10px', background: '#d0d0d0' }}>
                <span data-testid="nested-element">Deeply nested</span>
              </div>
            </div>
            <div data-testid="outside-area">Outside</div>
            <div data-testid="status">Clicked Outside: {clicked ? 'Yes' : 'No'}</div>
          </div>
        );
      };

      cy.mount(<NestedComponent />);

      // Click on nested elements should NOT trigger outside click
      cy.get('[data-testid="nested-element"]').click();
      cy.get('[data-testid="status"]').should('contain', 'Clicked Outside: No');

      cy.get('[data-testid="child-element"]').click();
      cy.get('[data-testid="status"]').should('contain', 'Clicked Outside: No');

      cy.get('[data-testid="parent-element"]').click();
      cy.get('[data-testid="status"]').should('contain', 'Clicked Outside: No');

      // Click outside should trigger
      cy.get('[data-testid="outside-area"]').click();
      cy.get('[data-testid="status"]').should('contain', 'Clicked Outside: Yes');
    });
  });

  describe('Responsive Behavior', () => {
    it('should work consistently across different viewport sizes', () => {
      const viewports = [
        { width: 375, height: 667, name: 'mobile' },
        { width: 768, height: 1024, name: 'tablet' },
        { width: 1280, height: 720, name: 'desktop' },
      ];

      viewports.forEach((viewport) => {
        cy.viewport(viewport.width, viewport.height);
        cy.mount(<TestComponent />);

        // Test functionality works on this viewport
        cy.get('[data-testid="outside-element"]').click();
        cy.get('[data-testid="outside-status"]').should('contain', 'Clicked Outside: Yes');

        // Reset for next test
        cy.get('[data-testid="reset-button"]').click();
        cy.get('[data-testid="outside-status"]').should('contain', 'Clicked Outside: No');
      });
    });
  });
});
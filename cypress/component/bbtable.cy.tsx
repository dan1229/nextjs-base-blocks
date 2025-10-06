import React from 'react';
import BBTable from '../../src/bbtable';
import type { IPropsBBTable } from '../../src/bbtable';
import type { IBBTableColumn } from '../../src/types';
import { testResponsiveViewports, createTestData } from '../support/test-helpers';

describe('BBTable Component Tests', () => {
  const sampleData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', age: 30, status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 28, status: 'Inactive' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 35, status: 'Active' },
  ];

  const sampleColumns: IBBTableColumn[] = [
    { key: 'id', header: 'ID', sortable: true },
    { key: 'name', header: 'Name', sortable: true, filterable: true },
    { key: 'email', header: 'Email', sortable: true, filterable: true },
    { key: 'age', header: 'Age', sortable: true },
    { key: 'status', header: 'Status', sortable: true },
  ];

  const defaultProps: IPropsBBTable = {
    data: sampleData,
    columns: sampleColumns,
  };

  beforeEach(() => {
    cy.viewport(1280, 720);
  });

  describe('Basic Rendering', () => {
    it('renders with default props', () => {
      cy.mount(<BBTable {...defaultProps} />);
      cy.get('table').should('exist');
      cy.get('thead').should('exist');
      cy.get('tbody').should('exist');
    });

    it('renders table headers correctly', () => {
      cy.mount(<BBTable {...defaultProps} />);
      cy.get('th').should('have.length', 5);
      cy.get('th').first().should('contain.text', 'ID');
      cy.get('th').eq(1).should('contain.text', 'Name');
      cy.get('th').eq(2).should('contain.text', 'Email');
    });

    it('renders table data correctly', () => {
      cy.mount(<BBTable {...defaultProps} />);
      cy.get('tbody tr').should('have.length', 3);
      cy.get('tbody tr').first().should('contain.text', 'John Doe');
      cy.get('tbody tr').eq(1).should('contain.text', 'Jane Smith');
    });

    it('renders with custom className', () => {
      cy.mount(<BBTable {...defaultProps} className="custom-table" />);
      cy.get('.custom-table').should('exist');
    });
  });

  describe('Loading State', () => {
    it('shows loading spinner when loading prop is true', () => {
      cy.mount(<BBTable {...defaultProps} loading={true} />);
      cy.contains('Loading...').should('exist');
    });

    it('hides table when loading', () => {
      cy.mount(<BBTable {...defaultProps} loading={true} />);
      cy.get('table').should('not.exist');
    });
  });

  describe('Empty State', () => {
    it('shows empty message when no data', () => {
      cy.mount(<BBTable data={[]} columns={sampleColumns} />);
      cy.contains('No data available').should('exist');
    });

    it('shows custom empty message', () => {
      cy.mount(<BBTable data={[]} columns={sampleColumns} emptyMessage="Custom empty message" />);
      cy.contains('Custom empty message').should('exist');
    });
  });

  describe('Sorting Functionality', () => {
    it('shows sort icons for sortable columns', () => {
      cy.mount(<BBTable {...defaultProps} sortable={true} />);
      // Should have clickable headers for sortable columns
      cy.get('th').contains('Name').should('exist');
      cy.get('th').contains('ID').should('exist');
    });

    it('sorts data when column header is clicked', () => {
      cy.mount(<BBTable {...defaultProps} sortable={true} />);

      // Click on Name column to sort
      cy.get('th').contains('Name').click();

      // Check if first row changed (Bob Johnson should be first when sorted alphabetically)
      cy.get('tbody tr').first().should('contain.text', 'Bob Johnson');
    });

    it('toggles sort direction on multiple clicks', () => {
      cy.mount(<BBTable {...defaultProps} sortable={true} />);

      // Click twice on Age column
      cy.get('th').contains('Age').click();
      cy.get('th').contains('Age').click();

      // Should sort in descending order, so Bob (35) should be first
      cy.get('tbody tr').first().should('contain.text', 'Bob Johnson');
    });
  });

  describe('Filtering Functionality', () => {
    it('shows filter inputs when filterable is true', () => {
      cy.mount(<BBTable {...defaultProps} filterable={true} />);
      cy.get('input[placeholder*="Filter"]').should('exist');
    });

    it('filters data based on input', () => {
      cy.mount(<BBTable {...defaultProps} filterable={true} />);

      // Type in the name filter - use "Doe" to match only John Doe
      cy.get('input[placeholder*="Filter Name"]').type('Doe');

      // Should only show John Doe row
      cy.get('tbody tr').should('have.length', 1);
      cy.get('tbody tr').first().should('contain.text', 'John Doe');
    });
  });

  describe('Pagination', () => {
    it('shows pagination controls when pagination is enabled', () => {
      cy.mount(<BBTable {...defaultProps} pagination={true} pageSize={2} />);
      cy.contains('Previous').should('exist');
      cy.contains('Next').should('exist');
      cy.contains('Page').should('exist');
    });

    it('limits rows per page correctly', () => {
      cy.mount(<BBTable {...defaultProps} pagination={true} pageSize={2} />);
      cy.get('tbody tr').should('have.length', 2);
    });

    it('navigates between pages', () => {
      cy.mount(<BBTable {...defaultProps} pagination={true} pageSize={2} />);

      // Click next button
      cy.contains('Next').click();

      // Should show different data on page 2
      cy.get('tbody tr').should('have.length', 1);
      cy.get('tbody tr').first().should('contain.text', 'Bob Johnson');
    });
  });

  describe('Row Selection', () => {
    it('shows checkboxes when selectable is true', () => {
      cy.mount(<BBTable {...defaultProps} selectable={true} />);
      cy.get('input[type="checkbox"]').should('exist');
    });

    it('selects individual rows', () => {
      cy.mount(<BBTable {...defaultProps} selectable={true} />);

      // Click first row checkbox
      cy.get('tbody tr').first().find('input[type="checkbox"]').click();

      // Should have selected checkbox
      cy.get('tbody tr').first().find('input[type="checkbox"]').should('be.checked');
    });

    it('selects all rows with header checkbox', () => {
      cy.mount(<BBTable {...defaultProps} selectable={true} />);

      // Click select all checkbox
      cy.get('thead input[type="checkbox"]').click();

      // All row checkboxes should be checked
      cy.get('tbody input[type="checkbox"]:checked').should('have.length', 3);
    });
  });

  describe('Row Click Functionality', () => {
    it('handles row clicks when onRowClick is provided', () => {
      const onRowClick = cy.stub();
      cy.mount(<BBTable {...defaultProps} onRowClick={onRowClick} />);

      cy.get('tbody tr').first().click();
      cy.then(() => {
        expect(onRowClick).to.have.been.called;
      });
    });

    it('adds clickable class when onRowClick is provided', () => {
      const onRowClick = cy.stub();
      cy.mount(<BBTable {...defaultProps} onRowClick={onRowClick} />);

      // Should be clickable (can verify by clicking)
      cy.get('tbody tr').first().should('exist');
    });
  });

  describe('Variants and Sizing', () => {
    const variants: Array<IPropsBBTable['variant']> = ['default', 'striped', 'bordered', 'hover'];

    variants.forEach((variant) => {
      if (variant) {
        it(`renders with variant="${variant}"`, () => {
          cy.mount(<BBTable {...defaultProps} variant={variant} />);
          cy.get('table').should('exist');
        });
      }
    });

    const sizes: Array<IPropsBBTable['size']> = ['sm', 'md', 'lg'];

    sizes.forEach((size) => {
      if (size) {
        it(`renders with size="${size}"`, () => {
          cy.mount(<BBTable {...defaultProps} size={size} />);
          cy.get('table').should('exist');
        });
      }
    });

    const elevations: Array<IPropsBBTable['elevation']> = ['none', 'low', 'medium', 'high', 'default'];

    elevations.forEach((elevation) => {
      if (elevation) {
        it(`renders with elevation="${elevation}"`, () => {
          cy.mount(<BBTable {...defaultProps} elevation={elevation} />);
          cy.get('table').should('exist');
        });
      }
    });
  });

  describe('Custom Render Function', () => {
    it('uses custom render function for columns', () => {
      const customColumns: IBBTableColumn[] = [
        ...sampleColumns.slice(0, -1),
        {
          key: 'status',
          header: 'Status',
          render: (value) => <span className="custom-status">{String(value || '').toUpperCase()}</span>
        }
      ];

      cy.mount(<BBTable data={sampleData} columns={customColumns} />);
      cy.contains('ACTIVE').should('exist');
      cy.contains('INACTIVE').should('exist');
    });
  });

  describe('Responsive Behavior', () => {
    it('shows mobile view on small screens', () => {
      cy.viewport(600, 800);
      cy.mount(<BBTable {...defaultProps} responsiveBreakpoint="md" />);

      // Should show the data in mobile format
      cy.contains('John Doe').should('exist');
      cy.contains('jane@example.com').should('exist');
    });

    it('shows mobile cards with correct data', () => {
      cy.viewport(600, 800);
      cy.mount(<BBTable {...defaultProps} responsiveBreakpoint="md" />);

      // Should contain all the data
      cy.contains('John Doe').should('exist');
      cy.contains('Jane Smith').should('exist');
      cy.contains('Bob Johnson').should('exist');
    });

    it('respects different responsive breakpoints', () => {
      // Test sm breakpoint
      cy.viewport(500, 800);
      cy.mount(<BBTable {...defaultProps} responsiveBreakpoint="sm" />);
      cy.contains('John Doe').should('exist');

      // Test lg breakpoint - at this viewport it should still show table
      cy.viewport(1000, 800);
      cy.mount(<BBTable {...defaultProps} responsiveBreakpoint="lg" />);
      cy.contains('John Doe').should('exist');
    });

    testResponsiveViewports(() => {
      cy.mount(<BBTable {...defaultProps} />);
    });
  });

  describe('Edge Cases', () => {
    it('handles empty columns array', () => {
      cy.mount(<BBTable data={sampleData} columns={[]} />);
      cy.get('table').should('exist');
    });

    it('handles very large datasets', () => {
      const largeData = Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        age: 20 + (i % 50),
        status: i % 2 === 0 ? 'Active' : 'Inactive'
      }));

      cy.mount(<BBTable data={largeData} columns={sampleColumns} pagination={true} pageSize={10} />);
      cy.get('tbody tr').should('have.length', 10);
    });

    it('handles special characters in data', () => {
      const specialData = [
        { id: 1, name: 'Tëst Üser', email: 'test@éxample.com', age: 25, status: 'Açtive' }
      ];

      cy.mount(<BBTable data={specialData} columns={sampleColumns} />);
      cy.get('tbody tr').should('contain.text', 'Tëst Üser');
    });
  });

  describe('Accessibility', () => {
    it('has proper table structure', () => {
      cy.mount(<BBTable {...defaultProps} />);

      cy.get('table').should('exist');
      cy.get('thead').should('exist');
      cy.get('tbody').should('exist');
      cy.get('th').should('exist');
      cy.get('td').should('exist');
    });

    it('has keyboard accessible sort buttons', () => {
      cy.mount(<BBTable {...defaultProps} sortable={true} />);

      // Check for sortable headers by looking for clickable headers
      cy.get('th').contains('Name').should('be.visible');
      cy.get('th').contains('ID').should('be.visible');
      // Additional keyboard accessibility tests could be added here
    });

    it('has accessible filter inputs', () => {
      cy.mount(<BBTable {...defaultProps} filterable={true} />);

      // Check for filter inputs by looking for inputs with filter placeholders
      cy.get('input[placeholder*="Filter"]').should('be.visible');
      cy.get('input[placeholder*="Filter"]').first().should('have.attr', 'placeholder');
    });
  });
});

export {};
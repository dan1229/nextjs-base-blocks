import classNames from 'classnames';
import React, { useState, useMemo } from 'react';
import { createClassHelper } from '../utils/scss-class-functions';
import styles from './styles.module.scss';
import type {
  IPropsBBBase,
  IBBTableColumn,
  IBBTableData,
  TBBTableVariant,
  TBBTableSize,
  TBBTableElevation,
  TBBTableSortDirection
} from '../types';

// Create class helper with standardized patterns
const classHelper = createClassHelper(styles, {
  variant: { prefix: 'variant_' },
  size: { prefix: 'size_' },
  elevation: { prefix: 'elevation_' },
});

export interface IPropsBBTable<T = IBBTableData> {
  data: T[];
  columns: IBBTableColumn<T>[];
  variant?: TBBTableVariant;
  size?: TBBTableSize;
  elevation?: TBBTableElevation;
  loading?: boolean;
  emptyMessage?: string;
  sortable?: boolean;
  filterable?: boolean;
  pagination?: boolean;
  pageSize?: number;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
  onRowClick?: (row: T, index: number) => void;
  responsiveBreakpoint?: 'sm' | 'md' | 'lg';
  stickyHeader?: boolean;
  striped?: boolean;
  bordered?: boolean;
  hover?: boolean;
}

const BBTable = <T extends IBBTableData = IBBTableData>(props: IPropsBBBase & IPropsBBTable<T>) => {
  const {
    data = [],
    columns = [],
    variant = 'default',
    size = 'md',
    elevation = 'none',
    loading = false,
    emptyMessage = 'No data available',
    sortable = true,
    filterable = false,
    pagination = false,
    pageSize = 10,
    selectable = false,
    onRowSelect,
    onRowClick,
    responsiveBreakpoint = 'md',
    stickyHeader = false,
    striped = false,
    bordered = false,
    hover = false,
    className,
    onClick,
  } = props;

  // State for sorting
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<TBBTableSortDirection>(null);

  // State for filtering
  const [filters, setFilters] = useState<Record<string, string>>({});

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);

  // State for selection
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  // Get cell value using accessor
  const getCellValue = useMemo(() => {
    return (row: T, column: IBBTableColumn<T>): unknown => {
      if (column.accessor) {
        if (typeof column.accessor === 'function') {
          return column.accessor(row);
        }
        return row[column.accessor];
      }
      return row[column.key];
    };
  }, []);

  // Apply sorting
  const sortedData = useMemo(() => {
    if (!sortColumn || !sortDirection) return data;

    const column = columns.find(col => col.key === sortColumn);
    if (!column) return data;

    return [...data].sort((a, b) => {
      const aValue = getCellValue(a, column);
      const bValue = getCellValue(b, column);

      if (aValue === bValue) return 0;
      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      const comparison = aValue < bValue ? -1 : 1;
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [data, sortColumn, sortDirection, columns, getCellValue]);

  // Apply filtering
  const filteredData = useMemo(() => {
    if (!filterable || Object.keys(filters).length === 0) return sortedData;

    return sortedData.filter(row => {
      return Object.entries(filters).every(([columnKey, filterValue]) => {
        if (!filterValue) return true;

        const column = columns.find(col => col.key === columnKey);
        if (!column) return true;

        const cellValue = getCellValue(row, column);
        const stringValue = String(cellValue || '').toLowerCase();
        return stringValue.includes(filterValue.toLowerCase());
      });
    });
  }, [sortedData, filters, filterable, columns, getCellValue]);

  // Apply pagination
  const paginatedData = useMemo(() => {
    if (!pagination) return filteredData;

    const startIndex = (currentPage - 1) * pageSize;
    return filteredData.slice(startIndex, startIndex + pageSize);
  }, [filteredData, pagination, currentPage, pageSize]);

  // Handle sorting
  const handleSort = (columnKey: string) => {
    const column = columns.find(col => col.key === columnKey);
    if (!column?.sortable && !sortable) return;

    if (sortColumn === columnKey) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortColumn(null);
        setSortDirection(null);
      } else {
        setSortDirection('asc');
      }
    } else {
      setSortColumn(columnKey);
      setSortDirection('asc');
    }
  };

  // Handle filter change
  const handleFilterChange = (columnKey: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [columnKey]: value
    }));
    setCurrentPage(1); // Reset to first page when filtering
  };

  // Handle row selection
  const handleRowSelect = (index: number) => {
    if (!selectable) return;

    const newSelectedRows = new Set(selectedRows);
    if (newSelectedRows.has(index)) {
      newSelectedRows.delete(index);
    } else {
      newSelectedRows.add(index);
    }

    setSelectedRows(newSelectedRows);

    if (onRowSelect) {
      const selectedData = Array.from(newSelectedRows).map(i => filteredData[i]);
      onRowSelect(selectedData);
    }
  };

  // Handle select all
  const handleSelectAll = () => {
    if (!selectable) return;

    if (selectedRows.size === paginatedData.length) {
      setSelectedRows(new Set());
      onRowSelect?.([]);
    } else {
      const allIndices = paginatedData.map((_, index) => index);
      const newSelectedRows = new Set(allIndices);
      setSelectedRows(newSelectedRows);
      onRowSelect?.(paginatedData);
    }
  };

  // Calculate pagination info
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const isAllSelected = selectable && selectedRows.size === paginatedData.length && paginatedData.length > 0;
  const isIndeterminate = selectable && selectedRows.size > 0 && selectedRows.size < paginatedData.length;

  // Generate table classes
  const tableClasses = classNames(
    styles.table,
    classHelper.variant(variant),
    classHelper.size(size),
    {
      [styles.loading]: loading,
      [styles.sticky_header]: stickyHeader,
    }
  );

  // Generate container classes
  const containerClasses = classNames(
    styles.table_container,
    classHelper.elevation(elevation),
    {
      [styles.striped]: striped,
      [styles.bordered]: bordered,
      [styles.hover]: hover,
      [styles[`responsive_${responsiveBreakpoint}`]]: true,
    },
    className
  );

  if (loading) {
    return (
      <div className={styles.loading_container}>
        <div className={styles.loading_spinner}>Loading...</div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className={styles.empty_container}>
        <div className={styles.empty_message}>{emptyMessage}</div>
      </div>
    );
  }

  return (
    <div
      className={containerClasses}
      onClick={onClick}
    >
      {/* Desktop Table View */}
      <div className={styles.table_wrapper}>
        <table className={tableClasses}>
          <thead className={styles.thead}>
            <tr>
              {selectable && (
                <th className={styles.select_column}>
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    ref={input => {
                      if (input) input.indeterminate = isIndeterminate;
                    }}
                    onChange={handleSelectAll}
                    className={styles.select_checkbox}
                  />
                </th>
              )}
              {columns.map(column => (
                <th
                  key={column.key}
                  className={classNames(styles.th, {
                    [styles.sortable]: (column.sortable ?? sortable),
                    [styles.sorted]: sortColumn === column.key,
                    [styles.sorted_asc]: sortColumn === column.key && sortDirection === 'asc',
                    [styles.sorted_desc]: sortColumn === column.key && sortDirection === 'desc',
                  })}
                  style={{
                    width: column.width,
                    minWidth: column.minWidth,
                    maxWidth: column.maxWidth,
                  }}
                  onClick={() => handleSort(column.key)}
                >
                  <div className={styles.th_content}>
                    <span>{column.header}</span>
                    {(column.sortable ?? sortable) && (
                      <span className={styles.sort_icon}>
                        {sortColumn === column.key ? (
                          sortDirection === 'asc' ? '↑' : '↓'
                        ) : '↕'}
                      </span>
                    )}
                  </div>
                  {filterable && column.filterable !== false && (
                    <input
                      type="text"
                      placeholder={`Filter ${column.header}`}
                      value={filters[column.key] || ''}
                      onChange={(e) => handleFilterChange(column.key, e.target.value)}
                      className={styles.filter_input}
                      onClick={(e) => e.stopPropagation()}
                    />
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            {paginatedData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={classNames(styles.tr, {
                  [styles.selected]: selectedRows.has(rowIndex),
                  [styles.clickable]: !!onRowClick,
                })}
                onClick={() => onRowClick?.(row, rowIndex)}
              >
                {selectable && (
                  <td className={styles.select_column}>
                    <input
                      type="checkbox"
                      checked={selectedRows.has(rowIndex)}
                      onChange={() => handleRowSelect(rowIndex)}
                      className={styles.select_checkbox}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </td>
                )}
                {columns.map(column => {
                  const cellValue = getCellValue(row, column);
                  const displayValue = column.render
                    ? column.render(cellValue, row, rowIndex)
                    : String(cellValue ?? '');

                  return (
                    <td key={column.key} className={styles.td}>
                      {displayValue}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className={styles.mobile_view}>
        {paginatedData.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={classNames(styles.mobile_card, {
              [styles.selected]: selectedRows.has(rowIndex),
              [styles.clickable]: !!onRowClick,
            })}
            onClick={() => onRowClick?.(row, rowIndex)}
          >
            {selectable && (
              <div className={styles.mobile_select}>
                <input
                  type="checkbox"
                  checked={selectedRows.has(rowIndex)}
                  onChange={() => handleRowSelect(rowIndex)}
                  className={styles.select_checkbox}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}
            {columns.map(column => {
              const cellValue = getCellValue(row, column);
              const displayValue = column.render
                ? column.render(cellValue, row, rowIndex)
                : String(cellValue ?? '');

              return (
                <div key={column.key} className={styles.mobile_field}>
                  <div className={styles.mobile_label}>{column.header}:</div>
                  <div className={styles.mobile_value}>{displayValue}</div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Pagination */}
      {pagination && totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            className={styles.pagination_button}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          >
            Previous
          </button>
          <span className={styles.pagination_info}>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className={styles.pagination_button}
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default BBTable;
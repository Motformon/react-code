import React, {useState, useEffect} from 'react';
import ErrorBoundary from "../../ErrorBoundary";
import {
  useReactTable,
  getCoreRowModel,
  SortingState,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnFiltersState,
  getFacetedUniqueValues,
  getFacetedRowModel,
  ColumnOrderState,
  ExpandedState,
  getExpandedRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableContainer,
} from '@mui/material';
import styles from "../style.module.scss";
import TableHeadRows from "../TableComponents/TableHeadRows";
import TableBodyRows from "../TableComponents/TableBodyRows";
import ToolbarTable from "../TableComponents/ToolbarTable";
import ColumnVisibilityDialog from "../TableComponents/ColumnVisibilityDialog";
import TableFooterRows from "../TableComponents/TableFooterRows";
import {setItemLS} from "../../../utils/localStorage";
import {
  defaultColumn,
  defaultFilter,
  defaultGlobalFilter,
  getColumnOrder,
  getColumnSizing, getColumnVisibility, PropsExpandTable
} from "../utils";
import TableBodyLoading from "../TableComponents/TableBodyLoading";
import ExpandColumn from "../TableComponents/ExpandColumn";

const ExpandTable: React.FC<PropsExpandTable> = (props) => {

  const {
    data,
    columns,
    classNameContainer,
    className,
    noDataText,
    toolbarContent,
    searchPlaceholder,
    setSearchValue,
    searchValue,
    pathColumnVisibility,
    pathColumnOrder,
    pathColumnResize,
    isAllRowsExpanded = true,
    isExpandColumn = true,
    onClickRow,
    rowActive,
    updateTable,
    columnsDate,
    initialGlobalFilter,
    isLoading,
    setFilters,
    setSortValue,
    link,
    isWithSubRowsClick,
    renderSubComponent
  } = props;

  const [columnVisibilityDialog, setColumnVisibilityDialog] = useState<boolean>(false);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>(initialGlobalFilter || '')

  const initColumnVisibility = getColumnVisibility(pathColumnVisibility);
  const initColumnOrder = getColumnOrder(pathColumnOrder);
  const initColumnSizing = getColumnSizing(pathColumnResize);

  const [columnVisibility, setColumnVisibility] = useState(initColumnVisibility);
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>(initColumnOrder);

  const [expanded, setExpanded] = React.useState<ExpandedState>({});

  const table = useReactTable({
    data,
    columns: [...(isExpandColumn ? [ExpandColumn]: []), ...columns],
    filterFns: {
      default: defaultFilter,
    },
    defaultColumn,
    enableColumnResizing: true,
    columnResizeMode: 'onEnd',
    autoResetExpanded: false,
    enableGlobalFilter: !setSearchValue,
    initialState: {
      columnSizing: initColumnSizing
    },
    state: {
      columnFilters,
      globalFilter,
      sorting,
      columnVisibility,
      columnOrder,
      expanded
    },

    globalFilterFn: (row, columnId, value) => defaultGlobalFilter(row, columnId, value, true, data),
    getSubRows: row => row.subRows,
    onExpandedChange: setExpanded,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const tableState = table.getState();
  const columnSizing = tableState?.columnSizing;

  useEffect(() => {
    if (pathColumnResize) {
      setItemLS(pathColumnResize, JSON.stringify(columnSizing));
    }
  }, [pathColumnResize, columnSizing]);


  //Expanded all rows
  const toggleAllRowsExpanded = table.toggleAllRowsExpanded;
  const getIsAllRowsExpanded = table.getIsAllRowsExpanded();
  useEffect(() => {
    if (toggleAllRowsExpanded && isAllRowsExpanded && !getIsAllRowsExpanded) {
      toggleAllRowsExpanded();
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggleAllRowsExpanded, isAllRowsExpanded]);

  const tableContainerRef = React.useRef<HTMLDivElement>(null)

  //Rows вызывает ошибку - Warning: Can't perform a React state update on a component that hasn't mounted yet.
  const rows = table.getRowModel().rows;

  const classes = [
    styles.ReactTable,
    className,
  ];

  const headerGroups = table.getHeaderGroups();
  const footerGroups = table.getFooterGroups();
  const visibleLeafColumns = table.getVisibleLeafColumns();

  return (
    <ErrorBoundary componentName={'ExpandTable'}>
      <React.Fragment>
        <ToolbarTable
          className={styles.Toolbar}
          globalFilter={globalFilter}
          setColumnVisibilityDialog={setColumnVisibilityDialog}
          setGlobalFilter={setGlobalFilter}
          visibleRowsCount={rows.length || 0}
          toolbarContent={toolbarContent}
          searchPlaceholder={searchPlaceholder}
          setSearchValue={setSearchValue}
          searchValue={searchValue}
          updateTable={updateTable}
        />
        <TableContainer
          className={[styles.TableContainer, classNameContainer].join(' ')}
          ref={tableContainerRef}
        >
          <Table
            className={classes.join(' ')}
            size="small"
            stickyHeader={true}
          >
            <TableHeadRows
              headerGroups={headerGroups}
              tableState={tableState}
              columnsDate={columnsDate}
              setFilters={setFilters}
              setSortValue={setSortValue}
            />
            {isLoading ? (
              <TableBodyLoading colSpan={visibleLeafColumns?.length}/>
            ) : (
              <>
                <TableBodyRows
                  rows={rows}
                  noDataText={noDataText}
                  onClickRow={onClickRow}
                  rowActive={rowActive}
                  columnsSize={visibleLeafColumns?.length}
                  isExpanded={true}
                  link={link}
                  isWithSubRowsClick={isWithSubRowsClick}
                  renderSubComponent={renderSubComponent}
                />
                <TableFooterRows footerGroups={footerGroups}/>
              </>
            )}

          </Table>
        </TableContainer>
        <ColumnVisibilityDialog
          columnVisibilityDialog={columnVisibilityDialog}
          setColumnVisibilityDialog={setColumnVisibilityDialog}
          setColumnOrder={setColumnOrder}
          table={table}
          pathColumnVisibility={pathColumnVisibility}
          pathColumnOrder={pathColumnOrder}
        />
      </React.Fragment>
    </ErrorBoundary>
  );
};

export default ExpandTable;

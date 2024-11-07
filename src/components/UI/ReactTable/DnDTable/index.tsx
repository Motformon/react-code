import React, {useState, useEffect} from 'react';
import ErrorBoundary from "../../../ErrorBoundary";
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
} from "@tanstack/react-table";
import {
  Table,
  TableContainer,
} from '@mui/material';
import styles from "../style.module.scss";
import TableHeadRows from "../TableComponents/TableHeadRows";
import TableBodyRows from "./TableBodyRows";
import ToolbarTable from "../TableComponents/ToolbarTable";
import ColumnVisibilityDialog from "../TableComponents/ColumnVisibilityDialog";
import TableFooterRows from "../TableComponents/TableFooterRows";
import {setItemLS} from "../../../../utils/localStorage";
import {
  defaultColumn,
  defaultFilter,
  defaultGlobalFilter,
  getColumnOrder, getColumnSizing,
  getColumnVisibility,
  PropsDnDTable
} from "../utils";
import {DragDropContext} from 'react-beautiful-dnd';
import TableBodyLoading from "../TableComponents/TableBodyLoading";

const DnDTable: React.FC<PropsDnDTable> = (props) => {

  const {
    data,
    columns,
    classNameContainer,
    className,
    noDataText,
    toolbarContent,
    pathColumnVisibility,
    pathColumnOrder,
    pathColumnResize,
    onClickRow,
    rowActive,
    updateTable,
    columnsDate,
    isLoading,
    onDragEnd
  } = props;

  const [columnVisibilityDialog, setColumnVisibilityDialog] = useState<boolean>(false);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>('')

  const initColumnVisibility = getColumnVisibility(pathColumnVisibility);
  const initColumnOrder = getColumnOrder(pathColumnOrder);
  const initColumnSizing = getColumnSizing(pathColumnResize);

  const [columnVisibility, setColumnVisibility] = useState(initColumnVisibility);
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>(initColumnOrder);

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      default: defaultFilter,
    },
    defaultColumn,
    enableColumnResizing: true,
    columnResizeMode: 'onEnd',
    enableGlobalFilter: true,
    initialState: {
      columnSizing: initColumnSizing
    },
    state: {
      columnFilters,
      globalFilter,
      sorting,
      columnVisibility,
      columnOrder,
    },

    globalFilterFn: (row, columnId, value) => defaultGlobalFilter(row, columnId, value),
    getSubRows: row => row.subRows,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
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

  const rows = table.getRowModel().rows;

  const classes = [
    styles.ReactTable,
    className,
  ];

  const headerGroups = table.getHeaderGroups();
  const footerGroups = table.getFooterGroups();
  const visibleLeafColumns = table.getVisibleLeafColumns();

  return (
    <ErrorBoundary componentName={'DnDTable'}>
      <React.Fragment>
        <ToolbarTable
          className={styles.Toolbar}
          globalFilter={globalFilter}
          setColumnVisibilityDialog={setColumnVisibilityDialog}
          setGlobalFilter={setGlobalFilter}
          visibleRowsCount={rows.length || 0}
          toolbarContent={toolbarContent}
          searchPlaceholder={undefined}
          setSearchValue={undefined}
          searchValue={undefined}
          updateTable={updateTable}
        />
        <DragDropContext onDragEnd={onDragEnd}>
          <TableContainer className={[styles.TableContainer, classNameContainer].join(' ')}>
            <Table
              className={classes.join(' ')}
              size="small"
              stickyHeader={true}
            >
              <TableHeadRows
                headerGroups={headerGroups}
                tableState={tableState}
                columnsDate={columnsDate}
                setFilters={undefined}
                setSortValue={undefined}
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
                  />
                  <TableFooterRows footerGroups={footerGroups}/>
                </>
              )}
            </Table>
          </TableContainer>
        </DragDropContext>
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

export default DnDTable;

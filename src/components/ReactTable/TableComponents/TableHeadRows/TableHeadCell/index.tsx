import React from 'react';
import ErrorBoundary from "../../../../ErrorBoundary";
import styles from "./style.module.scss";
import {flexRender, Header, TableState} from "@tanstack/react-table";
import {TableCell, TableSortLabel} from "@mui/material";
import ColumnFilter from "./ColumnFilter";
import {ReactColumn} from "../../../utils";
import {isString} from "lodash";

type Props = {
  
  header: Header<any, any>;
  tableState: TableState;
  columnsDate: undefined | string[];
  
  setFilters: undefined | ((filterValues: any[] | undefined, nameColumn?: string) => void);
  setSortValue: undefined | ((nameColumn: string, sorting?: 'asc' | 'desc') => void);
};

const TableHeadCell: React.FC<Props> = (props) => {

  const {
    header,
    tableState,
    columnsDate,
    setFilters,
    setSortValue
  } = props;

  const column = header?.column;

  const canSort = column?.getCanSort();
  const canResize = column?.getCanResize();
  const canFilter = column?.getCanFilter();

  const columnDef: ReactColumn = column?.columnDef;
  const setSortColumn = columnDef?.setSortColumn;
  const sortType = columnDef?.sortType;

  return (
    <ErrorBoundary componentName={'TableHeadCell'}>
      <TableCell
        className={[styles.TableHeadCell, columnDef?.classNameHeadColumnCell || ''].join(' ')}
        colSpan={header.colSpan}
        title={isString(columnDef?.header) ? String(columnDef?.header) : ''}
        style={{
          width: header.getSize(),
        }}
      >
        <div className={styles.head}>
          {canFilter ? (
            <ColumnFilter
              column={column}
              columnsDate={columnsDate}
              setFilters={setFilters}
            />
          ) : null}
          {header.isPlaceholder
            ? null
            : !canSort ? flexRender(
              header.column.columnDef.header,
              header.getContext()
            ) : !setSortColumn && !setSortValue ? (
              <TableSortLabel
                className={styles.sort}
                active={!!header.column.getIsSorted()}
                onClick={header.column.getToggleSortingHandler()}
                direction={header.column.getIsSorted() || undefined}
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </TableSortLabel>
            ) : (
              <TableSortLabel
                className={styles.sort}
                active={sortType === 'asc' || sortType === 'desc'}
                direction={sortType === 'asc' ? 'asc' : sortType === 'desc' ? 'desc' : undefined}
                onClick={() => {
                  if (setSortColumn) {
                    setSortColumn(sortType);
                  }
                  if(setSortValue) {
                    setSortValue(column?.id, sortType);
                  }
                }}
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </TableSortLabel>
            )}
        </div>

        {canResize ? (
          <div
            {...{
              onMouseDown: header.getResizeHandler(),
              onTouchStart: header.getResizeHandler(),
              className: [styles.resizer, header.column.getIsResizing() ? styles.isResizing : ''].join(' '),
              style: {
                transform: header.column.getIsResizing()
                  ? `translateX(${
                    tableState.columnSizingInfo.deltaOffset
                  }px)`
                  : '',
              },
            }}
          />
        ) : null}
      </TableCell>
    </ErrorBoundary>
  );
};

export default TableHeadCell;

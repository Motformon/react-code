import React from 'react';
import ErrorBoundary from "../../../../../../ErrorBoundary";
import styles from "./style.module.scss";
import {Cell, flexRender, Row} from "@tanstack/react-table";
import {IconButton, TableCell} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {ReactColumn} from "../../../../utils";

type Props = {
  cell: Cell<any, any>;
  row: Row<any>;
  visibleCellsCount: number;
  isExpanded: boolean | undefined;
};

const TableBodyCell: React.FC<Props> = (props) => {

  const {
    cell,
    row,
    visibleCellsCount,
    isExpanded
  } = props;

  const classes = [
    styles.TableBodyCell,
    'tableBodyCell'
  ];

  if(!isExpanded && !cell.getIsGrouped() && row.subRows.length) return null;

  const columnDef: ReactColumn = cell?.column?.columnDef;

  return (
    <ErrorBoundary componentName={'TableBodyCell'}>
      <TableCell
        className={classes.join(' ')}
        style={{
          width: cell.column.getSize(),
        }}
        title={cell?.getValue() ? String(cell?.getValue()) : undefined}
        colSpan={cell.getIsGrouped() ? visibleCellsCount : undefined}
      >
        <div
          style={{
            marginLeft: `${(row.depth * 3)}px`,
          }}
          className={[
            styles.cell,
            cell.getIsGrouped() ? styles.cellGroup : '', 'bodyCell',
            columnDef?.classNameBodyColumnCell || ''
          ].join(' ')}
        >
          {cell.getIsGrouped() ? (
            // If it's a grouped cell, add an expander and row count
            <>
              <IconButton
                onClick={(event) => {
                  event.stopPropagation();
                  event.preventDefault();
                  row.getToggleExpandedHandler()();
                }}
                size={'small'}
                className={styles.expandGroupButton}
              >
                {row.getIsExpanded()  ? <ExpandMoreIcon/> : <ChevronRightIcon/>}
              </IconButton>
              {flexRender(
                cell.column.columnDef.cell,
                cell.getContext()
              )}{' '}
              ({row.subRows.length})
            </>
          ) : cell.getIsPlaceholder() ? null : ( // For cells with repeated values, render null
            // Otherwise, just render the regular cell
            flexRender(
              cell.column.columnDef.cell,
              cell.getContext()
            )
          )}
        </div>
      </TableCell>
    </ErrorBoundary>
  );
};

export default TableBodyCell;

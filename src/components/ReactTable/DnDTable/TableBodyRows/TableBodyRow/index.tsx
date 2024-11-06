import React from 'react';
import ErrorBoundary from "../../../../ErrorBoundary";
import styles from "./style.module.scss";
import {Row} from "@tanstack/react-table";
import {TableRow} from "@mui/material";
import TableBodyCell from "./TableBodyCell";
import {DraggableProvided, DraggableStateSnapshot} from "react-beautiful-dnd";

type Props = {
  row: Row<any>;
  onClickRow: undefined | ((row: Row<any>, event?: any) => void);
  rowActive?: number | undefined;
  provided: DraggableProvided,
  snapshot: DraggableStateSnapshot,
};

const TableBodyRow: React.FC<Props> = (props) => {

  const {
    row,
    onClickRow,
    rowActive,
    provided,
    snapshot,
  } = props;

  const classes = [
    styles.TableBodyRow,
    rowActive === row?.index ? styles.rowActive : '',
    row.depth > 0 ? styles.subRow : '',
    onClickRow ? styles.rowClick : '',
    'bodyRow'
  ];

  const visibleCells = row.getVisibleCells();

  return (
    <ErrorBoundary componentName={'TableBodyRow'}>
      <TableRow
        className={classes.join(' ')}
        component={'tr'}
        onClick={(event: any) => {
          if(onClickRow) {
            onClickRow(row, event);
          }
        }}
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={{
          backgroundColor: snapshot.isDragging ? '#e8f5e9' : 'transparent',
          ...provided.draggableProps.style
        }}
      >
        {visibleCells.map((cell) => (
          <TableBodyCell
            key={`cell-${cell.id}`}
            cell={cell}
            row={row}
            visibleCellsCount={visibleCells.length}
          />
        ))}
      </TableRow>
    </ErrorBoundary>
  );
};

export default TableBodyRow;

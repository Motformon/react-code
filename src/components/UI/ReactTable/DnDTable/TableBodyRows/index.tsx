import React from 'react';
import ErrorBoundary from "../../../../ErrorBoundary";
import styles from "./style.module.scss";
import {Row} from "@tanstack/react-table";
import {TableBody, TableCell, TableRow} from "@mui/material";
import TableBodyRow from "./TableBodyRow";
import {Draggable, Droppable} from "react-beautiful-dnd";

type Props = {
  rows: Row<any>[];
  noDataText: string | undefined;
  onClickRow: undefined | ((row: Row<any>, event?: any) => void);
  columnsSize: number;
  rowActive: number | undefined;
};


const TableBodyRows: React.FC<Props> = (props) => {

  const {
    rows,
    noDataText,
    onClickRow,
    columnsSize,
    rowActive,
  } = props;

  const classes = [
    styles.TableBodyRows,
  ];

  return (
    <ErrorBoundary componentName={'TableBodyRows'}>
      <Droppable droppableId="table">
        {(provided) => (
          <TableBody
            className={classes.join(' ')}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {rows.length > 0 ? rows.map((row, index) => {
              return row ? (
                <Draggable
                  draggableId={`row-${row.id}`}
                  index={index}
                  key={`row-${row.id}`}
                >
                  {(provided, snapshot) => (
                    <TableBodyRow
                      row={row}
                      onClickRow={onClickRow}
                      rowActive={rowActive}
                      provided={provided}
                      snapshot={snapshot}
                    />
                  )}
                </Draggable>
              ) : null
            }) : (
              <TableRow
                className={styles.noDataRow}
              >
                <TableCell colSpan={columnsSize}>
                  {noDataText || 'Данных нет'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        )}
      </Droppable>
    </ErrorBoundary>
  );
};

export default TableBodyRows;

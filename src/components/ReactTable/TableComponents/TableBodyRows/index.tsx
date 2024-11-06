import React from 'react';
import ErrorBoundary from "../../../ErrorBoundary";
import styles from "./style.module.scss";
import {Row} from "@tanstack/react-table";
import {TableBody, TableCell, TableRow} from "@mui/material";
import TableBodyRow from "./TableBodyRow";

type Props = {
  rows: Row<any>[];
  noDataText: string | undefined;
  onClickRow: undefined | ((row: Row<any>, event?: any) => void);
  columnsSize: number;
  rowActive: number | undefined;
  isExpanded: boolean | undefined;
  isWithSubRowsClick: boolean | undefined;
  link: undefined | ((row: Row<any>) => {
    path: string,
    name: string,
    extraPath?: string,
  });
  renderSubComponent: undefined | ((props: { row: Row<any> }) => React.ReactElement);
};

const TableBodyRows: React.FC<Props> = (props) => {

  const {
    rows,
    noDataText,
    onClickRow,
    columnsSize,
    isExpanded,
    rowActive,
    link,
    isWithSubRowsClick,
    renderSubComponent
  } = props;

  const classes = [
    styles.TableBodyRows,
  ];


  return (
    <ErrorBoundary componentName={'TableBodyRows'}>
      <TableBody
        className={classes.join(' ')}
      >
        {rows.length > 0 ? rows.map((row) => {
          return row ? (
            <TableBodyRow
              key={`row-${row.id}`}
              row={row}
              onClickRow={onClickRow}
              rowActive={rowActive}
              isExpanded={isExpanded}
              link={link}
              isWithSubRowsClick={isWithSubRowsClick}
              renderSubComponent={renderSubComponent}
            />
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
    </ErrorBoundary>
  );
};

export default TableBodyRows;

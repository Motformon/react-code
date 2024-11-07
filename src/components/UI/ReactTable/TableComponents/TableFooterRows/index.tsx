import React from 'react';
import ErrorBoundary from "../../../../ErrorBoundary";
import {TableFooter, TableRow} from "@mui/material";
import {HeaderGroup} from "@tanstack/react-table";
import styles from "./style.module.scss";
import TableFooterCell from "./TableFooterCell";

type Props = {
  footerGroups: HeaderGroup<any>[];
};

const TableFooterRows: React.FC<Props> = (props) => {

  const {
    footerGroups
  } = props;

  const classes = [
    styles.TableFooterRows,
  ];

  return (
    <ErrorBoundary componentName={'TableFooterRows'}>
      <TableFooter
        className={classes.join(' ')}
      >
        {footerGroups.map(footerGroup => (
          <TableRow
            key={`footerGroup-${footerGroup.id}`}
            className={styles.footerRow}
          >
            {footerGroup.headers.map(footer => (
              <TableFooterCell
                key={`footer-${footer.id}`}
                footer={footer}
              />
            ))}
          </TableRow>
        ))}
      </TableFooter>
    </ErrorBoundary>
  );
};

export default TableFooterRows;

import React from 'react';
import ErrorBoundary from "../../../../../ErrorBoundary";
import styles from "./style.module.scss";
import {flexRender, Header} from "@tanstack/react-table";
import {TableCell} from "@mui/material";

type Props = {
  footer: Header<any, any>;
};

const TableFooterCell: React.FC<Props> = (props) => {

  const {
    footer,
  } = props;

  return (
    <ErrorBoundary componentName={'TableFooterCell'}>
      <TableCell className={styles.TableFooterCell}>
        {footer.isPlaceholder
          ? null
          : flexRender(
            footer.column.columnDef.footer,
            footer.getContext()
          )
        }
      </TableCell>
    </ErrorBoundary>
  );
};

export default TableFooterCell;

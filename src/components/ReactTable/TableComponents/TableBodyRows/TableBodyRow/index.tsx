import React, {useState} from 'react';
import ErrorBoundary from "../../../../ErrorBoundary";
import styles from "./style.module.scss";
import {Row} from "@tanstack/react-table";
import {TableRow} from "@mui/material";
import TableBodyCell from "./TableBodyCell";
import {get} from "lodash";
import Link from "next/link";

type Props = {
  row: Row<any>;
  onClickRow: undefined | ((row: Row<any>, event?: any) => void);
  isExpanded?: boolean | undefined;
  isWithSubRowsClick: boolean | undefined;
  rowActive?: number | undefined;
  link: undefined | ((row: Row<any>) => {
    path: string,
    name: string,
    extraPath?: string,
  });
  renderSubComponent: undefined | ((props: { row: Row<any> }) => React.ReactElement);
};

const TableBodyRow: React.FC<Props> = (props) => {

  const {
    row,
    onClickRow,
    isExpanded,
    rowActive,
    link,
    isWithSubRowsClick,
    renderSubComponent
  } = props;

  const [openSubComponent, setOpenSubComponent] = useState<boolean>(false);

  const classes = [
    styles.TableBodyRow,
    rowActive === row?.index ? styles.rowActive : '',
    row.subRows.length && !isWithSubRowsClick ? styles.noRowHover : '',
    row.depth > 0 ? styles.subRow : '',
    onClickRow || link || renderSubComponent ? styles.rowClick : '',
    'bodyRow'
  ];

  const visibleCells = row.getVisibleCells();

  const useLink = link ? link(row) : undefined;

  const linkData = get(row, `original.${useLink?.name}`);

  return (
    <ErrorBoundary componentName={'TableBodyRow'}>
      <TableRow
        className={classes.join(' ')}
        component={!!useLink ? Link : 'tr'}
        href={useLink ? `/${useLink?.path}/${linkData}${useLink?.extraPath || ''}` : undefined}
        onClick={(event: any) => {
          if(onClickRow && (!row.subRows.length || isWithSubRowsClick)) {
            onClickRow(row, event);
          }
          if(renderSubComponent) {
            setOpenSubComponent(!openSubComponent);
          }
        }}
      >
        {visibleCells.map((cell) => (
          <TableBodyCell
            key={`cell-${cell.id}`}
            cell={cell}
            row={row}
            visibleCellsCount={visibleCells.length}
            isExpanded={isExpanded}
          />
        ))}
      </TableRow>
      {openSubComponent && renderSubComponent ? (
        <tr>
          {/* 2nd row is a custom 1 cell row */}
          <td colSpan={row.getVisibleCells().length}>
            {renderSubComponent({row})}
          </td>
        </tr>
      ) : null}
    </ErrorBoundary>
  );
};

export default TableBodyRow;

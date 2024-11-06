import React from 'react';
import ErrorBoundary from "../../../ErrorBoundary";
import {TableHead, TableRow} from "@mui/material";
import {HeaderGroup, TableState} from "@tanstack/react-table";
import styles from "./style.module.scss";
import TableHeadCell from "./TableHeadCell";

type Props = {
  
  headerGroups: HeaderGroup<any>[];
  tableState: TableState;
  columnsDate: undefined | string[]
  
  setFilters: undefined | ((filterValues: any[] | undefined, nameColumn?: string) => void);
  setSortValue: undefined | ((nameColumn: string, sorting?: 'asc' | 'desc') => void);
};

const TableHeadRows: React.FC<Props> = (props) => {

  const {
    tableState,
    headerGroups,
    columnsDate,
    setFilters,
    setSortValue
  } = props;


  const classes = [
    styles.TableHeadRows
  ];

  return (
    <ErrorBoundary componentName={'TableHeadRows'}>
      <TableHead
        className={classes.join(' ')}
      >
        {headerGroups.map(headerGroup => (
          <TableRow
            key={`headerGroup-${headerGroup.id}`}
          >
            {headerGroup.headers.map(header => (
              <TableHeadCell
                key={`header-${header.id}`}
                header={header}
                tableState={tableState}
                columnsDate={columnsDate}
                setFilters={setFilters}
                setSortValue={setSortValue}
              />
            ))}
          </TableRow>
        ))}
      </TableHead>
    </ErrorBoundary>
  );
};

export default TableHeadRows;

import React from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {IconButton} from "@mui/material";
import {ColumnDef, Row, Table} from "@tanstack/react-table";

const ExpandColumn: ColumnDef<any, string> = {
  accessorKey: 'expanded',
  header: ({table}: {table: Table<any>}) => {
    return (
      <div onClick={(event) => {
        event.stopPropagation();
        event.preventDefault();
      }}>
        <IconButton
          onClick={table.getToggleAllRowsExpandedHandler()}
          size={'small'}
          style={{
            padding: '3px'
          }}
        >
          {table.getIsAllRowsExpanded() ? <ExpandMoreIcon/> : <ChevronRightIcon/>}
        </IconButton>
      </div>
    )
  },
  cell: ({ row }: {row: Row<any>}) => {
    return row.getCanExpand() ? (
      <div onClick={(event) => {
        event.stopPropagation();
        event.preventDefault();
      }}>
        <IconButton
          onClick={row.getToggleExpandedHandler()}
          style={{
            marginLeft: `${(row.depth)}rem`,
            padding: 0
          }}
          size={'small'}
        >
           {row.getIsExpanded()  ? <ExpandMoreIcon/> : <ChevronRightIcon/>}
        </IconButton>
        {row?.subRows?.length ? (
          <span title={'Кол-во в списке'}>{row.subRows.length}</span>
        ) : null}
      </div>
    ) : null
  },
  size: 70,
  enableSorting: false,
  enableColumnFilter: false,
};

export default ExpandColumn;

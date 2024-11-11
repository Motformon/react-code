"use client"

import styles from "./page.module.scss";
import {Paper} from "@mui/material";
import HighlightCell from "@/components/UI/ReactTable/Cells/HighlightCell";
import {ReactColumn} from "@/components/UI/ReactTable/utils";
import ExpandTable from "@/components/UI/ReactTable/ExpandTable";

const json = [
  {
    id: 1,
    name: "Root",
    subRows: [{ id: 2, name: "Child 1", subRows: [{ id: 5, name: "Child 3", subRows: [] }, { id: 8, name: "Child 6", subRows: [] }] }]
  },
  {
    id: 3,
    name: "Another Root",
    subRows: [{ id: 4, name: "Child 2", subRows: [{ id: 6, name: "Child 4", subRows: [] }, { id: 7, name: "Child 5", subRows: [] }] }]
  }
];

export default function Page() {

  const columnsTable: ReactColumn[] = [
    {accessorKey: 'name', header: 'Name', cell: (cell) => <HighlightCell cell={cell}/>},
  ];

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Example React-Table</h1>
      <Paper variant={'outlined'} className={styles.paper}>
        <ExpandTable
          columns={columnsTable}
          data={json}
        />
      </Paper>
    </div>
  );
}

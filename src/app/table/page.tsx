"use client"

import styles from "./page.module.scss";
import {Paper} from "@mui/material";
import HighlightCell from "@/components/UI/ReactTable/Cells/HighlightCell";
import {ReactColumn} from "@/components/UI/ReactTable/utils";
import DnDTable from "@/components/UI/ReactTable/DnDTable";

export default function Page() {


  const columnsTable: ReactColumn[] = [
    {accessorKey: 'name', header: 'Имя', cell: (cell) => <HighlightCell cell={cell}/>},
  ];

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Example React-Table</h1>
      <Paper variant={'outlined'} className={styles.paper}>
        <DnDTable
          onDragEnd={(result) => {
            // // dropped outside the list
            // if (
            //   !result.destination ||
            //   result.destination.index === result.source.index
            // ) {
            //   return;
            // }
            // // no movement
            // if (result.destination.index === result.source.index) {
            //   return;
            // }
            // const sourceRow = tableData?.find((row, index) => String(index) === String(result?.source?.index));
            // const destinationRow = tableData?.find((row, index) => String(index) === String(result?.destination?.index));
            // const sourceBlock = patternBlocks?.find((item) => String(item.id) === String(sourceRow?.id));
            //
            // checkExpress(user?.oePersonId, () => {
            //   if (sourceRow && destinationRow && sourceBlock) {
            //     mutateReportBlockPattern.mutate({
            //       id: sourceBlock?.id,
            //       pattern: sourceBlock?.id_pattern,
            //       sort: Number(sourceBlock?.sort) < Number(destinationRow?.sort) ? Number(destinationRow?.sort) + 1 : Number(destinationRow?.sort) - 1,
            //       block: sourceBlock?.id_block,
            //       required: !!sourceBlock?.required,
            //       enabled: !!sourceBlock?.enabled,
            //     });
            //   }
            // });
          }}
          columns={columnsTable}
          data={[]}
        />
      </Paper>
    </div>
  );
}

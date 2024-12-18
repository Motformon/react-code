import React, {useState} from 'react';
import styles from './style.module.scss';
import {IconButton} from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';
import Dialog from "../../../../../Dialog";
import FilterForm from "./FilterForm";
import {Column} from "@tanstack/react-table";
import {ReactColumn} from "../../../../utils";
import {isString} from "lodash";

type Props = {
  
  column: Column<any, any>;
  columnsDate: undefined | string[];
  
  setFilters: undefined | ((filterValues: any[] | undefined, nameColumn?: string) => void);
};

const ColumnFilter: React.FC<Props> = ({column, columnsDate, setFilters}) => {
  const [open, setOpen] = useState<boolean>(false);
  const columnDef: ReactColumn = column?.columnDef;
  const filterValues = columnDef?.filterValues;
  
  const columnFilterValue: any = column.getFilterValue();

  return (
    <>
      <IconButton
        className={styles.FilterBtn}
        onClick={(event) => {
          event.stopPropagation();
          setOpen(true);
        }}
        aria-label="Фильтр столбцов"
        size={'small'}
      >
        <FilterListIcon fontSize={'small'} color={(columnFilterValue && columnFilterValue?.length) || (filterValues && filterValues?.length) ? 'secondary' : undefined}/>
      </IconButton>
      <Dialog
        open={open}
        setOpen={setOpen}
        title={`Фильтр ${isString(column?.columnDef?.header) ? `- ${column?.columnDef?.header}` : ''}`}
        disableBackdropClick={true}
      >
        <FilterForm
          column={column}
          setOpen={setOpen}
          columnsDate={columnsDate}
          setFilters={setFilters}
        />
      </Dialog>
    </>
  );
};

export default ColumnFilter;

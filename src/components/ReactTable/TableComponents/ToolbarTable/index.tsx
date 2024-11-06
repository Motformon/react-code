import React from 'react';
import styles from './style.module.scss';
import {Toolbar, IconButton} from "@mui/material";
import LayersIcon from '@mui/icons-material/Layers';
import Search from "../../../Search";
import CachedIcon from "@mui/icons-material/Cached";
import Typography from "@mui/material/Typography";

type Props = {
  globalFilter?: string;
  setGlobalFilter?: (filterValue: string) => void;
  className?: string;
  toolbarContent: undefined | ((visibleRowsCount: number) => React.ReactNode);
  setColumnVisibilityDialog: (value: boolean) => void;
  visibleRowsCount: number;
  setSearchValue: ((value: string) => void) | undefined;
  searchValue: string | undefined;
  searchPlaceholder: string | undefined;
  updateTable: undefined | (() => void);
};

const ToolbarTable: React.FC<Props> = (props) => {

  const {
    className,
    searchPlaceholder,
    setColumnVisibilityDialog,
    setGlobalFilter,
    globalFilter,
    visibleRowsCount,
    toolbarContent,
    updateTable,
    setSearchValue,
    searchValue
  } = props;

  const classes = [
    styles.ToolbarTable,
    className,
  ];

  return (
    <Toolbar className={classes.join(' ')}>
      {toolbarContent ? toolbarContent(visibleRowsCount) : (
        <Typography variant='subtitle1' display='block' className={styles.visibleRowsCount}>
          Кол-во строк: {visibleRowsCount}
        </Typography>
      )}
      {updateTable ? (
        <IconButton
          className={styles.updateBtn}
          onClick={updateTable}
          aria-label="Обновить таблицу"
          title={"Обновить таблицу"}
        >
          <CachedIcon/>
        </IconButton>
      ) : null}
      <IconButton
        className={styles.chooserBtn}
        onClick={() => setColumnVisibilityDialog(true)}
        aria-label="Выбор столбцов"
        title={"Выбор столбцов"}
      >
        <LayersIcon/>
      </IconButton>
      {setSearchValue ? (
        <Search
          className={[styles.search, 'search-table'].join(' ')}
          value={searchValue || ''}
          setValue={setSearchValue}
          placeholder={searchPlaceholder}
          isSmall={true}
          isOutlined={true}
          isSubmitOnChange={false}
        />
      ) : (
        <Search
          className={'search-table'}
          value={globalFilter || ''}
          setValue={value => {
            if(setGlobalFilter) {
              setGlobalFilter(value || '');
            }
          }}
          placeholder={searchPlaceholder}
          isSmall={true}
          isOutlined={true}
          isSubmitOnChange={true}
        />
      )}
    </Toolbar>
  );
};

export default ToolbarTable;
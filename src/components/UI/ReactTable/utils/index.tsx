import {ColumnDef, ColumnOrderState, ColumnSizingState, Row} from "@tanstack/react-table";
import moment from "moment";
import styles from "../style.module.scss";
import React from "react";
import {DropResult} from "react-beautiful-dnd";
import {get} from "lodash";


export type ReactColumn = ColumnDef<any, string> & {
  typeFilter?: 'oneValue',
  setSortColumn?: (sortType?: 'asc' | 'desc') => void;
  sortType?: 'asc' | 'desc';
  offSortFilter?: boolean;
  headerFilter?: Array<{
    text: string;
    value: string | number | boolean;
  }>;
  filterValues?: string[] | number[];
  classNameBodyColumnCell?: string;
  classNameHeadColumnCell?: string;
}

export type PropsTable = {
  //Required
  
  data: any[];
  columns: ReactColumn[];
  //ClassNames
  className?: string;
  classNameContainer?: string;
  //Toolbar
  toolbarContent?: (visibleRowsCount: number) => React.ReactNode;
  updateTable?: () => void;
  //Filters & Sorting
  columnsDate?: string[];
  //LocalStorage
  pathColumnVisibility?: string;
  pathColumnOrder?: string;
  pathColumnResize?: string;
  //click & active row
  
  onClickRow?: ((row: Row<any>, event?: any) => void);
  rowActive?: number;
  //other
  noDataText?: string;
  isLoading?: boolean;
}

type TableSearch = {
  //Search
  searchPlaceholder?: string;
  setSearchValue?: (value: string) => void;
  searchValue?: string;
  initialGlobalFilter?: string;
}

type TableLink = {  
  link?: (row: Row<any>) => {
    path: string,
    name: string,
    extraPath?: string,
  };
}

type TableFilterSort = {
  //Filters & Sorting
  
  setFilters?: (filterValues: any[] | undefined, nameColumn?: string) => void;
  setSortValue?: (nameColumn: string, sorting?: 'asc' | 'desc') => void;
}

type TableToolbar = {
  //Toolbar
  isSidebar?: boolean;
  isColumnChooser?: boolean;
}

export type PropsDnDTable = PropsTable & {
  //dnd
  onDragEnd: (result: DropResult) => void;
}

export type PropsExpandTable = PropsTable & TableSearch & TableLink & TableFilterSort & {
  //Expanded
  isExpandColumn?: boolean;
  isAllRowsExpanded?: boolean;
  isWithSubRowsClick?: boolean;  
  renderSubComponent?: (props: { row: Row<any> }) => React.ReactElement;
}

export type PropsGroupTable = PropsTable & TableSearch & TableLink & TableFilterSort & {
  //Grouping
  columnGroupName: string;
  isAllRowsExpanded?: boolean;
}

export type PropsSimpleTable = PropsTable & TableSearch & TableLink & TableFilterSort & TableToolbar & {
  isActiveFirstRow?: boolean;
}

export const sortingDate = (row1: Row<any>, row2: Row<any>, columnId: string, format?: string) => {
  const value2: string = row2?.getValue(columnId);
  const value1: string = row1?.getValue(columnId);
  const isValid1: boolean = !!value1 && moment(value1, format || "DD.MM.YYYY").isValid();
  const isValid2: boolean = !!value2 && moment(value2, format || "DD.MM.YYYY").isValid();
  const validNumber = !isValid2 ? 1 : !isValid1 ? -1 : 1
  const validDate =  !isValid2 && !isValid1 ? isValid1 : !isValid2 ? isValid2 : isValid1;
  return validDate ? +moment(value1, format || 'DD.MM.YYYY') - +moment(value2, format || 'DD.MM.YYYY') : validNumber;
}

export const sortingNumber = (row1: Row<any>, row2: Row<any>, columnId: string) => {
  const value2 = row2?.getValue<string>(columnId);
  const value1 = row1?.getValue<string>(columnId);
  return value1 && value2 ? +value1 - +value2 : -1;
}

export const expandingClickRow = (row: Row<any>, event: any) => {
  const classNames = event.currentTarget.className;
  const classNamesArr = classNames.split(' ');
  const isClass = classNamesArr.some((className: string) => className === styles.rowClicked);
  if (isClass) {
    const filterClassNames = classNamesArr.filter((className: string) => className !== styles.rowClicked);
    event.currentTarget.className = filterClassNames.join(' ');
  } else {
    classNamesArr.push(styles.rowClicked);
    event.currentTarget.className = classNamesArr.join(' ');
  }
}

export const  defaultFilter = (row: Row<any>, columnId: string, filterValue: string[]) => {  
  const rowMatches = (row: Row<any>): boolean => {
    const rowValue = row.getValue(columnId);  
    return !filterValue.length || filterValue.some((value: any) => {
      return String(rowValue) === String(value) || row.subRows?.some(rowMatches);
    });
  }

  return rowMatches(row);
};

export const defaultColumn: Partial<ColumnDef<any>> = {
  minSize: 50,
  size: 120,
  maxSize: 1000, 
  filterFn: 'default' as any,
};

export const defaultGlobalFilter = (row: Row<any>, columnId: string, value: any, isExpanded?: boolean, data?: any[]) => {
  if (!value?.length) return true;
  const lowercaseQuery = value.toLowerCase();
  
  const rowMatches = (row: Row<any>): boolean => {
    const rowValue = row.getValue(columnId);
    const isRowValue = typeof rowValue === "string" && rowValue.toLowerCase().includes(lowercaseQuery);
    return isRowValue || row.subRows?.some(rowMatches);
  }
  
  const filteredRows: any[] = [];
  
  const subRows: any[] = [];

  if(isExpanded) {
    if (!!data?.length) {
      
      const searchTree = (row: any) => {   
        const rowValue: any = get(row, columnId);
        if (typeof rowValue === "string" && rowValue.toLowerCase().includes(lowercaseQuery)) {
          filteredRows.push(row);
        } else if (!!(row?.subRows && row?.subRows?.length)) {
          for (let i = 0; i < row.subRows.length; i++) {
            searchTree(row.subRows[i]);
          }
        }
      }

      for (let i = 0; i < data.length; i++) {
        searchTree(data[i]);
      }
    }
    if(!!filteredRows.length) {
      
      const listTree = (row:any) => {
        if (!!row) {
          subRows.push(row);
        }
        if (!!(row?.subRows && row?.subRows?.length)) {
          for (let i = 0; i < row.subRows.length; i++) {
            listTree(row.subRows[i]);
          }
        }
      }

      for (let i = 0; i < filteredRows.length; i++) {
        listTree(filteredRows[i]);
      }
    }
  }
  
  return rowMatches(row) || subRows?.some((subRow: any) => subRow?.guid === row.original?.guid);
}


export const getColumnSizing = (pathColumnResize: string | undefined | null): ColumnSizingState => {
  const getSizingData = pathColumnResize && localStorage.getItem(pathColumnResize);
   return getSizingData ? JSON.parse(getSizingData) : {};
}

export const getColumnOrder = (pathColumnOrder: string | undefined | null): ColumnOrderState => {
  const getOrderData = pathColumnOrder && localStorage.getItem(pathColumnOrder);
  return  getOrderData ? JSON.parse(getOrderData) : [];
}

export const getColumnVisibility = (pathColumnVisibility: string | undefined | null): { [value: string]: boolean } => {
  const getColumnVisibilityData = pathColumnVisibility && localStorage.getItem(pathColumnVisibility);
  return  getColumnVisibilityData ? JSON.parse(getColumnVisibilityData) : {};
}
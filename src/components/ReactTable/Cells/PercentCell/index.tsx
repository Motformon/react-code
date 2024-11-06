import React from 'react';
import styles from './style.module.scss';
import {CellContext} from "@tanstack/react-table";

const PercentCell: React.FC<CellContext<any, string>> = (cellData) => {
  const setBorder = (cell: string) => cell === '' ? {border: 'none'} : {};
  const setWidth = (cell: string) => cell !== '' ? {width: cell} : {};
  const values = cellData?.getValue()?.split(', ');
  return (
    <>
      {values.map((value: any, index: number) => (
        <div key={`${value}-${index}`} className={styles.PercentCell} style={setBorder(value)}>
         {value}<span className={styles.bg} style={setWidth(value)}/>
        </div>
      ))}
    </>

  );
};

export default PercentCell;

import React from 'react';
import styles from './style.module.scss';
import {CellContext} from "@tanstack/react-table";

const CheckCell: React.FC<CellContext<any, string>> = (cellData) => {
  const value = cellData?.getValue();
  return (
    <div className={styles.CheckCell}>
      {value === 'Да' ? '✓' : ''}
    </div>
  );
};

export default CheckCell;

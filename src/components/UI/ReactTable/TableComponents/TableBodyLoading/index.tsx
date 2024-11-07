import React from 'react';
import ErrorBoundary from "../../../../ErrorBoundary";
import {
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material';
import styles from "./style.module.scss";
import Loader from '../../../Loader';


type Props = {
  colSpan: number | undefined;
}

const TableBodyLoading: React.FC<Props> = (props) => {
  const {
    colSpan,

  } = props;

  return (
    <ErrorBoundary componentName={'TableBodyLoading'}>
      <TableBody>
        <TableRow>
          <TableCell colSpan={colSpan}>
            <Loader isLinear={true} className={styles.TableBodyLoading}/>
          </TableCell>
        </TableRow>
      </TableBody>
    </ErrorBoundary>
  );
};

export default TableBodyLoading;

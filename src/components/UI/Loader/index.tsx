import React from 'react';
import styles from './style.module.scss';
import {Backdrop, CircularProgress, LinearProgress} from "@mui/material";

type Props = {
  className?: string;
  size?: number | string;
  display?: 'inline';
  isLinear?: boolean;
  backdropMode?: boolean;
};

const Loader: React.FC<Props> = ({className, size = 40, display, isLinear, backdropMode}) => {

  const classes = [
    styles.Loader,
    className,
  ];

  return (
    <>
      {backdropMode ? (
        <Backdrop open={backdropMode} className={styles.Backdrop}>
          <div className={classes.join(' ')} style={{display}}>
            <CircularProgress size={size} color={'inherit'}/>
          </div>
        </Backdrop>
      ) : (
        <div className={classes.join(' ')} style={{display}}>
          {isLinear ? (
            <LinearProgress/>
          ) : (
            <CircularProgress size={size}/>
          )}
        </div>
      )}
    </>
  );
};

export default Loader;

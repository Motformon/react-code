import React from 'react';
import styles from './style.module.scss';

type Props = {
  className?: string;
  
  error: any;
};

const ErrorMessage: React.FC<Props> = ({className, error}) => {

  const classes = [
    styles.ErrorMessage,
    className,
  ];

  return (
    <>
      {error ? (
        <p className={classes.join(' ')}>{error?.message}</p>
      ) : null}
    </>
  );
};

export default ErrorMessage;

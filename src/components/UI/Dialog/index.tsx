import React from 'react';
import styles from './style.module.scss';
import {DialogTitle, IconButton, DialogContent} from "@mui/material";
import DialogLib from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import CloseIcon from '@mui/icons-material/Close';

type Props = {
  className?: string;
  children: React.ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  footer?:  React.ReactNode;
  subtitle?: string;
  disableBackdropClick?: boolean;
  scroll?: 'body' | 'paper';
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  fullWidth?: boolean;
  disableEnforceFocus?: boolean;
};

const Dialog: React.FC<Props> = (props) => {

  const {
    fullWidth = false,
    maxWidth,
    scroll,
    className,
    children,
    open,
    setOpen,
    title,
    disableBackdropClick,
    subtitle,
    disableEnforceFocus,
  } = props;

  const classes = [
    styles.Dialog,
    scroll === 'paper' ? styles.DialogPaper : '',
    className,
  ];

  
  const handleClose = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    setOpen(false);
  };

  return (
    <DialogLib
      open={open}
      onClose={(event, reason) => {
        if (reason !== 'backdropClick' || !disableBackdropClick) {
          handleClose(event);
        }
      }}
      scroll={scroll || 'body'}
      className={classes.join(' ')}
      disableEnforceFocus={disableEnforceFocus}
      TransitionProps={{unmountOnExit: true}}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
    >
      <DialogTitle>
        <div className={styles.title} >
          <Typography variant="h6" component={'p'}>
            {title}
          </Typography>
          {subtitle ? (
            <Typography variant="caption" component={'p'}>
              {subtitle}
            </Typography>
          ) : null}
        </div>

        <IconButton aria-label="close" className={styles.closeButton} onClick={handleClose}>
          <CloseIcon/>
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {children}
      </DialogContent>
    </DialogLib>
  );
};

export default Dialog;

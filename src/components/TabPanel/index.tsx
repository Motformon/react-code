import React from "react";
import {Box, Typography} from "@mui/material";

interface TabPanelProps {
  children?: React.ReactNode;
  
  index: any;
  
  value: any;
  className?: string;
  isPrepare?: boolean;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, className, isPrepare, ...other } = props;

  return (
    <Typography
      style={isPrepare && value !== index ? {display: 'none'} : {}}
      component="div"
      role="tabpanel"
      hidden={isPrepare ? false : value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {isPrepare || value === index ? <Box className={className} p={3}>{children}</Box> : null}
    </Typography>
  );
};

export default TabPanel;

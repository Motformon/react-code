import React from 'react';
import ErrorBoundary from "../../../../../../../../ErrorBoundary";
import styles from './style.module.scss';
import {Checkbox, Collapse, FormControlLabel} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {uniq} from "lodash";
import moment from "moment";
import MonthFilter from "./MonthFilter";
import { Controller } from 'react-hook-form';

type Props = {
  year: number;
  filterItems: string[];
  
  setValue: any;
  
  control: any;
  values: string[]
};

const YearFilter: React.FC<Props> = ({filterItems, setValue, year, values, control}) => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const dateItems = filterItems?.filter((item) => moment(item, "DD.MM.YYYY").year() === year);
  const months = uniq(dateItems?.map((item) => moment(item, "DD.MM.YYYY").month()));

  return (
    <ErrorBoundary componentName={'YearFilter'}>
      <div className={styles.YearFilter}>
        <IconButton className={styles.collapseButton} size={'small'} onClick={handleClick}>
          {open ? <ExpandLess/> : <ExpandMore/>}
        </IconButton>
        <Controller
          name='values'
          control={control}
          render={() => (
            <FormControlLabel
              control={
                <Controller
                  name='values'
                  control={control}
                  render={({field}) => (
                    <Checkbox
                      {...field}
                      checked={dateItems.every((el) => values.some((item) => item === el))}
                      indeterminate={values.length === 0 || dateItems.every((el) => values.some((item) => item === el)) ? false : !dateItems.every((el) => !values.some((item) => item === el))}
                      onChange={(event, checked) => {
                        if (checked) {
                          setValue('values', [...values, ...dateItems], {shouldValidate: true});
                        } else {
                          setValue('values', values.filter((item) => !dateItems.some((el) => item === el)), {shouldValidate: true});
                        }
                      }}
                      color="primary"
                    />
                  )}
                />
              }
              label={year}
            />
          )}
        />
        <Collapse in={open} timeout="auto" unmountOnExit>
          <div className={styles.months}>
            {months?.sort((a, b) => a - b)?.map((month, index) => (
              <MonthFilter
                key={`month-${month}-${index}`}
                year={year}
                month={month}
                filterItems={filterItems}
                setValue={setValue}
                values={values}
                control={control}
              />
            ))}
          </div>
        </Collapse>
      </div>
    </ErrorBoundary>
  );
};

export default YearFilter;

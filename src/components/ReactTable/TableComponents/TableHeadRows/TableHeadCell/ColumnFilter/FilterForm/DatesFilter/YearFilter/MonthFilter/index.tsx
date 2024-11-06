import React from 'react';
import ErrorBoundary from "../../../../../../../../../ErrorBoundary";
import styles from './style.module.scss';
import {Checkbox, Collapse, FormControlLabel} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {uniq} from "lodash";
import moment from "moment";
import DayFilter from "./DayFilter";
import { Controller } from 'react-hook-form';

type Props = {
  year: number;
  month: number;
  filterItems: string[];
  setValue: any;
  control: any;
  values: string[]
};

const months = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

const MonthFilter: React.FC<Props> = ({filterItems, setValue, year, month, values, control}) => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const dateItems = filterItems?.filter((item) => moment(item, "DD.MM.YYYY").year() === year && moment(item, "DD.MM.YYYY").month() === month)
  const days = uniq(dateItems?.map((item) => item.slice(0, 2)));

  return (
    <ErrorBoundary componentName={'MonthFilter'}>
      <div className={styles.MonthFilter}>
        <IconButton className={styles.collapseButton} size={'small'} onClick={handleClick}>
          {open ? <ExpandLess/> : <ExpandMore/>}
        </IconButton>
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
                    if(checked) {
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
          label={months[month]}
        />
        <Collapse in={open} timeout="auto" unmountOnExit>
          <div className={styles.days}>
            {days?.sort((a, b) => +a - +b)?.map((day, index) => {
              return  (
                <DayFilter
                  key={`days-${day}-${index}`}
                  day={day}
                  dateItems={dateItems}
                  setValue={setValue}
                  values={values}
                  control={control}
                />
              )
            })}
          </div>
        </Collapse>
      </div>
    </ErrorBoundary>
  );
};

export default MonthFilter;

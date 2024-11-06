import React from 'react';
import ErrorBoundary from "../../../../../../../../../../ErrorBoundary";
import styles from './style.module.scss';
import {Checkbox, FormControlLabel} from "@mui/material";
import { Controller } from 'react-hook-form';

type Props = {
  day: string;
  dateItems: string[];
  setValue: any;
  control: any;
  values: string[];
};


const DayFilter: React.FC<Props> = ({dateItems, control, values, day, setValue}) => {
  const dates = dateItems?.filter((item) => item.slice(0, 2) === day);

  return (
    <ErrorBoundary componentName={'DayFilter'}>
      <div className={styles.DayFilter}>
        <FormControlLabel
          control={
            <Controller
              name='values'
              control={control}
              render={({field}) => (
                <Checkbox
                  {...field}
                  checked={dates.every((date) => values?.some((val) => val === date))}
                  onChange={(event, checked) => {
                    if (checked) {
                      setValue('values', dates?.length ? [...values, ...dates] : values, {shouldValidate: true});
                    } else {
                      setValue('values', values.filter((val) => !dates?.some((date) => val === date)), {shouldValidate: true});
                    }
                  }}
                  color="primary"
                />
              )}
            />
          }
          label={day}
        />
      </div>
    </ErrorBoundary>
  );
};

export default DayFilter;

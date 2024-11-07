import React from 'react';
import ErrorBoundary from "../../../../../../../../ErrorBoundary";
import styles from './style.module.scss';
import moment from "moment/moment";
import {uniq} from "lodash";
import YearFilter from "./YearFilter";

type Props = {
  filterItems: string[];
  values: string[];
  
  setValue: any;
  
  control: any;
};

const DatesFilter: React.FC<Props> = ({filterItems, setValue, values, control}) => {
  const years = uniq(filterItems?.filter((item) => item?.length)?.map((item) => moment(item, "DD.MM.YYYY").year()));

  return (
    <ErrorBoundary componentName={'DatesFilter'}>
      <div className={styles.DatesFilter}>
        {years?.sort((a, b) => b - a)?.map((year, index) => (
          <YearFilter
            key={`year-${year}-${index}`}
            filterItems={filterItems}
            setValue={setValue}
            year={year}
            values={values}
            control={control}
          />
        ))}
      </div>
    </ErrorBoundary>
  );
};

export default DatesFilter;

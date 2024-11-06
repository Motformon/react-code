import React, {useState} from 'react';
import styles from './style.module.scss';
import {Button, Checkbox, DialogActions, FormControlLabel, Divider} from "@mui/material";
import {array, InferType, number, object, string} from "yup";
import Search from "../../../../../../Search";
import {Column} from "@tanstack/react-table";
import DatesFilter from "./DatesFilter";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import ErrorMessage from "../../../../../../ErrorMessage";
import {ReactColumn} from "../../../../../utils";

type Props = {
  setOpen: (open: boolean) => void;
  
  column: Column<any, any>;
  columnsDate: undefined | string[];
  
  setFilters: undefined | ((filterValues: any[] | undefined, nameColumn?: string) => void);
};

const schema = object({
  values: array().of(string() || number()),
}).required();

type DefaultValues = InferType<typeof schema>;

const regSearch = (search: string, testSearch: string): boolean => {
  return new RegExp(search.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1"), 'i').test(testSearch);
};

const FilterForm: React.FC<Props> = ({setOpen, column, columnsDate, setFilters}) => {
  const [search, setSearch] = useState<string>('');

  const columnDef: ReactColumn = column?.columnDef;
  const typeFilter = columnDef?.typeFilter;
  const filterValues = columnDef?.filterValues;
  const offSortFilter = !!columnDef?.offSortFilter;
  const headerFilter = columnDef?.headerFilter?.map(item => item.text) || [];
  
  const columnFilterValue: any = filterValues && filterValues?.length
    ? columnDef?.headerFilter?.filter((item) => filterValues?.some(value => String(value) === String(item?.value)))?.map((item) => item?.text)
    : column.getFilterValue();

  const facetedUniqueValues = column.getFacetedUniqueValues();

  const sortedUniqueValues = React.useMemo(
    () => Array.from(facetedUniqueValues.keys()).sort(),
    [facetedUniqueValues]
  );

  const {handleSubmit, control, setValue, getValues, formState: {errors, isSubmitting}} = useForm<DefaultValues>({
    defaultValues: {
      values: columnFilterValue || []
    },
    resolver: yupResolver(schema)
  });

  const onSubmit = handleSubmit((values) => {
    const resultValues = columnDef?.headerFilter
      ? columnDef?.headerFilter?.filter((item) => (values?.values || []).some((value) => value === item?.text))?.map(item => item?.value)
      : values.values;

    if (setFilters) {
      setFilters(resultValues, column.id);
    } else {
      column.setFilterValue(resultValues);
    }
    setOpen(false);
  });

  const choiceHeaderFilter = headerFilter?.length ? offSortFilter ? headerFilter : headerFilter?.sort() : sortedUniqueValues;
  const searchHeaderFilter = choiceHeaderFilter.filter((item) => regSearch(search, item));

  const isDates = columnsDate?.some((date) => date === column?.id);

  const values = getValues();

  return (
    <form
      className={styles.FilterForm}
      onSubmit={onSubmit}
      onKeyDown={e => e.key === 'Enter' && e.preventDefault()}
    >
      <div className={styles.formContent}>
        {isDates ? (
          <>
            {facetedUniqueValues?.size > 2 ? (
              <>
                <FormControlLabel
                  control={
                    <Controller
                      name='values'
                      control={control}
                      render={({field}) => (
                        <Checkbox
                          {...field}
                          checked={searchHeaderFilter.every((value: string) => (values?.values || []).some((item) => String(value) === String(item)))}
                          indeterminate={values.values?.length === 0 ? false : !searchHeaderFilter.every((value: string) => (values?.values || []).some((item) => String(value) === String(item)))}
                          onChange={(event, checked) => {
                            if (checked) {
                              setValue('values', searchHeaderFilter, {shouldValidate: true});
                            } else {
                              setValue('values', [], {shouldValidate: true});
                            }
                          }}
                          color="primary"
                        />
                      )}
                    />
                  }
                  label={'Выбрать все'}
                />

                <Divider/>
              </>
            ) : null}
            <DatesFilter
              filterItems={searchHeaderFilter}
              setValue={setValue}
              values={(values.values || []) as string[]}
              control={control}
            />
          </>
        ) : (
          <>
            {facetedUniqueValues?.size > 9 ? (
              <Search
                className={styles.search}
                value={search}
                setValue={setSearch}
                isSmall={true}
                isOutlined={true}
              />
            ) : null}
            {typeFilter !== 'oneValue' && facetedUniqueValues?.size > 2 ? (
              <>
                <FormControlLabel
                  control={
                    <Controller
                      name='values'
                      control={control}
                      render={({field}) => (
                        <Checkbox
                          {...field}
                          checked={searchHeaderFilter.every((value: string) => (values?.values || []).some((item) => String(value) === String(item)))}
                          indeterminate={values.values?.length === 0 ? false : !searchHeaderFilter.every((value: string) => (values?.values || []).some((item) => String(value) === String(item)))}
                          onChange={(event, checked) => {
                            if (checked) {
                              setValue('values', searchHeaderFilter, {shouldValidate: true});
                            } else {
                              setValue('values', [], {shouldValidate: true});
                            }
                          }}
                          color="primary"
                        />
                      )}
                    />
                  }
                  label={'Выбрать все'}
                />
                <Divider/>
              </>
            ) : null}
            <div className={styles.filterList}>
              {searchHeaderFilter.map((item, index) => (
                <FormControlLabel
                  key={`headerFilter-${index}-${item}`}
                  control={
                    <Controller
                      name='values'
                      control={control}
                      render={({field}) => (
                        <Checkbox
                          {...field}
                          checked={(values?.values || []).some((value) => String(value) === String(item))}
                          onChange={(event, checked) => {
                            const prevValues = values.values || [];
                            if (checked) {
                              if (typeFilter === 'oneValue') {
                                setValue('values', [item], {shouldValidate: true});
                              } else {
                                setValue('values', [...prevValues, item], {shouldValidate: true})
                              }
                            } else {
                              setValue('values', prevValues?.filter((value) => String(value) !== String(item)), {shouldValidate: true})
                            }
                          }}
                          color="primary"
                        />
                      )}
                    />

                  }
                  label={item || '(Пустое)'}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <ErrorMessage error={errors?.values}/>
      <DialogActions>
        <Button onClick={() => setOpen(false)} color="primary">
          Отменить
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          color="primary"
        >
          Ок
        </Button>
      </DialogActions>
    </form>
  );
};

export default FilterForm;

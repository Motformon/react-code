import React, {useEffect, useRef, useState} from 'react';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import styles from './style.module.scss';
import {InferType, object, string} from "yup";
import {Paper, InputBase, IconButton} from '@mui/material';
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

type Props = {
  className?: string;
  value: string;
  setValue: (value: string) => void;
  placeholder?: string;
  isSmall?: boolean;
  isOutlined?: boolean;
  isSubmitOnChange?: boolean;
};

const schema = object({
  value: string(),
}).required();

type DefaultValues = InferType<typeof schema>;

const Search: React.FC<Props> = (props) => {

  const {className, value, setValue, placeholder, isSmall, isOutlined, isSubmitOnChange = true} = props;

  const classes = [
    styles.Search,
    className,
  ];
  const notInitialRender = useRef(false);
  const [search, setSearch] = useState<string>(value || '');

  useEffect(() => {
    if (notInitialRender.current) {
      const timeOutId = setTimeout(() => setValue(search), 500);
      return () => clearTimeout(timeOutId);
    } else {
      notInitialRender.current = true
    }
    
  }, [search]);

  const {
    handleSubmit,
    control,
    setValue: setValueForm
  } = useForm<DefaultValues>({
    defaultValues: {
      value: value || ''
    },
    resolver: yupResolver(schema)
  });

  const onSubmit = handleSubmit((data) => {
    setValue(data.value || '');
  });

  return (
    <Paper component={'span'} className={classes.join(' ')} variant={isOutlined ? 'outlined' : 'elevation'}>
      <Controller
        name="value"
        control={control} 
        render={({field: {ref, ...field}}) => (
          <InputBase
            {...field}
            className={styles.input}
            placeholder={placeholder || "Поиск..."}
            onChange={(e) => {
              if (isSubmitOnChange) {
                field.onChange(e);
                setSearch(e.target.value);
              } else {
                field.onChange(e);
              }
            }}
            onKeyDown={(event) => event.key === 'Enter' && onSubmit()}
          />
        )}
      />
      {value && value.length > 0 ? (
        <IconButton
          size={isSmall ? 'small' : undefined}
          onClick={() => {
            setValueForm('value', '')
            setValue('');
          }}
          className={isSmall ? '' : styles.iconButton}
          aria-label="Отчистить поиск"
        >
          <CloseIcon/>
        </IconButton>
      ) : null}
      <IconButton
        size={isSmall ? 'small' : undefined}
        onClick={() => onSubmit()}
        className={isSmall ? '' : styles.iconButton}
        aria-label="Поиск"
        title={'Искать'}
      >
        <SearchIcon/>
      </IconButton>
    </Paper>
  );
};

export default Search;

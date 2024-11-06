import React from 'react';
import SelectLib, {Props} from 'react-select';


interface PropsSelect extends Props<any, boolean> {

}

const Select: React.FC<PropsSelect> = (props) => {
  const {styles, ...selectProps} = props;

  return (
    <SelectLib
      menuPlacement={'auto'}
      styles={{
        menu: (provided) => ({
          ...provided,
          zIndex: 3
        }),
        ...styles
      }}
      placeholder={'Выберите'}
      {...selectProps}
    />
  );
};

export default Select;

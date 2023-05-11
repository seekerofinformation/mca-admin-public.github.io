import React from 'react';
import Select from 'react-select';

const CustomSelect = ({options, handleSelect, isMulti = false, defaultValue = [options[0]]}) => {
  const selectStyles = {
    control: (base) => ({
      ...base,
      fontSize: '16px',
      fontWeight: '400',
      borderRadius: '10px',
      background: '#FFFFFF',
      color: '#1C1C1C',
      border: 'none',
      boxShadow: 'none',
      '&:focus': {
          border: '0 !important',
      },
  }),
  input: (baseStyles) => ({
    ...baseStyles,
    color: 'transparent'
  })
}

  return (
    <Select
        isMulti={isMulti}
      options={options}
      defaultValue={defaultValue}
      styles={selectStyles}
      onChange={handleSelect}
    />
  );
};

export default CustomSelect;

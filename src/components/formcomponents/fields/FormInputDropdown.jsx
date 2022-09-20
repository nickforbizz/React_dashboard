import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';

import { Controller } from 'react-hook-form';

const options = [
  {
    label: 'Dropdown Option 1',
    value: '1',
  },
  {
    label: 'Dropdown Option 2',
    value: '2',
  },
];

export const FormInputDropdown = ({ name, control, label }) => {
  const generateSelectOptions = () => {
    return options.map((option) => {
      return (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      );
    });
  };

  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel htmlFor={`${label}id`}>{label}</InputLabel>
      <Controller
        control={control}
        name={name}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <Select 
          onChange={onChange} 
          fullWidth 
          value ={value} 
          label={label} 
          labelId={`${label}id`}
          sx={{ mb: 2 }}>
            {generateSelectOptions()}
          </Select>
        )}
      />

    </FormControl>
   
  );
};

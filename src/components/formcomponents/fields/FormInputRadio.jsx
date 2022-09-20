import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';

const options = [
  {
    label: 'Radio Option 1',
    value: '1',
  },
  {
    label: 'Radio Option 2',
    value: '2',
  },
];

function FormInputRadio({ name, control, label }) {
  const generateRadioOptions = () => {
    return options.map((option, i) => (
        <FormControlLabel 
        key={i} 
        label={option.label}
        value={option.value}
        control = {<Radio />}
        />
    ))
  };
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <RadioGroup value={value} onChange={onChange} sx={{ mb: 1 }}>
          {generateRadioOptions()}
        </RadioGroup>
      )}
    />
  );
}

export default FormInputRadio;

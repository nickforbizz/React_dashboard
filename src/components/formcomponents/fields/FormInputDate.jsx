import React from 'react'
import { Controller } from "react-hook-form";
import { TextField } from '@mui/material';

function FormInputDate({ name, control, label }) {
  return (
        <Controller
          name={name}
          control={control}
          render={({ field : {onChange , value }, fieldState: { error }, }) => (
            <TextField
              helperText={error ? error.message : null}
              size="small"
              type="date"
              InputLabelProps={{ shrink: true }}
              error={!!error}
              onChange={onChange}
              value={value || ''}
              fullWidth
              label={label}
              variant="outlined"
              sx={{ mb: 2 }}
            />
          )}
        />

  )
}

export default FormInputDate
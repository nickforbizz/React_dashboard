import React from 'react'
import { Controller } from "react-hook-form";
import { Button, TextField } from '@mui/material';

function FormInputFile({ name, control, label }) {
  return (
    <>
    <input
      accept="image/*"
      name={name}
      className={""}
      style={{ display: 'none' }}
      id="raised-button-file"
      multiple
      type="file"
    />
    <label htmlFor="raised-button-file">
      <Button variant="outlined" fullWidth  component="span" className={"classes.button"}>
        Upload File
      </Button>
    </label> 
    </>

  )
}

export default FormInputFile
import React from 'react';
import { Button, Divider, Paper, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { FormInputText } from './fields/FormInputText';
import FormInputRadio from './fields/FormInputRadio';
import { FormInputDropdown } from './fields/FormInputDropdown';
import FormInputDate from './fields/FormInputDate';
import FormInputMultiCheckbox from './fields/FormInputMultiCheckbox';
import FormInputFile from './fields/FormInputFile';

const defaultValues = {
  textValue: '',
  radioValue: '',
  checkboxValue: [],
  dateValue: new Date(),
  dropdownValue: '',
  sliderValue: 0,
};

function Appform() {
  const methods = useForm({ defaultValues });
  const { handleSubmit, reset, control, setValue } = methods;
  const onSubmit = (data) => console.log(data);

  return (
    <>
      <Paper sx={{ p: 2, mb: 2, mt: 2 }}>
        <Typography variant="h4">My Custorm Form</Typography>

        <Divider light sx={{ mb: 2 }} className="divider" />

        <form>
          

          <FormInputText
            name={'textInput'}
            control={control}
            label={'Text Input'}
          />

          <FormInputRadio
            name={'radioInput'}
            control={control}
            label={'Radio Input'}
          />

          <FormInputDropdown
            name={'dropdownInput'}
            control={control}
            label={'DropDownInput'}
          />


          <FormInputDate
            name={'dateinput'}
            control={control}
            label={'DateInput'}
          />

          <FormInputFile
            name={'fileinput'}
            control={control}
            label={'FileInput'}
          />

          <FormInputMultiCheckbox
            control={control}
            setValue={setValue}
            name={'checkboxValue'}
            label={'Checkbox Input'}
          />
        </form>

        <Divider light sx={{ mb: 2 }} className="divider" />

        <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
        <Button onClick={() => reset()}>Reset</Button>
      </Paper>
    </>
  );
}

export default Appform;

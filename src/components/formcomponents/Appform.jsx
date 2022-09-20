import React from 'react';
import { Button, Divider, Paper, TextField, Typography } from '@mui/material';
import { Controller, useForm } from "react-hook-form";
import { FormInputText } from './fields/FormInputText';

function Appform() {
    const { handleSubmit, reset, control } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <>
      <Paper sx={{p:2,mb:2,mt:2}}>
        <Typography variant="h4" >My Custorm Form</Typography>

        <Divider light sx={{ mb: 2 }} className="divider" />

        <form>
        <Controller 
            name={"input_name"}
            control={control}
            render={({field: {onChange, value} }) => (
                <TextField
                  onChange={onChange}
                  value={value}
                  label={'Text Value'} //optional
                  placeholder={'Your input ...'} //optional
                  sx={{ width: 1 }}
                />

            )}
        />

<FormInputText
        name={"textInput"}
        control={control}
        label={"Text Input"}
      />
        </form>

        <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
        <Button onClick={() => reset()}>Reset</Button>
      </Paper>
    </>
  );
}

export default Appform;

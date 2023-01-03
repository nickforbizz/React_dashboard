import React, { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Alert, Divider, IconButton } from '@mui/material';

function Appnormalform(props) {
  let { template, onSubmit, validate = () => {}} = props;
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  // let register = 
 
  let {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
    clearErrors,
  } = props.useForm({
    mode: "onChange",
    defaultValues:props.preloadValues
  });

  let defaultValues = props?.preloadValues
  

  
  let { title='Kindly Fill the below form and submit!', fields, watchFields = [] } = template;
  let watchValues = watch(watchFields); 

  validate(watchValues, { errors, setError, clearErrors });

  const getOptions = (select_options) => {
    console.log(select_options);
    if(select_options && select_options.length > 0){
      return select_options.map(({ key, value }) => {
        let option_key = key;
        return (
          <option value={option_key} > {value} </option>
        )     

      })
    }
  }


  const renderFields =  (fields) => {
    if (fields.length < 1) {
      return <h6>No Fields to this form</h6>;
    }

    return fields.map((field, i) => {
      let {
        input_type = 'input',
        title,
        type,
        name,
        field_id,
        validationProps,
        select_options,
        dynamic,
      } = field;
      let [, has_portifolio] = watchValues;
      let showField = dynamic ? has_portifolio === dynamic['value'] : true;


      if (!showField) return 0;
      switch (input_type) {
        case 'input':
          return (
            <div className="input-field" key={i}>
              <label htmlFor={field_id} className={`${defaultValues?.name ? 'active' : ''}`}>{title} </label>
              <input
                type={showPassword ? 'text' : type}
                id={field_id}
                autoComplete={field_id === 'password' ? 'on' : 'off'}
                {...register(name, { ...validationProps })}
              />
              {field_id === 'password' ? (
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  sx={{ ml: '-30px', cursor: 'pointer', position: 'absolute' }}
                >
                  {showPassword ? (
                    <Visibility
                      fontSize="small"
                    />
                  ) : (
                    <VisibilityOff
                      fontSize="small"
                    />
                  )}
                </IconButton>
              ) : (
                ''
              )}
              {errors[name] && (
                <span className="red-text"> {errors[name].message} </span>
              )}
            </div>
          );
        case 'checkbox':
          return (
            <div className="checkbox_div" key={i}>
              <label htmlFor={field_id} className={`${defaultValues?.name ? 'active' : ''}`}>
                <input
                  type="checkbox"
                  id={field_id}
                  {...register(name, { ...validationProps })}
                />
                <span>{title}</span>
                {errors[name] && (
                  <span className="red-text"> {errors[name].message} </span>
                )}
              </label>
            </div>
          );
        case 'select':
          return (
            <div className="pr" key={i}>
              <label htmlFor={field_id} className={`${defaultValues?.name ? 'active' : ''}`}>{title}</label>
              <select
                className="browser-default"
                id={field_id}
                {...register(name, { ...validationProps })}
              >
                <option defaultValue="" disabled>
                  Choose your option
                </option>
                { getOptions(select_options) }
              </select>
              {errors[name] && (
                <span className="red-text"> {errors[name].message} </span>
              )}
            </div>
          );

        case 'select_multiple':
          return (
            <div className="pr" key={i}>
              <label htmlFor={field_id} className={`${defaultValues?.name ? 'active' : ''}`}>{title}</label>
              <select
                className="browser-default"
                id={field_id}
                {...register(name, { ...validationProps })}
              >
                <option defaultValue="" disabled>
                  Choose your option
                </option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
              </select>
              {errors[name] && (
                <span className="red-text"> {errors[name].message} </span>
              )}
            </div>
          );
        default:
          return <div className="red-text">Invalid Field </div>;
      }

     
    });
    
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <h6 >{title}</h6> */}
        <Alert severity="info" sx={{ mb: 2 }}> {title} </Alert>
        <Divider light sx={{ mb: 3 }} className="divider" />

        <div>{renderFields(fields)}</div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}

export default Appnormalform;

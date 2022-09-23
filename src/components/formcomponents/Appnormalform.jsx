import React from 'react';
import { useForm } from 'react-hook-form';

function Appnormalform({ template, onSubmit, validate }) {
  let {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();
  let { title, watchFields, fields } = template;
  let watchValues = watch(watchFields);

  validate(watchValues, { errors, setError, clearErrors });

  const renderFields = (fields) => {
    if (fields.length < 1) {
      return <h6>No Fields to this form</h6>;
    }

    return fields.map((field, i) => {
      let { title, type, name, field_id, validationProps } = field;
      return (
        <div className="input-field" key={i}>
          <label htmlFor={field_id}>{title}</label>
          <input
            type={type}
            id={field_id}
            {...register(name, { ...validationProps })}
          />
          {errors[name] && (
            <span className="red-text"> {errors[name].message} </span>
          )}
        </div>
      );
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h4 className="m" sx={{ mb: 2 }}>
          {title}
        </h4>

        <div>{renderFields(fields)}</div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}

export default Appnormalform;

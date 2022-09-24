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
      let {
        input_type = 'input',
        title,
        type,
        name,
        field_id,
        validationProps,
        dynamic,
      } = field;
      let [, has_portifolio] = watchValues;
      let showField = dynamic ? has_portifolio === dynamic['value'] : true;

      if (!showField) return;

      switch (input_type) {
        case 'input':
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
        case 'checkbox':
          return (
            <div className="checkbox_div" key={i}>
              <label htmlFor={field_id}>
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
                <select id={field_id} {...register(name, { ...validationProps })}>
                    <option value="" disabled selected>Choose your option</option>
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                    <option value="3">Option 3</option>
                </select>
                <label htmlFor={field_id}>{title}</label>
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

 let form_template = {
    title: 'Kindly Fill the below user form and submit!',
    watchFields: ['fname', 'has_portifolio'],
    fields: [
      {
        title: 'First Name',
        type: 'text',
        name: 'fname',
        field_id: 'fname',
        validationProps: {
          required: 'First Name is required',
        },
      },
      {
        title: 'Last Name',
        type: 'text',
        name: 'lname',
        field_id: 'lname',
      },
      {
        title: 'Email',
        type: 'email',
        name: 'email',
        field_id: 'email',
      },
      {
        input_type: 'checkbox',
        title: 'Include Portifolio',
        type: 'text',
        name: 'has_portifolio',
        field_id: 'has_portifolio',
      },
      {
        title: 'Portfolio URL',
        type: 'url',
        name: 'portfolio',
        field_id: 'portfolio_url',
        dynamic: {
          field: 'has_portifolio',
          value: true,
        },
      },
      {
        input_type: 'select',
        title: 'Select Title',
        type: 'select',
        name: 'select',
        field_id: 'select_id',
        select_options: {
          key: 'value'
        }
        options: {
          field: 'has_portifolio',
          value: true,
        },
      },
    ],
  };
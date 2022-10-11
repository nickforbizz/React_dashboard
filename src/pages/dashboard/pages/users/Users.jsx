import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Add } from '@mui/icons-material';
import {
  Box,
  Button,
  Divider,
  Grid,
  Link,
  Modal,
  Typography,
} from '@mui/material';
import useAxiosPrivate from '../../../../components/hooks/useAxiosPrivate';
import Appbreadcrumb from '../../../../components/breadcrumb/Appbreadcrumb';
import Datatable from '../../../../components/datatable/Datatable';
import Appnormalform from '../../../../components/formcomponents/Appnormalform';
import { useNavigate, useLocation } from 'react-router-dom';
import AppModal from '../../../../components/modal/AppModal';
import { useForm } from 'react-hook-form';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 12,
  p: 4,
};

function Users() {
  const [users, setUsers] = useState({});
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const { setValue } = useForm();

  const [openModal, setOpenModal] = useState(false);
 

  useEffect(() => {
    const USERS_URL = 'api/user/';
    let isMounted = true;
    let controller = new AbortController();
    const getUsers = async () => {
      try {
        const res = await axiosPrivate.get(USERS_URL, {
          signal: controller.signal,
        });
        console.log(res.data);
        isMounted && setUsers(res.data);
      } catch (err) {
        console.error(err);
        navigate('/login', { state: { from: location }, replace: true });
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate, location, navigate]);

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
        options: {
          field: 'has_portifolio',
          value: true,
        },
      },
    ],
  };

  let user_columns = [
    {
      name: '#',
      options: {
        sort: true,
        filter: false,
        customBodyRender: (value, meta) => {
          return meta.rowIndex + 1;
        },
      },
    },
    {
      name: '_id',
      options: {
        "filter":false,
        "sort":false,
        "display":false,
        "viewColumns":false
      },
    },
    {
      name: 'name',
      label: 'Name',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'email',
      label: 'Email',
      options: {
        filter: true,
        sort: true,
        align: 'center',
      },
    },
    {
      name: 'created_at',
      label: 'Created At',
      options: {
        filter: true, 
        sort: true,
        customBodyRender: (value, meta) => {
          return moment(value, "YYYYMMDD").fromNow();
        },
      },
    },
  ];

  const onSubmit = (data) => console.log(data);
  const validate = (watchValues, errorMethods) => {
    let { errors, setError, clearErrors } = errorMethods;
    let [fname] = watchValues;

    if (fname !== undefined && fname.toLowerCase() === 'admin') {
      if (!errors['fname']) {
        setError('fname', {
          type: 'manual',
          message: 'You cannot use name Admin in this field',
        });
      }
    } else {
      if (errors['fname'] && errors['fname']['type'] === 'manual') {
        clearErrors('fname');
      }
    }
  };

  let passedFunction = (val) => {
    console.log(val[1]);
    setValue('fname', val[1])
    setOpenModal(true)
  };

  const breadcrumbs = [
    <Link href="/admin/" key="1" underline="hover">
      Dashboard
    </Link>,

    <Typography key="2" color="text.primary">
      Users
    </Typography>,
  ];

  return (
    <>
      <div className="page_header">
        <Typography variant={'h5'} component={'h5'} className="pagetitle">
          Users Page
        </Typography>
        <Appbreadcrumb breadcrumbs={breadcrumbs} />
      </div>
      <Divider light sx={{ mb: 2 }} className="divider" />




      <Grid container>
        <Grid item xs={12} sx={{ mb: 2 }}>
          <Button
            variant="outlined"
            sx={{ borderRadius: 28 }}
            onClick={()=>setOpenModal(true)}>
            Add User <Add fontSize="small" />
          </Button>
        </Grid>





        <Grid item xs={12}>
          <Datatable tb_title="Active Users" data={(users && users.length > 0 ) ? users : null} 
                    columns={user_columns}  passedFunction={passedFunction}/>
        </Grid>



        <Grid item xs={12}>
          <AppModal show={openModal} close={()=>setOpenModal(false)} title={`Add | Edit User`}>
            <Appnormalform
              template={form_template}
              onSubmit={onSubmit}
              validate={validate}
            /> 
          </AppModal>
        </Grid>
      </Grid>
    </>
  );
}

export default Users;

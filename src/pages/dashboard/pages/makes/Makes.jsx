import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Add } from '@mui/icons-material';
import {
  Alert,
  AlertTitle,
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
import UpdateTbData from '../../../../components/hooks/UpdateTbData';

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

function Makes() {
  const [makes, setMakes] = useState(null);
  const [make, setMake] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const [errMsg, setErrMsg] = useState('');

  const [openModal, setOpenModal] = useState(false);
  const MAKES_URL_ALL = 'api/makes/all';
  const MAKES_URL = 'api/makes/';
  

  useEffect(() => {
    let isMounted = true;
    let controller = new AbortController();
    const getMakes = async () => {
      try {
        const res = await axiosPrivate.get(MAKES_URL_ALL, {
          signal: controller.signal,
        });
        isMounted && setMakes(res?.data?.data);
      } catch (err) {
        console.error(err);
        navigate('/login', { state: { from: location }, replace: true });
      }
    };

    getMakes();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate, location, navigate]);

  let form_template = {
    title: 'Kindly Fill the below form and submit!',
    fields: [
      {
        title: 'Title', 
        type: 'text',
        name: 'title',
        field_id: 'title',
        validationProps: {
          required: 'title is required',
        },
      },
      {
        title: 'Description',
        type: 'text',
        name: 'description',
        field_id: 'description',
      },
    ],
  };


  let form_template_update = {
    title: 'Kindly Fill the below form and submit!',
    fields: [
        {
            title: 'Title', 
            type: 'text',
            name: 'title',
            field_id: 'title',
            validationProps: {
              required: 'title is required',
            },
          },
          {
            title: 'Description',
            type: 'text',
            name: 'description',
            field_id: 'description',
          },
          {
            input_type: 'select',
            title: 'Active',
            type: 'select',
            name: 'active',
            field_id: 'select_id',
            select_options: [
              {key: 1,  value: 'Yes'},
              {key: 0,  value: 'No'}
            ]
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
      name: 'id',
      options: {
        "filter":false,
        "sort":false,
        "display":false,
        "viewColumns":false
      },
    },
    {
      name: 'title',
      label: 'Title',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'description',
      label: 'Description',
      options: {
        filter: true,
        sort: true,
        align: 'center',
      },
    },
    {
        name: 'active',
        label: 'Active',
        options: {
          filter: true,
          sort: true,
          align: 'center',
        },
      },
    {
      name: 'createdAt',
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

  const onSubmit = async (data) =>{ 
    const upsert_url = data?.id ? `${MAKES_URL}update/${data?.id}` : `${MAKES_URL}`;
    // console.log(data);
    await axiosPrivate.post(upsert_url, data)
            .then(res=>{
              console.log(res);
              let patched_record = res?.data?.data;
              if(patched_record){
                let new_records = UpdateTbData(patched_record, makes);
                setMakes(new_records);
                setOpenModal(false)
              }
            })
            .catch(err=>{
              let err_msg = err?.response?.data?.message || "Fatal Error Occured";
              let err_status = err?.response?.status;
              setErrMsg(err_msg);
            })
  }



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



  let editRecord = (val) => {
    let mymake = makes.filter((item)=> item.id === val[0]);
    if(mymake)
      setMake(...mymake);
    setOpenModal(true)
  };

  let delRecord = async (val) => {
    let record_id = val[0];
    let mymake = makes.filter((item)=> item.id === val[0])[0];


    let del_url = `${MAKES_URL}delete/${record_id}`
    let verify = window.confirm(`Are you sure you want to delete this record `);
    if(verify){
      await axiosPrivate.post(del_url)
            .then(res=>{
              let patched_record = res.data;
              if(patched_record){
                let new_records = UpdateTbData(mymake, makes, true);
                setMakes(new_records);
                setOpenModal(false)
              }
            })
            .catch(err=>console.error(err))
    }
    
  };

  const breadcrumbs = [
    <Link href="/admin/" key="1" underline="hover">
      Dashboard
    </Link>,

    <Typography key="2" color="text.primary">
      Makes
    </Typography>,
  ];


  return (
    <>
      <div className="page_header">
        <Typography variant={'h5'} component={'h5'} className="pagetitle">
          Makes Page
        </Typography>
        <Appbreadcrumb breadcrumbs={breadcrumbs} />
      </div>
      <Divider light sx={{ mb: 2 }} className="divider" />




      <Grid container>
        <Grid item xs={12} sx={{ mb: 2 }}>
          <Button
            variant="outlined"
            sx={{ borderRadius: 28 }}
            onClick={()=>{
              setMake({}); 
              setOpenModal(true);
              }}>
            Add Make <Add fontSize="small" />
          </Button>
        </Grid>





        <Grid item xs={12}>
          <Datatable tb_title="Active Makes" 
              data={(makes && makes.length > 0 ) ? makes : null} 
              columns={user_columns}  
              editRecord={editRecord}
              delRecord={delRecord} />
        </Grid>



        <Grid item xs={12}>
          <AppModal show={openModal} close={()=>setOpenModal(false)} title={`Add | Edit User`}>
            {errMsg ? (
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {errMsg}
              </Alert>
            ) : (
              ''
            )}
            <Appnormalform
              template = {(makes && makes.length > 0 ) ? form_template_update : form_template} 
              onSubmit={onSubmit}
              validate={validate}
              useForm={useForm} 
              preloadValues={make} 
            /> 
          </AppModal>
        </Grid>
      </Grid>
    </>
  );
}

export default Makes;

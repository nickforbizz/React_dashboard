import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Add } from '@mui/icons-material';
import {
  Alert,
  AlertTitle,
  Button,
  Divider,
  Grid,
  Link,
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
import ReshapeModelData from '../../../../components/hooks/ReshapeModelData';

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

function Models() {
  const [models, setModels] = useState({});
  const [reshapedmodels, setReshapedmodels] = useState({});
  const [model, setModel] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const [errMsg, setErrMsg] = useState('');

  const [openModal, setOpenModal] = useState(false);
  const MODELS_URL_ALL = 'api/models/all';
  const MODELS_URL = 'api/models/';
  

  useEffect(() => {
    let isMounted = true;
    let controller = new AbortController();
    const getModels = async () => {
      try {
        const res = await axiosPrivate.get(MODELS_URL_ALL, {
          signal: controller.signal,
        });
        isMounted && setModels(res?.data?.data);

        setReshapedmodels(ReshapeModelData(res?.data?.data, ['make']));
        
      } catch (err) {
        console.error(err);
        // navigate('/login', { state: { from: location }, replace: true });
      }
    };

    getModels();

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

  let data_columns = [
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
        name: 'make_title',
        label: 'Category',
        options: {
          filter: true,
          sort: true,
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
    const upsert_url = data?.id ? `${MODELS_URL}update/${data?.id}` : `${MODELS_URL}`;
    // console.log(data);
    await axiosPrivate.post(upsert_url, data)
            .then(res=>{
              console.log(res);
              let patched_record = res?.data?.data;
              if(patched_record){
                let new_records = UpdateTbData(patched_record, models);
                setModels(new_records);
                setOpenModal(false)
              }
            })
            .catch(err=>{
              let err_msg = err?.response?.data?.message || "Fatal Error Occured";
              let err_status = err?.response?.status;
              setErrMsg(err_msg);
            })
  }







  let editRecord = (val) => {
    let mymodel = models.filter((item)=> item.id === val[0]);
    if(mymodel)
      setModel(...mymodel);
    setOpenModal(true)
  };

  let delRecord = async (val) => {
    let record_id = val[0];
    let mymodel = models.filter((item)=> item.id === val[0])[0];


    let del_url = `${MODELS_URL}delete/${record_id}`
    let verify = window.confirm(`Are you sure you want to delete this record `);
    if(verify){
      await axiosPrivate.post(del_url)
            .then(res=>{
              let patched_record = res.data;
              if(patched_record){
                let new_records = UpdateTbData(mymodel, models, true);
                setModels(new_records);
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
      Models
    </Typography>,
  ];


  return (
    <>
      <div className="page_header">
        <Typography variant={'h5'} component={'h5'} className="pagetitle">
        Models Page
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
              setModel({}); 
              setOpenModal(true);
              }}>
            Add Model <Add fontSize="small" />
          </Button>
        </Grid>





        <Grid item xs={12}>
          <Datatable tb_title="Active Models" 
              data={(reshapedmodels && reshapedmodels.length > 0 ) ? reshapedmodels : null} 
              columns={data_columns}  
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
              template = {(models && models.length > 0 ) ? form_template_update : form_template} 
              onSubmit={onSubmit}
              useForm={useForm} 
              preloadValues={model} 
            /> 
          </AppModal>
        </Grid>
      </Grid>
    </>
  );
}

export default Models;

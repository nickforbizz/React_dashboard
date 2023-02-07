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
import ReshapeSelectData from '../../../../components/hooks/ReshapeSelectData';



function Products() {
  const [makes, setMakes] = useState({});
  const [models, setModels] = useState({});
  const [productCategories, setProductCategories] = useState({});
  const [reshapedProducts, setReshapedProducts] = useState({});
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState(null);
  const axiosPrivate = useAxiosPrivate("f");
  const navigate = useNavigate();
  const location = useLocation();
  const [errMsg, setErrMsg] = useState('');

  const [openModal, setOpenModal] = useState(false);
  const PRODUCTS_URL_ALL = 'api/products/all';
  const PRODUCTS_URL = 'api/products/';
  const MAKE_URL = 'api/makes/';
  const MODELS_URL = 'api/models/';
  const PRODUCT_CATEGORIES_URL = 'api/product_category/';

  useEffect(() => {
    let isMounted = true;
    let controller = new AbortController();
    const getProducts = async () => {
      try {
        const res = await axiosPrivate.get(PRODUCTS_URL_ALL, {
          signal: controller.signal,
        });
        isMounted && setProducts(res?.data?.data);
        console.log("products");
        console.log(res?.data?.data);

        setReshapedProducts(ReshapeModelData(res?.data?.data, ['make', 'model', 'product_category']));
      } catch (err) {
        console.error(err);
        navigate('/login', { state: { from: location }, replace: true });
      }
    };

    const getMakes = async () => {
      try {
        const res = await axiosPrivate.get(MAKE_URL, {
          signal: controller.signal,
        });
        isMounted && setMakes(res?.data?.data);
      } catch (err) {
        console.error(err);
        navigate('/login', { state: { from: location }, replace: true });
      }
    };

    const getModels = async () => {
      try {
        const res = await axiosPrivate.get(MODELS_URL, {
          signal: controller.signal,
        });
        isMounted && setModels(res?.data?.data);
      } catch (err) {
        console.error(err);
        navigate('/login', { state: { from: location }, replace: true });
      }
    };

    const getProductCategories = async () => {
      try {
        const res = await axiosPrivate.get(PRODUCT_CATEGORIES_URL, {
          signal: controller.signal,
        });
        isMounted && setProductCategories(res?.data?.data);
      } catch (err) {
        console.error(err);
        navigate('/login', { state: { from: location }, replace: true });
      }
    };

    getProducts();
    getMakes();
    getModels();
    getProductCategories();

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
        input_type: 'select',
        title: 'Make',
        type: 'select',
        col: 'col s6',
        name: 'vehicle_make_id',
        field_id: 'select_make_id',
        select_options: ReshapeSelectData(makes, ['id', 'title']),
      },
      {
        input_type: 'select',
        title: 'Model',
        type: 'select',
        col: 'col s6',
        name: 'vehicle_model_id',
        field_id: 'select_model_id',
        select_options: ReshapeSelectData(models, ['id', 'title']),
      }, 
      {
        input_type: 'select',
        title: 'Category',
        type: 'select',
        col: 'col s6',
        name: 'product_category_id',
        field_id: 'select_category_id',
        select_options: ReshapeSelectData(productCategories, ['id', 'title']),
      },
      {
        input_type: 'select',
        title: 'Active',
        type: 'select',
        col: 'col s6',
        name: 'active',
        field_id: 'select_id',
        select_options: [
          { key: 1, value: 'Yes' },
          { key: 0, value: 'No' },
        ],
      },
      {
        title: 'Description',
        type: 'text',
        name: 'description',
        field_id: 'description',
      },
      {
        title: 'Image',
        type: 'file',
        name: 'files',
        field_id: 'files',
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
        input_type: 'select',
        title: 'Make',
        type: 'select',
        col: 'col s6',
        name: 'vehicle_make_id',
        field_id: 'select_make_id',
        select_options: ReshapeSelectData(makes, ['id', 'title']),
      },
      {
        input_type: 'select',
        title: 'Model',
        type: 'select',
        col: 'col s6',
        name: 'vehicle_model_id',
        field_id: 'select_model_id',
        select_options: ReshapeSelectData(models, ['id', 'title']),
      },
      {
        input_type: 'select',
        title: 'Category',
        type: 'select',
        col: 'col s6',
        name: 'product_category_id',
        field_id: 'select_category_id',
        select_options: ReshapeSelectData(productCategories, ['id', 'title']),
      },
      {
        input_type: 'select',
        title: 'Active',
        type: 'select',
        col: 'col s6',
        name: 'active',
        field_id: 'select_id',
        select_options: [
          { key: 1, value: 'Yes' },
          { key: 0, value: 'No' },
        ],
      },
      {
        title: 'Description',
        type: 'text',
        name: 'description',
        field_id: 'description',
      },
      {
        title: 'Image',
        type: 'file',
        name: 'files',
        field_id: 'files',
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
        filter: false,
        sort: false,
        display: false,
        viewColumns: false,
      },
    },
    {
      name: 'make_title',
      label: 'Make',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'model_title',
      label: 'Model',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'product_category_title',
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
          return moment(value, 'YYYYMMDD').fromNow();
        },
      },
    },
  ];

  const onSubmit = async (data) => {
    
    let formdata = new FormData();
    Object.keys(data).forEach(key => formdata.append(key, data[key]));
    formdata.append("images", data?.files[0]);
    const upsert_url = data?.id
      ? `${PRODUCTS_URL}update/${data?.id}`
      : `${PRODUCTS_URL}`;
    await axiosPrivate
      .post(upsert_url, formdata)
      .then((res) => {
        console.log(res);
        let patched_record = res?.data?.data?.data;
        if (patched_record && patched_record.length>0) {
          let new_records = UpdateTbData(patched_record[0], products);
          setProducts(new_records);
          
          setReshapedProducts(ReshapeModelData(new_records, ['make', 'model', 'product_category']));
        }
        setOpenModal(false);
      })
      .catch((err) => {
        let err_msg = err?.response?.data?.message || 'Fatal Error Occured';
        setErrMsg(err_msg);
      });
  };

  let editRecord = (val) => {
    let this_record = products.filter((item) => item.id === val[0]);
    if (this_record) setProduct(...this_record);
    setOpenModal(true);
  };

  let delRecord = async (val) => {
    let record_id = val[0];
    let my_record = products.filter((item) => item.id === val[0])[0];

    let del_url = `${PRODUCTS_URL}delete/${record_id}`;
    let verify = window.confirm(`Are you sure you want to delete this record `);
    if (verify) {
      await axiosPrivate
        .post(del_url)
        .then((res) => {
          let patched_record = res.data;
          if (patched_record) {
            let new_records = UpdateTbData(my_record, products, true);
            setProducts(new_records);
            setOpenModal(false);
          }
        })
        .catch((err) => console.error(err));
    }
  };

  const breadcrumbs = [
    <Link href="/admin/" key="1" underline="hover">
      Dashboard
    </Link>,

    <Typography key="2" color="text.primary">
      Products
    </Typography>,
  ];

  return (
    <>
      <div className="page_header">
        <Typography variant={'h5'} component={'h5'} className="pagetitle">
          Products Page
        </Typography>
        <Appbreadcrumb breadcrumbs={breadcrumbs} />
      </div>
      <Divider light sx={{ mb: 2 }} className="divider" />

      <Grid container>
        <Grid item xs={12} sx={{ mb: 2 }}>
          <Button
            variant="outlined"
            sx={{ borderRadius: 28 }}
            onClick={() => {
              setProduct({});
              setOpenModal(true);
            }}
          >
            Add Product <Add fontSize="small" />
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Datatable
            tb_title="All Records"
            data={
              reshapedProducts && reshapedProducts.length > 0
                ? reshapedProducts
                : null
            }
            columns={data_columns}
            editRecord={editRecord}
            delRecord={delRecord}
          />
        </Grid>

        <Grid item xs={12}>
          <AppModal
            show={openModal}
            close={() => setOpenModal(false)}
            title={`Add | Edit Record`}
          >
            {errMsg ? (
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {errMsg}
              </Alert>
            ) : (
              ''
            )}
            <Appnormalform
              template={
                product && Object.keys(product).length === 0
                  ? form_template
                  : form_template_update
              }
              onSubmit={onSubmit}
              useForm={useForm}
              preloadValues={product}
            />
          </AppModal>
        </Grid>
      </Grid>
    </>
  );
}

export default Products;

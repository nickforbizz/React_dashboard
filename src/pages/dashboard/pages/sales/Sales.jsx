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

function Sales() {
  const [sales, setSales] = useState({});
  const [products, setProducts] = useState({});
  const [reshapedsales, setReshapedsales] = useState({});
  const [sale, setSale] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const [errMsg, setErrMsg] = useState('');

  const [openModal, setOpenModal] = useState(false);
  const SALES_URL_ALL = 'api/sales/all';
  const SALES_URL = 'api/sales/';
  const PRODUCT_URL = 'api/products/';

  useEffect(() => {
    let isMounted = true;
    let controller = new AbortController();
    const getSales = async () => {
      try {
        const res = await axiosPrivate.get(SALES_URL_ALL, {
          signal: controller.signal,
        });
        isMounted && setSales(res?.data?.data);

        setReshapedsales(ReshapeModelData(res?.data?.data, ['product']));
      } catch (err) {
        console.error(err);
        // navigate('/login', { state: { from: location }, replace: true });
      }
    };

    const getProducts = async () => {
      try {
        const res = await axiosPrivate.get(PRODUCT_URL, {
          signal: controller.signal,
        });
        isMounted && setProducts(res?.data?.data);
      } catch (err) {
        console.error(err);
        // navigate('/login', { state: { from: location }, replace: true });
      }
    };

    getSales();
    getProducts();

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
        title: 'Product',
        type: 'select',
        name: 'product_id',
        field_id: 'select_product_id',
        select_options: ReshapeSelectData(products, ['id', 'title']),
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
          { key: 1, value: 'Yes' },
          { key: 0, value: 'No' },
        ],
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
        title: 'Product',
        type: 'select',
        name: 'product_id',
        field_id: 'select_product_id',
        select_options: ReshapeSelectData(products, ['id', 'title']),
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
          { key: 1, value: 'Yes' },
          { key: 0, value: 'No' },
        ],
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
      name: 'product_title',
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
    console.log(data);
    const upsert_url = data?.id
      ? `${SALES_URL}update/${data?.id}`
      : `${SALES_URL}`;
    // console.log(data);
    await axiosPrivate
      .post(upsert_url, data)
      .then((res) => {
        let patched_record = res?.data?.data;
        if (patched_record) {
          let new_records = UpdateTbData(patched_record, sales);
          setSales(new_records);
          setOpenModal(false);
        }
      })
      .catch((err) => {
        let err_msg = err?.response?.data?.message || 'Fatal Error Occured';
        let err_status = err?.response?.status;
        setErrMsg(err_msg);
      });
  };

  let editRecord = (val) => {
    let myrecord = sales.filter((item) => item.id === val[0]);
    if (myrecord) setSale(...myrecord);
    setOpenModal(true);
  };

  let delRecord = async (val) => {
    let record_id = val[0];
    let myrecord = sales.filter((item) => item.id === val[0])[0];

    let del_url = `${SALES_URL}delete/${record_id}`;
    let verify = window.confirm(`Are you sure you want to delete this record `);
    if (verify) {
      await axiosPrivate
        .post(del_url)
        .then((res) => {
          let patched_record = res.data;
          if (patched_record) {
            let new_records = UpdateTbData(myrecord, sales, true);
            setSales(new_records);
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
      Sales
    </Typography>,
  ];

  return (
    <>
      <div className="page_header">
        <Typography variant={'h5'} component={'h5'} className="pagetitle">
          Sales Page
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
              setSale({});
              setOpenModal(true);
            }}
          >
            Add Record <Add fontSize="small" />
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Datatable
            tb_title="Active Records"
            data={
              reshapedsales && reshapedsales.length > 0
                ? reshapedsales
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
                sale && Object.keys(sale).length === 0
                  ? form_template
                  : form_template_update
              }
              onSubmit={onSubmit}
              useForm={useForm}
              preloadValues={sale}
            />
          </AppModal>
        </Grid>
      </Grid>
    </>
  );
}

export default Sales;

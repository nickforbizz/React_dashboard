import React from 'react';
import './datatable.scss';
import MUIDataTable from 'mui-datatables';
import { Delete, Edit } from '@mui/icons-material';
import { Paper } from '@mui/material';
import useAuth from '../hooks/useAuth';

function Datatable(props) {
  const { auth } = useAuth();
  let user = auth?.user;
  let is_admin = user?.is_admin;
  const default_columns = [
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
      name: 'name',
      label: 'Name',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'company',
      label: 'Company',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'city',
      label: 'City',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'state',
      label: 'State',
      options: {
        filter: true,
        sort: false,
      },
    },
  ];

  // console.log(prop.);

  const renderDeleteAction = (tableMeta) => {
    if (is_admin === 1) {
      return <Delete
      sx={{ cursor: 'pointer' }}
      className="text-danger"
      role="button"
      onClick={() => {
        let data = tableMeta.rowData.slice(1, -1);
        props.delRecord(data);
      }}
    />
    }
  }

  const actions = [
    {
      name: 'Actions',
      label: 'Actions',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div>
              <Edit
                sx={{ cursor: 'pointer', mr: 2 }}
                className="text-info"
                role="button"
                onClick={() => {
                  let data = tableMeta.rowData.slice(1, -1);
                  props.editRecord(data);
                }}
              />

              { renderDeleteAction(tableMeta) }
              
            </div>
          );
        },
      },
    },
  ];

  const default_data = [];

  let {
    tb_title,
    pagination = 10,
    columns = default_columns,
    data = default_data,
  } = props;
  
  data = !data ? default_data : data;
  columns = props.editRecord ? [...columns, ...actions] : columns;

  const options = {
    filterType: 'checkbox',
    selectableRows: 'none',
    responsive: 'vertical',
    rowsPerPage: pagination,
    MUIDataTableHeadCell: {
      toolButton: {
        justifyContent: 'left',
      },
    },
  };

  return (
    <Paper className="app_datatable">
      <MUIDataTable
        title={tb_title}
        data={data}
        columns={columns}
        options={options}
      />
    </Paper>
  );
}

export default Datatable;

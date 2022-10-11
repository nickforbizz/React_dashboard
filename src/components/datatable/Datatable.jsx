import React from 'react';
import './datatable.scss';
import MUIDataTable from 'mui-datatables';
import { Delete, Edit } from '@mui/icons-material';
import {  Paper } from '@mui/material';


function Datatable(props) {

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
                sx = {{cursor: 'pointer', mr:2}}
                className="text-info"
                role="button"
                onClick={() => {
                let data = tableMeta.rowData.slice(1, -1);;
                console.log(data);
                props.passedFunction(data)}}
              />

              <Delete
                sx = {{cursor: 'pointer'}}
                className="text-danger"
                role="button"
                onClick={() => console.log(value, tableMeta)}
              />
            </div>
          );
        },
      },
    },
  ]



  const default_data = [
    { name: 'Joe James', company: 'Test Corp', city: 'Yonkers', state: 'NY' },
    { name: 'John Walsh', company: 'Test Corp', city: 'Hartford', state: 'CT' },
    { name: 'Bob Herm', company: 'Test Corp', city: 'Tampa', state: 'FL' },
    { name: 'Nick Mwedwa', company: 'Edureca', city: 'Kimbo', state: 'FL' },
    {
      name: 'James Houston',
      company: 'Test Corp',
      city: 'Dallas',
      state: 'TX',
    },
  ];



  let { tb_title, pagination=10, columns=default_columns, data=default_data } = props;
  data = !data ? default_data : data;
  columns = [...columns, ...actions]; 



  const options = {
    filterType: 'checkbox',
    selectableRows: 'none',
    responsive: 'vertical',
    rowsPerPage:pagination,
    MUIDataTableHeadCell: {
      toolButton: {
        justifyContent: 'left'
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

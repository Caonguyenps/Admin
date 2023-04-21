import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';

export default function TableComponent(props) {
  return (
    <div style={{ height: 500, width: '100%', background: 'white' }}>
      <DataGrid
        rows={props?.rows}
        columns={props?.columns}
        pageSize={10}
        disableSelectionOnClick
        // selectionModel={selectionModel}
        // onSelectionModelChange={(newSelectionModel) => {
        //   setSelectionModel(newSelectionModel);
        // }}
        // onRowClick={(params, event) => {
        //   console.log(params.row);
        // }}
      />
    </div>
  );
}

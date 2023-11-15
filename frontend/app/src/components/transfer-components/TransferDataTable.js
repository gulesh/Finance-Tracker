import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const TransferDataTable = ({rows, columns, loading}) => {
    console.log("Columns:", columns);
    console.log("Rows:", rows);
    return (
      <div style={{ height: "100%", width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10, 15, 20]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </div>
    );
}

export default TransferDataTable;
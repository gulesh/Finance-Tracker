import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteConfirmationDialog from "../../utils/DeleteConfirmationDialog";
import { useNavigate } from "react-router-dom";

const TransferDataTable = ({rows, columns, loading}) => {
  const navigate = useNavigate();

  const handleDeleteRow = (id) => {
    console.log(id);
  }

  const redirectToEditTransfer = (transfer) => {
    navigate(`/transfers/edit/${transfer.id}`, {
      state: { transferData: transfer },
    });
    console.log(transfer.id);
  }
    
    // Add two new columns for delete and edit
  const extendedColumns = [
    ...columns,
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <>
          {/* <IconButton
            aria-label="delete"
            onClick={() => handleDeleteRow(params.row.id)}
          > */}
            <DeleteConfirmationDialog
              onConfirmDelete={handleDeleteRow}
              name={params.row.id}
              type="transfer"
            />
          {/* </IconButton> */}
          <IconButton
            aria-label="edit"
            onClick={() => redirectToEditTransfer(params.row)}
          >
            <EditIcon />
          </IconButton>
        </>
      ),
    },
  ];
    return (
      <div style={{ height: "100%", width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={extendedColumns}
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
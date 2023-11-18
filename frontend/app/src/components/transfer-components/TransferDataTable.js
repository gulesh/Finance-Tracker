import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteConfirmationDialog from "../../utils/DeleteConfirmationDialog";
import { useNavigate } from "react-router-dom";
import { useTransferQueries } from "../../queries/transferQueries"
import './transfers.css'

const TransferDataTable = ({rows, columns, loading}) => {
  const navigate = useNavigate();
  const { useDeleteTransferQuery } = useTransferQueries();
  const deleteTransferMutation = useDeleteTransferQuery();

  const handleConfirmDelete = (id) => {
    //check if id is not null
    if(id !== null)
    {
      deleteTransferById(id);
    }
    console.log(id);
  }

  const deleteTransferById = async (id) =>{
    try {
      const deletedTransfer = await deleteTransferMutation.mutateAsync(id);
      console.log(deletedTransfer);
    }
     catch (error) 
     {
      console.error("Error:", error);
      console.log("Server Response:", error.response);
     }
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
          <DeleteConfirmationDialog
            onConfirmDelete={handleConfirmDelete}
            name={params.row.id}
            type="transfer"
          />
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
      <div className="transfers">
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
            columns: {
              columnVisibilityModel: {
                id: false,
              },
            },
          }}
          pageSizeOptions={[10, 15, 20]}
          disableRowSelectionOnClick
        />
      </div>
    );
}

export default TransferDataTable;
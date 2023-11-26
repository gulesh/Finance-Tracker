import React, { useState, useEffect }from "react";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteConfirmationDialog from "../../utils/DeleteConfirmationDialog";
import { useNavigate } from "react-router-dom";
import { useCategoryQueries } from "../../queries/categoryQueries";

const CategoryDataTable = (props) => {
    const navigate = useNavigate();
    const categories = props.categorieslist;
    const sortedCategories = categories
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name));
    const [loading, setLoading] = useState(false);
    const { useDeleteCategoryQuery } = useCategoryQueries();
    const deleteCategoryMutation = useDeleteCategoryQuery();
    

    useEffect(() => {
      if (categories.length <= 0) {
        setLoading(true);
      } else {
        setLoading(false);
      }
    }, [categories]);

    const handleConfirmDelete = async (categoryName) => {
      //make the api call
      if (categoryName !== null) {
        deleteCategoryByName(categoryName);
      }
    };

    const deleteCategoryByName = async (name) => {
      try {
        const deletedCategory = await deleteCategoryMutation.mutateAsync(name);
        console.log(deletedCategory);
      } catch (error) {
        console.error("Error:", error);
        console.log("Server Response:", error.response);
      }
    };

    const redirectToEditCategory = (category) => {
      navigate(`/categories/edit/${category.id}`, {
        state: { categoryData: category },
      });
    };

    const columns = [
        { field: "id", headerName: "ID" },
        { field: "name", headerName: "Category Name", flex: 1 },
        { field: "amountAllocated", headerName: "Amount Allocated", flex: 1 },
        { field: "amountSpent", headerName: "Amount Spent", flex: 1 },
        { field: "recurring", headerName: "Recurring", flex: 1 }
    ];
    
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
              name={params.row.name}
              type="transfer"
            />
            <IconButton
              aria-label="edit"
              onClick={() => redirectToEditCategory(params.row)}
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
          rows={sortedCategories}
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
                    id: false
                }
            }
          }}
          pageSizeOptions={[10, 15, 20]}
          disableRowSelectionOnClick
        />
      </div>
    );
}

export default CategoryDataTable;
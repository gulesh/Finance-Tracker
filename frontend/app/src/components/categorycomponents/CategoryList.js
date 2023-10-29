import "./CategoryStyles.css";
import React from "react";
import "./CategoryStyles.css";
import { FiEdit  } from "react-icons/fi";
import DeleteConfirmationDialog from "../../utils/DeleteConfirmationDialog";
import { useNavigate } from "react-router-dom";
import { useCategoryQueries } from '../../queries/categoryQueries'

const CategoryList = (props) => {
  const navigate = useNavigate();
  const categories = props.categorieslist;
  const { useDeleteCategoryQuery } = useCategoryQueries();
  const deleteCategoryMutation = useDeleteCategoryQuery();

  const sortedCategories = categories.slice().sort((a, b) => a.name.localeCompare(b.name));

  const redirectToEditCategory = (category) => {
      navigate(`/categories/edit/${category.id}`, {
        state: { categoryData: category },
      });
  }

  const handleConfirmDelete = async ( categoryName ) => {
    //make the api call
    if (categoryName !== null) {
      deleteCategoryByName(categoryName);
    }
  };
  const deleteCategoryByName = async (name) =>{
    try
    {
      const deletedCategory = await deleteCategoryMutation.mutateAsync(name);
      console.log(deletedCategory);
    }
    catch (error)
    {
      console.error("Error:", error);
      console.log("Server Response:", error.response);
    }

  }

  return (
    <div>
      <table className="categories">
        <thead>
          <tr>
            <th> Category </th>
            <th> Amount Allocated ($)</th>
            <th> Amount Spent ($) </th>
            <th> Recurring </th>
          </tr>
        </thead>
        <tbody>
          {sortedCategories.map((row) => {
            let counter = 0;
            return (
              <tr key={row.id}>
                {Object.entries(row).map(
                  ([key, value]) =>
                    key !== "id" && (
                      <td key={row.id + counter++}>
                        {key === "recurring"
                          ? row[key]
                            ? "true"
                            : "false"
                          : row[key]}
                      </td>
                    )
                )}
                <td>
                  <button
                    onClick={() => {
                      redirectToEditCategory(row);
                    }}
                  >
                    <FiEdit />
                  </button>
                </td>
                <td>
                  <DeleteConfirmationDialog
                    onConfirmDelete={handleConfirmDelete}
                    name={row.name}
                    type="category"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryList;

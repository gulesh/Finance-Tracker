import "./CategoryStyles.css";
import React, { useContext } from "react";
import "./CategoryStyles.css";
import { FiEdit  } from "react-icons/fi";
import DeleteConfirmationDialog from "../../utils/DeleteConfirmationDialog";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MyContext from "../../MyContext";

const CategoryList = (props) => {
  const navigate = useNavigate();
  // const categories = props.categorieslist;
  const {categories, updateCategories} = useContext(MyContext);
  const sortedCategories = [...categories]
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name));

  const redirectToEditCategory = (category) => {
      navigate(`/categories/edit/${category.id}`, {
        state: { categoryData: category },
      });
  }

  const handleConfirmDelete = ( categoryName ) => {
    //make the api call
    if (categoryName !== null) {
      deleteCategoryByName(categoryName);
    }
  };

  // Function to delete a category by its ID
  const deleteCategoryByName = async (categoryName) => {
    const updatedCategories = categories.filter( (category) => category.name !== categoryName);
    updateCategories(updatedCategories);
    try {
      const response = await axios.delete(
        `http://localhost:8080/categories/${encodeURIComponent(categoryName)}`
      );
      if (response.status === 200) {
        console.log(`Successfully deleted category with name:  ${categoryName}`);
      }
    } catch (error) {
      console.error("Error deleting the category: " + error);
    }
  };

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

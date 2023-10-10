import "./CategoryStyles.css";
import React, { useContext } from "react";
import "./CategoryStyles.css";
import { FiEdit  } from "react-icons/fi";
import DeleteConfirmationDialog from "../categorycomponents/DeleteConfirmationDialog";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MyContext from "../../MyContext";

const CategoryList = (props) => {
  const navigate = useNavigate();
  let categories = props.categorieslist;
  const {updateCategories} = useContext(MyContext);

  const redirectToEditCategory = (category) => {
      navigate(`/categories/edit/${category.id}`, {
        state: { categoryData: category },
      });
  }

  const handleConfirmDelete = ( categoryName ) => {
    //make the api call
    if (categoryName !== null) {
      deleteCategoryById(categoryName);
    }
  };

  // Function to delete a category by its ID
  const deleteCategoryById = async (categoryName) => {
    categories = categories.filter( (category) => category.name !== categoryName);
    updateCategories(categories);
    try {
      const response = await axios.delete(
        `http://localhost:8080/categories/${encodeURIComponent(categoryName)}`
      );
      if (response.status === 200) {
        console.log(`Successfully deleted category with ID ${categoryName}`);
      }
    } catch (error) {
      console.error("Error deleting the category: " + error);
    }
    // deletion logic via API
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
          {categories.map((row) => {
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
                    {" "}
                    <FiEdit />
                  </button>
                </td>
                <td>
                  <DeleteConfirmationDialog
                    onConfirmDelete={handleConfirmDelete}
                    categoryName={row.name}
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

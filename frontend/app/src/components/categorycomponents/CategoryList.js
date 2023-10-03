import "./CategoryStyles.css";
import React, { useContext } from "react";
import MyContext from '../../MyContext';
import DeleteConfirmationDialog from "./DeleteConfirmationDialog"; // Import the confirmation dialog component
import "./CategoryStyles.css";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FiEdit  } from "react-icons/fi";

const CategoryList = () => {
    const { categories } = useContext(MyContext);

    const handleDeleteCategory = (categoryId) => {
    // Perform the deletion of the category with the given categoryId
    // You can use an API request or update the state to remove the category
    };

    const handleEditCategory = (categoryId) => {
      // Perform the deletion of the category with the given categoryId
      // You can use an API request or update the state to remove the category
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
                    className="edit-category-button"
                    onClick={() => handleEditCategory(row.id)}
                  >
                    <FiEdit />
                  </button>
                </td>
                <td>
                  <DeleteConfirmationDialog
                    onConfirmDelete={() => handleDeleteCategory(row.id)}
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

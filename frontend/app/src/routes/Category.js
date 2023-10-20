import React, { useState } from "react";
import CategoryList from "../components/categorycomponents/CategoryList";
import "../components/categorycomponents/CategoryStyles.css";
import PageTitle from "../components/general/PageTitle";

import AddCategory from "../components/forms/AddCategory";

const Category = ({categories}) => {
  const [isAddCategoryFormVisible, setIsAddCategoryFormVisible] =
    useState(true);

  const handleAddCateforyFormVisibility = () => {
    setIsAddCategoryFormVisible(!isAddCategoryFormVisible);
  };

  return (
    <div className="">
      <div className="page-header">
        <div className="page-header-content">
          <PageTitle title="Categories" />
          <button
            onClick={handleAddCateforyFormVisibility}
            className="toggle-button-add-item"
          >
            {isAddCategoryFormVisible ? "▲" : "▼"}
          </button>
        </div>
      </div>
      <div className="">
        {isAddCategoryFormVisible && <AddCategory />}
        <CategoryList categorieslist={categories} />
      </div>
    </div>
  );
};

export default Category;

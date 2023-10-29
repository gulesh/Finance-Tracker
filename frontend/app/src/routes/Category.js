import React, { useState } from "react";
import CategoryList from "../components/categorycomponents/CategoryList";
import "../components/categorycomponents/CategoryStyles.css";
import PageTitle from "../components/general/PageTitle";
import { useCategoryQueries } from "../queries/categoryQueries";

import AddCategory from "../components/forms/AddCategory";

const Category = () => {
  const [isAddCategoryFormVisible, setIsAddCategoryFormVisible] =
    useState(false);

  const handleAddCateforyFormVisibility = () => {
    setIsAddCategoryFormVisible(!isAddCategoryFormVisible);
  };

  const { useGetCategoriesQuery } = useCategoryQueries(); //get the query
  const {isLoading, data: categories, isError} = useGetCategoriesQuery();

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
        {isLoading && <p> Loading... </p>}
        {isError && <p> Error loading </p>}
        {categories && <CategoryList categorieslist={categories} />}
      </div>
    </div>
  );
};

export default Category;

import React, { useState } from "react";
import NewCategoryForm from "../components/categorycomponents/AddNewCategoryForm";
import CategoryList from "../components/categorycomponents/CategoryList";
import '../components/categorycomponents/CategoryStyles.css'
import PageTitle from '../components/general/PageTitle'

const Category = () => {
  const [isAddCategoryFormVisible, setIsAddCategoryFormVisible] = useState(true);

  const handleAddCateforyFormVisibility = () => {
    setIsAddCategoryFormVisible(!isAddCategoryFormVisible);
  };

  return (
    <div className="">
      <div className="category-header">
        <div className="category-header-content">
          <PageTitle title="Categories" />
          <button
            onClick={handleAddCateforyFormVisibility}
            className="toggle-button-category"
          >
            {isAddCategoryFormVisible ? "▲" : "▼"}
          </button>
        </div>
      </div>
      <div className="">
        {isAddCategoryFormVisible && <NewCategoryForm />}
        <CategoryList />
      </div>
    </div>
  );
}

export default Category;
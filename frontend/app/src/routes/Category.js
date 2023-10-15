import React, { useState, useContext, useEffect } from "react";
import CategoryList from "../components/categorycomponents/CategoryList";
import "../components/categorycomponents/CategoryStyles.css";
import PageTitle from "../components/general/PageTitle";
import MyContext from "../MyContext";
import axios from "axios";
import AddCategory from "../components/forms/AddCategory";

const Category = () => {
  const [isAddCategoryFormVisible, setIsAddCategoryFormVisible] = useState(true);
  const { categories, updateCategories } = useContext(MyContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/categories/");
        const categoriesData = response.data;
        updateCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();

  }, [updateCategories]);

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
        {isAddCategoryFormVisible && <AddCategory />}
        <CategoryList categorieslist={categories} />
      </div>
    </div>
  );
};

export default Category;

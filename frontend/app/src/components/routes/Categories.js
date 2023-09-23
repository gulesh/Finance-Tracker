import React, { useContext, useState } from "react";
import "../styles/Categories.css";
import "../styles/AddCategories.css"; 
import List from "../UI/List";
import TableTitle from "../UI/TableTitle";
import AddCategory from "../UI/AddCategory";
import FetchData from "../../utils/FetchData";
import { MyContext } from "../../MyContext";


const CategoriesList = () => {
  //states
  const { categories, updateCategories } = useContext(MyContext);
  const [columns, setColumns] = useState([]);
  const [fetchingData, setFetchingData] = useState(true);

  // Get the current route
  // const location = useLocation();
  // const currentRoute = location.pathname;


  const handleDataFetch = ({ data, fetchState }) => {
    // console.log(currentRoute);
    updateCategories(data);
    setColumns(Object.keys(data[0]));
    setFetchingData(fetchState);
  };

  return (
    <>
      <div className="split-categoriespage">
        <div className="left-side">
          <TableTitle title="List of Expenses" />
          <div className="coniatner">
            <div className="table-container">
              {/* {currentRoute === "/categories" && ( */}
                <FetchData
                  sendDataToParent={handleDataFetch}
                  apiFromParent="http://localhost:8080/categories/"
                  fetchState={fetchingData}
                />
              {/* )} */}
              <List
                data={categories}
                columnHeadings={columns}
                title="List of Categories"
              />
            </div>
          </div>
        </div>
        <div className="right-side">
          <div className="right-container">
            <div className="category-form">
              {/* 2/3 of the right-side. Content for the category-form */}
              <div>
                <h2> Add New User </h2>
              </div>
              <AddCategory></AddCategory>
            </div>
            <div className="graph"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoriesList;

import React, { useContext, useState } from "react";
import "../components/styles/Categories.css";
import "../components/styles/AddCategories.css"; 
import "../components/styles/ExpenseDate.css"; 
import List from "../components/UI/List";
import TableTitle from "../components/UI/TableTitle";
import AddCategory from "../components/UI/AddCategory";
import FetchData from "../utils/FetchData";
import { MyContext } from "../MyContext";


const CategoriesList = () => {
  //states
  const { categories, updateCategories } = useContext(MyContext);
  const [columns, setColumns] = useState([]);
  const [fetchingData, setFetchingData] = useState(true);
  //setting filters
  const [filter, setFilter] = useState("All");

  // Get the current route
  // const location = useLocation();
  // const currentRoute = location.pathname;

  //defining a filter map
  const FILTER_MAP = {
    All: () => true,
    Recurring: (category) => category.recurring, 
    NotRecurring: (category) => !category.recurring

  }

  //filter names
  const FILTER_NAMES = Object.keys(FILTER_MAP);

  const filterList = FILTER_NAMES.map((name) => (
    <button
      key={name}
      className="filter-button box"
      aria-pressed={name === filter}
      onClick={() => setFilter(name)}
    >
      {" "}
      {name}{" "}
    </button>
  ));

  //filtered categories
  const filteredCategories = categories.filter(FILTER_MAP[filter]);

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
          <TableTitle title="List of Expenses" className="box" />
          <div className="card">
            <div className="table-container">
              {/* {currentRoute === "/categories" && ( */}
              <FetchData
                sendDataToParent={handleDataFetch}
                apiFromParent="http://localhost:8080/categories/"
                fetchState={fetchingData}
              />
              {/* )} */}
              <List
                data={filteredCategories}
                columnHeadings={columns}
                title="List of Categories"
              />
            </div>
          </div>
        </div>
        <div className="right-side">
          <div className="right-container">
            <div className="container">{filterList}</div>
            <div className="category-form">
              {/* 2/3 of the right-side. Content for the category-form */}
              <div className="expense-date">
                <h2> Add New Category </h2>
              </div>
              <AddCategory />
            </div>
            <div className="graph"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoriesList;

import React,  { useState} from "react";
import { AiOutlineSave } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { validateInput } from "./ValidateCategoryInput";

const EditCategoryForm = () => {
  const { categoryId } = useParams(); // needed when making the patch request or may be not
  const location = useLocation();
  const navigate = useNavigate();
  const [editedData, setEditedData] = useState({}); //key -> value pairs
  const [categoryData, setCategoryData] = useState(location.state.categoryData);
  const [disabled, setDisabled] = useState(true); // Use diabled for button state here

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    if (name === "recurring") {
      setEditedData({
        ...editedData,
        recurring: value === "true", // Convert the value to a boolean
      });
      setCategoryData({
        ...categoryData,
        recurring: value === "true",
      });
    } 
    else 
    {
      setEditedData({
        ...editedData,
        [name]: value,
      });
      setCategoryData({
        ...categoryData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(categoryData);
    console.log(editedData);
    //validate the data here 
    const isValidInput = validateInput(editedData);
    setDisabled(!isValidInput); 
    //make the patch request here and redirect to previous path
    if (isValidInput)
    {
      EditData(editedData);
      // Redirect to the previous page
      navigate(-1);
    } 
    
  };

  const EditData = async (data) => {

    try{
      
      const response = await axios.patch(
          `http://localhost:8080/categories/${encodeURIComponent(categoryId)}`,
          data
      );
      console.log("server response is: " + response.status);
    }
    catch(error) {
      console.error("Error:" + error);
    }

  };

  const handleCancel = () => {
    // Redirect to the previous page
    navigate(-1);
  }

  return (
    <div className="edit-dialog">
      <form className="form-category" onSubmit={handleSubmit}>
        <div className="input-group-category">
          <p>
            <label htmlFor="category-name">Category Name </label>
            <input
              type="text"
              id="category-name"
              name="name"
              value={categoryData.name}
              onChange={handleChange}
            />
          </p>
          <p>
            <label htmlFor="category-amountallocated">Ammount Allocated</label>
            <input
              type="number"
              id="category-amountallocated"
              name="amountAllocated"
              value={categoryData.amountAllocated}
              onChange={handleChange}
            />
          </p>
        </div>
        <div className="input-group-category">
          <p>
            <label htmlFor="category-amountspent">Amount Spent </label>
            <input
              type="number"
              id="category-amountspent"
              name="amountSpent"
              value={categoryData.amountSpent}
              onChange={handleChange}
            />
          </p>
          <p>
            <label htmlFor="category-recurring">Recurring (Monthly)</label>
            <select
              id="category-recurring"
              style={{ display: "block" }}
              className="select-field"
              value={categoryData.recurring}
              name="recurring"
              onChange={handleChange}
            >
              <option value="true"> True </option>
              <option value="false"> False </option>
            </select>
          </p>
        </div>
        <p>
          <button type="submit" disabled={disabled}>
            <AiOutlineSave />
          </button>
          <button onClick={handleCancel}>
            <RxCross1 />
          </button>
        </p>
      </form>
    </div>
  );
};

export default EditCategoryForm;

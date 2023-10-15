import React, { useRef, useState } from "react";
import './CategoryStyles.css'
import axios from "axios";
import { validateInput } from "./ValidateCategoryInput";

const NewCategoryForm = ( ) => {
  // Create refs to access form field values
  const categoryNameRef = useRef(null);
  const amountAllocatedRef = useRef(null);
  const amountSpentRef = useRef(null);
  const recurringRef = useRef(null);
  const [isValidInput, setIsValidInput] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const name = categoryNameRef.current.value;
    const amountAllocated = amountAllocatedRef.current.value;
    const amountSpent = amountSpentRef.current.value;
    const recurring = recurringRef.current.value === "true"; // Convert the value to a boolean
    
    const formData = {
      name,
      amountAllocated,
      amountSpent,
      recurring,
    };

    const inputIsValid = validateInput(formData);
    setIsValidInput(inputIsValid);
    // Get form field values using refs
    if (inputIsValid) {
      postCategory(formData);
    }
    
  }

  const postCategory = async (data) => {

    try {

      const response = await axios.post("http://localhost:8080/categories/", data);
      if( response.status === 200)
      {
        console.log("Category added successfully!")
        setIsValidInput(true);
      } 
      else 
      {
        console.error("Failed to add category");
      }

    }
    catch (error)
    {
      console.error("Error:", error);
      console.log("Server Response:", error.response); 
    }
  }

  return (
    <div>
      <form className="form-category" onSubmit={handleSubmit}>
        <div className="input-group-category">
          <p>
            <label htmlFor="category-name">Category Name </label>
            <input
              id="category-name"
              type="text"
              className="input-field"
              ref={categoryNameRef}
            />
          </p>
          <p>
            <label htmlFor="category-amountallocated">Ammount Allocated</label>
            <input
              id="category-amountallocated"
              className="input-field"
              type="Number"
              ref={amountAllocatedRef}
            />
          </p>
        </div>
        <div className="input-group-category">
          <p>
            <label htmlFor="category-amountspent"> Amount Spent </label>
            <input
              id="category-amountspent"
              className="input-field"
              type="Number"
              ref={amountSpentRef}
            />
          </p>
          <p>
            <label htmlFor="category-recurring">Recurring (Monthly)</label>
            <select
              id="category-recurring"
              className="select-field"
              style={{ display: "block" }}
              ref={recurringRef}
            >
              <option value="true"> True </option>
              <option value="false"> False </option>
            </select>
          </p>
        </div>
        <p className="actions">
          <button type="reset" className="buttonAlt">
            Reset
          </button>
          <button type="submit" className="button" disabled={!isValidInput}>
            Add Category
          </button>
        </p>
      </form>
    </div>
  );
}

export default NewCategoryForm;
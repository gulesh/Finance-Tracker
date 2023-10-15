import React, { useRef } from "react";
import './AddFormStyles.css'
import useForm from '../../utils/useForm'
import CategoryFormObject from './CategoryFormObject'
import axios from "axios";

const AddCategory= () =>{
   
  const { renderFormInputs, isFormValid, form } = useForm(CategoryFormObject);
  const recurringRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const recurring = recurringRef.current.value === "true"; // Convert the value to a boolean

    const formData = {
      name: form.name.value,
      amountAllocated: form.amountAllocated.value,
      amountSpent: form.amountSpent.value,
      recurring
    };
    console.log(formData)
    postCategory(formData);

  };
  const postCategory = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/categories/",
        data
      );
      if (response.status === 200) {
        console.log("Category added successfully!");
      }
    } catch (error) {
      console.error("Error:", error);
      console.log("Server Response:", error.response);
    }
  };

  return (
    <form className="form-category" onSubmit={handleSubmit}>
      <h1> Add Category </h1>
      {renderFormInputs()}
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
      <button disabled={!isFormValid()}> Submit </button>
      {console.log("isFormValid() value: ", isFormValid())}
    </form>
  );
}

export default AddCategory;





   

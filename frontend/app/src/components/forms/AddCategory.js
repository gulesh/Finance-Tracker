import React, { useRef, useContext } from "react";
import './AddFormStyles.css'
import useForm from '../../utils/useForm'
import getCategoryFormObject from './CategoryFormObject'
import axios from "axios";
import MyContext from "../../MyContext";

const AddCategory= () =>{
  const CategoryObject = getCategoryFormObject({});
  const { renderFormInputs, isFormValid, form, resetForm} = useForm(CategoryObject);
  const { categories, updateCategories } = useContext(MyContext);
  // const [formIsValid, setFormIsValid] = useState(isFormValid());

  const recurringRef = useRef(null);
  const formRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const recurring = recurringRef.current.value === "true"; // Convert the value to a boolean

    const formData = {
      name: form.name.value,
      amountAllocated: form.amountAllocated.value,
      amountSpent: form.amountSpent.value,
      recurring,
    };
    postCategory(formData);
    resetForm();
  };

  const postCategory = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/categories/",
        data
      );
      console.log(response);
      if (response.status === 201) {
        //update the categories
        const newCat = response.data;
        updateCategories([...categories, newCat]); // Pass a new array with the updated categories
        console.log("Category created successfully!");
      }
      console.log("respose is success");
    } catch (error) {
      console.error("Error:", error);
      console.log("Server Response:", error.response);
    }
  };

  return (
    <form className="form-category" onSubmit={handleSubmit} ref={formRef}>
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
      <button type="submit" disabled={!isFormValid()}>
        Submit
      </button>
    </form>
  );
}

export default AddCategory;





   

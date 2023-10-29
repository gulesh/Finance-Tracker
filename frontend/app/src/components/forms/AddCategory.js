import React, { useRef } from "react";
import './AddFormStyles.css'
import useForm from '../../utils/useForm'
import getCategoryFormObject from './CategoryFormObject'
import { useCategoryQueries } from '../../queries/categoryQueries'

const AddCategory= () =>{
  const CategoryObject = getCategoryFormObject({});
  const { renderFormInputs, isFormValid, form, resetForm} = useForm(CategoryObject);
  const { useAddCategoryQuery } = useCategoryQueries();
  const addCategoryMutation = useAddCategoryQuery();

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
    formRef.current.reset();
  };

  const postCategory = async (data) => {
    try {
      const addedCategory = await addCategoryMutation.mutateAsync(data)
      console.log(addedCategory);
    } catch (error) {
      console.error("Error:", error);
      console.log("Server Response:", error.response);
    }
  };

  return (
    <form className="form-general" onSubmit={handleSubmit} ref={formRef}>
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
      <button
        type="submit"
        disabled={!isFormValid() || addCategoryMutation.isLoading}
      >
        Submit
      </button>
    </form>
  );
}

export default AddCategory;





   

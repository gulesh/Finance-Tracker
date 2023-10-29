import React, { useState, useEffect, useCallback } from "react";
import getCategoryFormObject from "./CategoryFormObject";
import useForm from "../../utils/useForm";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSave } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { useCategoryQueries } from "../../queries/categoryQueries";

const EditCategory = () => {
  const { categoryId } = useParams(); // needed when making the patch request or may be not
  const location = useLocation();
  const navigate = useNavigate();
  const categoryData = location.state.categoryData;
  const { useEditCategoryQuery } = useCategoryQueries();
  const editCategoryMutation = useEditCategoryQuery();

  //set autofill values
  const defaultValues = {
    name: categoryData.name,
    amountAllocated: categoryData.amountAllocated,
    amountSpent: categoryData.amountSpent,
  };

  const [editedData, setEditedData] = useState({}); //key -> value pairs
  const CategoryObject = getCategoryFormObject(defaultValues);
  const { renderFormInputs, isFormValid, isInputFieldValid, form } = useForm(CategoryObject);

  const [isFormEdited, setIsFormEdited] = useState(false);

  //we know initially all values are valid so use this in the start
  function initialFormValidation() {
    Object.values(form).forEach((inputField) => {
      let valid = isInputFieldValid(inputField);
      inputField.valid = valid;
    });
    return true;
  }

  initialFormValidation(); //call to set the values to true
  
  //to update the values in the edited form
  const updateFormData = useCallback((formData)=> {
    for (const key in formData) {
      //if the form values is different than previously added data
      if (
        formData.hasOwnProperty(key) &&
        categoryData[key] !== formData[key].value
      ) {
        const value = formData[key].value;
        if (!isNaN(value)) {
          editedData[key] = Number(formData[key].value);
        } else {
          editedData[key] = value;
        }
        setIsFormEdited(true);
      }
    }
    
  }, [categoryData, editedData]);

  useEffect(() => {
    updateFormData(form);
  }, [form, updateFormData]);


  const handleSubmit = (event) => {
    event.preventDefault();
    //check if all the values in editeddata matched categorydata
    let validChange = true;
    for (const key in editedData) {
      if (editedData[key] === categoryData[key]) {
        validChange = false;
        break;
      }
    }
    //make a server call if the data changed
    if(validChange)
    {
      EditData(editedData);
      setIsFormEdited(false);
    }
    navigate(-1);
  };

  const handleCancel = () => {
    // Redirect to the previous page
    navigate(-1);
  };

  const EditData = async (data) => {
    try 
    {
      const editedCategory = await editCategoryMutation.mutateAsync({data:data, id:categoryId});
      console.log(editedCategory);
      
    } catch (error) {
      console.error("Error:" + error);
    }
  };

  const handleChangeForRecurring = (e) => {
    const { name, value } = e.target;
    setEditedData({
      ...editedData,
      [name]: value === "true",
    });
    setIsFormEdited(true); //set the editedForm to true
  };

  return (
    <form className="form-category" onSubmit={handleSubmit}>
      <h1> Edit Category </h1>
      {renderFormInputs()}
      <p>
        <label htmlFor="category-recurring">Recurring (Monthly)</label>
        <select
          id="category-recurring"
          className="select-field"
          style={{ display: "block" }}
          value={isFormEdited ? editedData.recurring : categoryData.recurring} //conditional rendering
          onChange={handleChangeForRecurring}
          name="recurring"
        >
          <option value="true"> True </option>
          <option value="false"> False </option>
        </select>
      </p>
      <button type="submit" disabled={!isFormEdited || !isFormValid()}>
        <AiOutlineSave />
      </button>
      <button onClick={handleCancel}>
        <RxCross1 />
      </button>
    </form>
  );
};

export default EditCategory;

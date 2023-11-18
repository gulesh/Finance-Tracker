import React, { useState, useEffect, useCallback} from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import getExpenseFormObject from './ExpenseFormObject';
import useForm from "../../utils/useForm";
import { AiOutlineSave } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import DropDown from "../general/DropDown";
import { useExpenseQueries } from "../../queries/expenseQueries";
import { useAccountQueries } from "../../queries/accountQueries";
import { useCategoryQueries } from "../../queries/categoryQueries";

const EditExpense = ()=>{
  const { expenseId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const expenseData = location.state.expenseData;

  const { useEditExpenseQuery } = useExpenseQueries();
  const editExpenseMutation = useEditExpenseQuery();

  //fetch using React Query
  const { useGetAccountsQuery } = useAccountQueries();
  const { useGetCategoriesQuery } = useCategoryQueries();

  const { data: accounts, isErrorAcct} = useGetAccountsQuery();
  const { data: categories, isErrorCat } = useGetCategoriesQuery();

  const [isFormEdited, setIsFormEdited] = useState(false);

  const defaultValues = {
    details: expenseData.details,
    amount: expenseData.amount,
    date: expenseData.date,
    description: expenseData.description,
  };

  const [editedData, setEditedData] = useState({
    category: { name: "" },
    account: { name: "" },
  });

  const expenseObject = getExpenseFormObject(defaultValues);
  const { renderFormInputs, isFormValid, isInputFieldValid, form } =
    useForm(expenseObject);

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
  const updateFormData = useCallback(
    (formData) => {
      for (const key in formData) {
        //if the form values is different than previously added data
        if (expenseData[key] !== formData[key].value) {
          const value = formData[key].value;
          if (!isNaN(value)) {
            editedData[key] = Number(formData[key].value);
          } else {
            editedData[key] = value;
          }
          setIsFormEdited(true);
        }
      }
    },
    [expenseData, editedData]
  );

  useEffect(() => {
    updateFormData(form);
  }, [form, isFormEdited, updateFormData]);

  //handle submit
  const handleSubmit = (event) => {
    event.preventDefault();
    if (editedData.account && editedData.account.name === "")
      delete editedData.account;
    if (editedData.category && editedData.category.name === "")
      delete editedData.category;
    let nochange = true;
    for (const key in editedData) {
      if (
        (key === "category" || key === "account") &&
        editedData[key].name !== expenseData[key].name
      ) {
        nochange = false;
        break;
      } else if (editedData[key] !== expenseData[key]) {
        nochange = false;
        break;
      }
    }
    //make a server call if the data changed
    if (!nochange) {
      EditData(editedData);
      console.log(editedData);
      setIsFormEdited(false);
    }
    console.log(editedData);
    navigate(-1);
  };

  const handleCancel = () => {
    // Redirect to the previous page
    navigate(-1);
  };

  const EditData = async (data) => {
    try {
      const editedExpense = await editExpenseMutation.mutateAsync({
        data: data,
        id: expenseId,
      });
      console.log(editedExpense);
    } catch (error) {
      console.error("Error:" + error);
    }
  };

  const handleCategoryNameChange = (value) => {
    setEditedData((prevData) => ({
      ...prevData,
      category: { name: value },
    }));
    setIsFormEdited(true);
  };

  const handleAccountNameChange = (value) =>{
    setEditedData((prevData) => ({
      ...prevData,
      account: { name: value },
    }));
    setIsFormEdited(true);
  };

  return (
    <form className="form-general" onSubmit={handleSubmit}>
      <h1>Edit Expense</h1>
      <DropDown
        data={!isErrorCat && categories}
        title="Category Name"
        onValueChange={handleCategoryNameChange}
        defaultValue={
          editedData.category && editedData.category.name !== ""
            ? editedData.category.name
            : expenseData.category.name
        }
      />
      <DropDown
        data={!isErrorAcct && accounts}
        title="Account Name"
        onValueChange={handleAccountNameChange}
        defaultValue={
          editedData.account && editedData.account.name !== ""
            ? editedData.account.name
            : expenseData.account.name
        }
      />
      {renderFormInputs()}
      <button type="submit" disabled={!isFormEdited || !isFormValid()}>
        <AiOutlineSave />
      </button>
      <button onClick={handleCancel}>
        <RxCross1 />
      </button>
    </form>
  );
}

export default EditExpense;
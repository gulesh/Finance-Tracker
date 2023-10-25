import React, { useContext, useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import MyContext from '../../MyContext';
import getExpenseFormObject from './ExpenseFormObject';
import useForm from "../../utils/useForm";
import { AiOutlineSave } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";

const EditExpense = (props)=>{
  const { expenseId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const expenseData = location.state.expenseData;
  const categories = props.categories;
  const accounts = props.accounts;

  const { expenses, updateExpenses } = useContext(MyContext);
  const [isFormEdited, setIsFormEdited] = useState(false);

  const defaultValues = {
    details: expenseData.details,
    amount: expenseData.amount,
    date: expenseData.date,
    description: expenseData.description,
  };

  const [editedData, setEditedData] = useState({
    category: {name: ""},
    account: {name: ""}
  });

  
  const expenseObject = getExpenseFormObject(defaultValues);
  const { renderFormInputs, isFormValid, isInputFieldValid, form } = useForm(expenseObject);

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
        if ( expenseData[key] !== formData[key].value ) {
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
    if (editedData.account && editedData.account.name === "") delete editedData.account;
    if (editedData.category && editedData.category.name === "") delete editedData.category;
    let nochange = false;
    for (const key in editedData) {
      if (
        (key === "category" || key === "account") &&
        editedData[key].name === expenseData[key].name
      ) {
        nochange = true;
        break;
      } else if (editedData[key] === expenseData[key]) {
        nochange = true;
        break;
      }
    }
    //make a server call if the data changed
    if (!nochange) {
      EditData(editedData);
      setIsFormEdited(false);
    }
    console.log(editedData);
    navigate(-1);
  };

  const handleCancel = () => {
    // Redirect to the previous page
    navigate(-1);
  };

  const EditData = async ( data ) =>{
    try
    {
        const response = await axios.patch(
          `http://localhost:8080/expenses/${encodeURIComponent(expenseId)}`,
          data
        );
        if (response.status === 200) {
            console.log("Expense edited successfully!");
            const updatedExpenses = expenses.map((expense) =>
              expense.id === expenseId ? response.data : expense
            );
            updateExpenses(updatedExpenses);
        }
        else{
            console.error("Failed to edit expense");
        }
    }
    catch(error)
    {
        console.error("Error:" + error);
    }

  }

  const handleChangeForDropDowns = (e) => {
    const { name, value } = e.target;

    setEditedData({
      ...editedData,
      [name]: { "name": value },
    });
    
    setIsFormEdited(true);
  };

  return (
    <form className="form-category" onSubmit={handleSubmit}>
      <h1>Edit Expense</h1>
      <p>
        <label htmlFor="category-expense">Expense Category</label>
        <select
          id="category-expense"
          className="select-field"
          style={{ display: "block" }}
          onChange={handleChangeForDropDowns}
          value={
            editedData.category && editedData.category.name !== ""
              ? editedData.category.name
              : expenseData.category.name
          }
          name="category"
        >
          {Object.values(categories).map((category) => (
            <option key={category.name} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </p>
      <p>
        <label htmlFor="account-expense">Expense Account</label>
        <select
          id="account-expense"
          className="select-field"
          style={{ display: "block" }}
          onChange={handleChangeForDropDowns}
          value={
            editedData.account && editedData.account.name !== ""
              ? editedData.account.name
              : expenseData.account.name
          }
          name="account"
        >
          {Object.values(accounts).map((account) => (
            <option key={account.name} value={account.name}>
              {account.name}
            </option>
          ))}
        </select>
      </p>
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
import React, { useContext, useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import MyContext from '../../MyContext';
import getExpenseFormObject from './ExpenseFormObject';
import useForm from "../../utils/useForm";
import { AiOutlineSave } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";

const EditExpense = (props)=>{
  const { ExpenseId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const expenseData = location.state.expenseData;
  const categories = props.categories;
  const accounts = props.accounts;

  const { expenses, updateExpenses } = useContext(MyContext);
  const [isFormEdited, setIsFormEdited] = useState(false);

  console.log(expenseData);

  const defaultValues = {
    details: expenseData.details,
    amount: expenseData.amount,
    date: expenseData.date,
    description: expenseData.description,
  };

  const [editedData, setEditedData] = useState({
    // Initialize with the initial category and account names
    category: { name: expenseData.category.name },
    account: { name: expenseData.account.name },
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
        if (
          formData.hasOwnProperty(key) &&
          expenseData[key] !== formData[key].value
        ) {
          const value = formData[key].value;
          if (!isNaN(value)) {
            editedData[key] = Number(formData[key].value);
          } else {
            editedData[key] = value;
          }
          console.log("true");
          setIsFormEdited(true);
        }
      }
    },
    [expenseData, editedData]
  );

    useEffect(() => {
        console.log("is " + isFormEdited);
        updateFormData(form);
    }, [form, isFormEdited, updateFormData]);

  //handle submit
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(editedData);
  };

  const handleCancel = () => {
    // Redirect to the previous page
    navigate(-1);
  };

  const handleChangeForDropDowns = (e) => {
    const { name, value } = e.target;

    setEditedData({
      ...editedData,
      [name]: { name: value },
    });
    console.log("here");
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
          value={editedData.category.name}
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
          value={editedData.account.name}
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
      <button onClick={handleCancel}>
        <RxCross1 />
      </button>
      <button type="submit" disabled={!isFormEdited || !isFormValid()}>
        <AiOutlineSave />
      </button>
      {console.log("valid: " + isFormValid())}
    </form>
  );
}

export default EditExpense;
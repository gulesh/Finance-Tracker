import React, {  useRef } from "react";
import "./AddFormStyles.css";
import useForm from "../../utils/useForm";
import getExpenseFormObject from "./ExpenseFormObject";
import { useExpenseQueries } from '../../queries/expenseQueries'
import DropDown from '../general/DropDown';


const AddExpense= (props) => {
  const categories = props.categories;
  const accounts = props.accounts;
  const expenseObject = getExpenseFormObject({});
  const { renderFormInputs, isFormValid, form, resetForm } = useForm(expenseObject);
  const { useAddExpenseQuery } = useExpenseQueries();
  const addExpenseMutation = useAddExpenseQuery();

  const categoryRef = useRef(null);
  const accountRef = useRef(null);
  const formRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      category: { name: categoryRef.current },
      account: { name: accountRef.current },
      amount: form.amount.value,
      date: form.date.value,
      details: form.details.value,
      description: form.description.value,
    };
    console.log(formData);
    postExpense(formData);
    resetForm();
    categoryRef.current = "";
    accountRef.current = "";
    formRef.current.reset();
  };

  const postExpense = async (data) => {
    try 
    {
      const addedExpense = await addExpenseMutation.mutateAsync(data);
      console.log(addedExpense);
      
    } catch (error) {
      console.error("Error:", error);
      console.log("Server Response:", error.response);
    }
  };

  const handleCategoryValue = (value) => {
    categoryRef.current = value;
  }

  const handleAccountValue = (value) => {
    accountRef.current = value;
  };

  return (
    <form className="form-general" ref={formRef} onSubmit={handleSubmit}>
      <h1>Add Expense</h1>
      <DropDown
        data={categories}
        title="Category Name"
        onValueChange={handleCategoryValue}
        defaultValue={categoryRef && categoryRef.current}
      />
      <DropDown
        data={accounts}
        title="Account Name"
        onValueChange={handleAccountValue}
        defaultValue={accountRef && accountRef.current}
      />
      {renderFormInputs()}
      <button disabled={!isFormValid() || addExpenseMutation.isLoading}>
        Submit
      </button>
    </form>
  );
}

export default AddExpense;
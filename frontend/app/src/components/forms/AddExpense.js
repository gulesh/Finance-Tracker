import React, {  useRef } from "react";
import "./AddFormStyles.css";
import useForm from "../../utils/useForm";
import getExpenseFormObject from "./ExpenseFormObject";
import { useExpenseQueries } from '../../queries/expenseQueries'


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
      category: { name: categoryRef.current.value },
      account: { name: accountRef.current.value },
      amount: form.amount.value,
      date: form.date.value,
      details: form.details.value,
      description: form.description.value,
    };
    console.log(formData);
    postExpense(formData);
    resetForm();
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

  return (
    <form className="form-general" ref={formRef} onSubmit={handleSubmit}>
      <h1>Add Expense</h1>
      <p>
        <label htmlFor="category-recurring">Expense Category</label>
        <select
          id="category-expense"
          className="select-field"
          style={{ display: "block" }}
          ref={categoryRef}
        >
          {Object.values(categories).map((category) => (
            <option key={category.name} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </p>
      <p>
        <label htmlFor="account-recurring">Expense Account</label>
        <select
          id="account-expense"
          className="select-field"
          style={{ display: "block" }}
          ref={accountRef}
        >
          {Object.values(accounts).map((account) => (
            <option key={account.name} value={account.name}>
              {account.name}
            </option>
          ))}
        </select>
      </p>
      {renderFormInputs()}
      <button disabled={!isFormValid() || addExpenseMutation.isLoading}>
        Submit
      </button>
    </form>
  );
}

export default AddExpense;
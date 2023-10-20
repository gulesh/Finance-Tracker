import React, { useRef } from "react";
import "./AddFormStyles.css";
import useForm from "../../utils/useForm";
import ExpenseFormObject from "./ExpenseFormObject";


const AddExpense= (props) => {
    const categories = props.categories;
    const accounts = props.accounts;
    const { renderFormInputs, isFormValid, form } = useForm(ExpenseFormObject);
    const categoryRef = useRef(null);
    const accountRef = useRef(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = {
            category: {name: categoryRef },
            account: {name: accountRef},
            amount: form.amount.value,
            date: form.date.value,
            details: form.details.value,
            description: form.description.value
        };
        console.log(formData);
    }

    return (
      <form className="form-category" onSubmit={handleSubmit}>
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
          <label htmlFor="category-recurring">Expense Account</label>
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

        <button disabled={!isFormValid()}>Submit</button>
      </form>
    );

}

export default AddExpense;
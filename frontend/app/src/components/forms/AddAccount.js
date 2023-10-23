import React, { useContext, useRef } from "react";
import "./AddFormStyles.css";
import useForm from "../../utils/useForm";
import getAccountFormObject from "./AccountFormObject";
import axios from "axios";
import MyContext from "../../MyContext";

const AddAccount = () => {
  const AccountObject = getAccountFormObject({});
  const { renderFormInputs, isFormValid, form, resetForm } = useForm(AccountObject);
  const { accounts, updateAccounts } = useContext(MyContext);

  const DebtRef = useRef(null);
  const formRef = useRef(null);//to reset the bolean input

  const handleSubmit= (event) => {
    event.preventDefault();
    const debt = DebtRef.current.value === "true"; // Convert the value to a boolean

    const formData = {
      name: form.name.value,
      amount: form.amount.value,
      debt,
    };
    console.log(formData);
    postAccount(formData);
    resetForm();
    formRef.current.reset();
  }

  const postAccount = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/accounts/",
        data
      );
      if (response.status === 201) {
        const newAcct = response.data;
        updateAccounts([...accounts, newAcct]); //add to the list to display to the user
        console.log("Account added successfully!");
      }
    } catch (error) {
      console.error("Error:", error);
      console.log("Server Response:", error.response);
    }
  };

  return (
    <form className="form-category" ref={formRef} onSubmit={handleSubmit}>
      <h1> Add Account </h1>
      {renderFormInputs()}
      <p>
        <label htmlFor="account-debt">Debt</label>
        <select
          id="account-debt"
          className="select-field"
          style={{ display: "block" }}
          ref={DebtRef}
        >
          <option value="true"> True </option>
          <option value="false"> False </option>
        </select>
      </p>
      <button disabled={!isFormValid()}> Submit </button>
    </form>
  );

}

export default AddAccount;
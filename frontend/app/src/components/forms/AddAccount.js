import React, { useRef } from "react";
import "./AddFormStyles.css";
import useForm from "../../utils/useForm";
import AccountFormObject from "./AccountFormObject";
import axios from "axios";

const AddAccount = () => {
  const { renderFormInputs, isFormValid, form } = useForm(AccountFormObject);
  const recurringRefDebt = useRef(null);

  const handleSubmit= (event) => {
    event.preventDefault();
    const recurring = recurringRefDebt.current.value === "true"; // Convert the value to a boolean

    const formData = {
      name: form.name.value,
      amount: form.amount.value,
      recurring,
    };
    console.log(formData);
    postAccount(formData);
  }

  const postAccount = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/accounts/",
        data
      );
      if (response.status === 200) {
        console.log("Account added successfully!");
      }
    } catch (error) {
      console.error("Error:", error);
      console.log("Server Response:", error.response);
    }
  };

  return (
    <form className="form-category" onSubmit={handleSubmit}>
      <h1> Add Account </h1>
      {renderFormInputs()}
      <p>
        <label htmlFor="account-debt">Debt</label>
        <select
          id="account-debt"
          className="select-field"
          style={{ display: "block" }}
          ref={recurringRefDebt}
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
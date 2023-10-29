import React, { useRef } from "react";
import "./AddFormStyles.css";
import useForm from "../../utils/useForm";
import getAccountFormObject from "./AccountFormObject";
import { useAccountQueries } from '../../queries/accountQueries'

const AddAccount = () => {
  const AccountObject = getAccountFormObject({});
  const { renderFormInputs, isFormValid, form, resetForm } = useForm(AccountObject);
  const { useAddAccountQuery } = useAccountQueries();
  const addAccountMutation = useAddAccountQuery();

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
      const addedAccount = await addAccountMutation.mutateAsync(data);
      console.log(addedAccount);
    } catch (error) {
      console.error("Error:", error);
      console.log("Server Response:", error.response);
    }
  };

  return (
    <form className="form-general" ref={formRef} onSubmit={handleSubmit}>
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
      <button disabled={!isFormValid() || addAccountMutation.isLoading}> Submit </button>
    </form>
  );

}

export default AddAccount;
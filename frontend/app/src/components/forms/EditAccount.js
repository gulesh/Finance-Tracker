import React, { useContext, useState, useCallback, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import MyContext from "../../MyContext";
import useForm from "../../utils/useForm";
import axios from "axios";
import getAccountFormObject from './AccountFormObject'
import { AiOutlineSave } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";

const EditAccount = ()=>{
  const { accountId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const accountData = location.state.accountData;
  const { accounts, updateAccounts } = useContext(MyContext);

  //set autofill values
  const defaultValues = {
    name: accountData.name,
    amount: accountData.amount,
  };

  const [editedData, setEditedData] = useState({}); //key-> value to be edited
  const AccountObject = getAccountFormObject(defaultValues);
  const { renderFormInputs, isFormValid, isInputFieldValid, form } = useForm(AccountObject);

  const [isFormEdited, setIsFormEdited] = useState(false); //to disable user from submitting the same data

  //we know initially all values are valid so use this in the start
  function initialFormValidation() {
    Object.values(form).forEach((inputField) => {
      let valid = isInputFieldValid(inputField);
      inputField.valid = valid;
    });
    return true;
  }

  initialFormValidation(); //call to set the value to true

  //to update the values in the edited form
  const updateFormData = useCallback(
    (formData) => {
      for (const key in formData) {
        //if the form values is different than previously added data
        if ( formData.hasOwnProperty(key) && accountData[key] !== formData[key].value ) {
          const value = formData[key].value;
          if (!isNaN(value)) {
            editedData[key] = Number(formData[key].value);
          } else {
            editedData[key] = value;
          }// Update 'editedData' with the value from 'form'
          setIsFormEdited(true);
        }
      }
    },
    [accountData, editedData]
  );

  useEffect(() => {
    updateFormData(form);
  }, [form, updateFormData]);

  const handleSubmit = (e)=>{
    e.preventDefault();
    //update the edited object
    let validChange = true;
    for ( const key in editedData) {
      if (editedData[key] === accountData[key]) {
        validChange = false;
        break;
      }
    }
    //if we come here then we should call our edited button
    if (validChange) {
      EditData(editedData);
      setIsFormEdited(false);
    }
   navigate(-1);
  }

  const EditData = async (data) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/accounts/${encodeURIComponent(accountId)}`,
        data
      );
      if (response.status === 200) {
        console.log("Category edited successfully!");
        const updatedAccountsList = accounts.map((account) =>
          account.id === accountId ? response.data : account
        );
        updateAccounts(updatedAccountsList);
      } else {
        console.error("Failed to edit account");
      }
    } catch (error) {
      console.error("Error:" + error);
    }
  };

  const handleCancel = () => {
    // Redirect to the previous page
    navigate(-1);
  };

  const handleChangeForDebt = (e) => {
    const { name, value } = e.target;
    setEditedData({
      ...editedData,
      [name]: value === "true",
    });
    setIsFormEdited(true); //set the editedForm to true
  };

  return (
    <form className="form-category" onSubmit={handleSubmit}>
      <h1> Edit Account </h1>
      {renderFormInputs()}
      <p>
        <label htmlFor="account-debt">Debt</label>
        <select
          id="account-debt"
          className="select-field"
          style={{ display: "block" }}
          name="debt"
          value={isFormEdited ? editedData.debt : accountData.debt}
          onChange={handleChangeForDebt}
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
}

export default EditAccount;
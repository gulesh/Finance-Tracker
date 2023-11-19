import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import getTransferFormObject from "../forms/TransferFormObject";
import useForm from "../../utils/useForm";
import DropDown from "../general/DropDown";
import "./AddFormStyles.css";
import { useTransferQueries } from "../../queries/transferQueries";
import { AiOutlineSave } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { useAccountQueries } from "../../queries/accountQueries";

const EditTransfer = () => {
  const { transferId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const transferData = location.state.transferData;
  console.log(transferData);
  const { useGetAccountsQuery } = useAccountQueries();
  const { data: accounts, isError } = useGetAccountsQuery();

  const { useEditTransferQuery } = useTransferQueries();
  const editTransferMutation = useEditTransferQuery();
  
  const data = Array.isArray(accounts) ? [...accounts] : [];
  console.log(accounts);
  const defaultoption = { name: "adjust-balance" };
  data.push(defaultoption);
  const sortedData = data.slice().sort((a, b) => a.name.localeCompare(b.name));

  //prefill the form with transfer values
  const defaultValues = {
    amount: transferData.amount,
    date: transferData.date,
    description: transferData.description,
  };

  const [editedData, setEditedData] = useState({
    accountTo: { name: transferData.accountTo },
    accountFrom: { name: transferData.accountFrom },
  });

  const tranferObject = getTransferFormObject(defaultValues);
  const { renderFormInputs, isFormValid, form, isInputFieldValid } = useForm(tranferObject);
  
  const [isFormEdited, setIsFormEdited] = useState(false);


  function initialFormValidation() {
    Object.values(form).forEach((inputField) => {
      let valid = isInputFieldValid(inputField);
      inputField.valid = valid;
    });
    return true;
  }

  initialFormValidation(); //call to set the values to true

  const updateFormData = useCallback(
    (formData) => {
      for (const key in formData) {
        //if the form values is different than previously added data
        if (transferData[key] !== formData[key].value) {
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
    [transferData, editedData]
  );

  useEffect(() => {
    updateFormData(form);
  }, [form, isFormEdited, updateFormData]);

  const handleSubmit = (event) =>{
    event.preventDefault();
    if ( editedData.accountTo.name === transferData.accountTo)
      delete editedData.accountTo;
    if (editedData.accountFrom.name === transferData.accountFrom)
      delete editedData.accountFrom;
    
    let nochange = true; //this var allows us to make a server patch request when the data has changed
    for(const key in editedData)
    {
      if (
        (key === "accountTo" || key === "accountFrom") &&
        editedData[key].name !== transferData[key]
      ) {
        nochange = false;
        break;
      } else if (editedData[key] !== transferData[key]) {
        nochange = false;
        break;
      }
    }

    //make the server call if data has changed
    if(!nochange)
    {
      EditData(editedData);
      console.log(editedData);
      setIsFormEdited(false);
    }
    navigate(-1);

  };

  const EditData = async (data) => {
    try {
      const editedTransfer = await editTransferMutation.mutateAsync({
        data: data,
        id: transferId,
      });
      console.log(editedTransfer);
    } catch (error) {
      console.error("Error:" + error);
    }
  };

  const handleCancel = () => {
    // Redirect to the previous page
    navigate(-1);
  };

  const handleAccountToNameChange = (value) => {
    setEditedData((prevData)=>({
      ...prevData,
      accountTo: {name: value},
    }));
    setIsFormEdited(true);
  };

  const handleAccountFromNameChange = (value) => {
    setEditedData((prevData) => ({
      ...prevData,
      accountFrom: { name: value },
    }));
    setIsFormEdited(true);
  };

  return (
    <form className="form-general" onSubmit={handleSubmit}>
      <h1> Edit Transfer </h1>
      <DropDown
        data={
          !isError &&
          sortedData.filter((item) => item.name !== "adjust-balance")
        }
        title="Account To"
        onValueChange={handleAccountToNameChange}
        defaultValue={editedData.accountTo?.name || transferData.accountTo}
      />
      <DropDown
        data={
          !isError &&
          sortedData.filter(
            (item) =>
              item.name !== ( editedData.accountTo?.name || transferData.accountTo )&& item.debt !== true
          )
        }
        title="Account From"
        onValueChange={handleAccountFromNameChange}
        defaultValue={editedData.accountFrom?.name || transferData.accountFrom}
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


};

export default EditTransfer

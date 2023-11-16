import React, { useState } from "react";
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
  const { useGetAccountsQuery } = useAccountQueries();
  const { data: accounts, isError } = useGetAccountsQuery();
  const data = Array.isArray(accounts) ? [...accounts] : [];
  console.log(accounts);
  const defaultoption = { name: "adjust-balance" };
  data.push(defaultoption);
  const sortedData = data.slice().sort((a, b) => a.name.localeCompare(b.name));

  //prefill the form with transfer values
  const defaultValues = {
    amount: transferData.amount.value,
    date: transferData.date.value,
    description: transferData.description.value,
  };

  const tranferObject = getTransferFormObject(defaultValues);
  const { renderFormInputs, isFormValid, form, isInputFieldValid } = useForm(tranferObject);
  const { useEditTransferQuery } = useTransferQueries();
  const editTransferMutation = useEditTransferQuery();
  const [isFormEdited, setIsFormEdited] = useState(false);

  const [editedData, setEditedData] = useState({
    accountTo: transferData.accountTo,
    accountFrom: transferData.accountFrom
  });

  function initialFormValidation() {
    Object.values(form).forEach((inputField) => {
      let valid = isInputFieldValid(inputField);
      inputField.valid = valid;
    });
    return true;
  }

  initialFormValidation(); //call to set the values to true

  const handleChangeForDropDowns = (e) => {
    if (e.target) {
      const { name, value } = e.target;

      setEditedData((prevData) => ({
        ...prevData,
        [name]: { name: value },
      }));

      setIsFormEdited(true);
    }
  };

  const handleSubmit = (event) =>{
    event.preventDefault();

  };

  const EditData = async (data) => {
    try {
      const editedTransfer = await editTransferMutation.mutateAsync({data: data, id: transferId});
      console.log(editedTransfer);
    } catch (error) {
      console.error("Error:" + error);
    }
  };

  const handleCancel = () => {
    // Redirect to the previous page
    navigate(-1);
  };

  return (
    <form className="form-general" onSubmit={handleSubmit}>
      <h1> Edit Transfer </h1>
      <DropDown
        data={sortedData}
        title="Account To"
        onValueChange={handleChangeForDropDowns}
        defaultValue={editedData.accountTo.name}
        disabled={isError}
      />
      <DropDown
        data={sortedData.filter(
          (item) => item.name !== editedData.accountTo.name
        )}
        title="Account From"
        onValueChange={handleChangeForDropDowns}
        defaultValue={editedData.accountFrom.name}
        disabled={isError}
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

import React, { useRef, useState } from "react";
import getTransferFormObject from '../forms/TransferFormObject'
import useForm from "../../utils/useForm";
import DropDown from "../general/DropDown";
import "./AddFormStyles.css";
import { useTransferQueries } from '../../queries/transferQueries';

const AddTransfer = (props) =>{
    const data = [...props.accounts];
    const defaultoption = { name: "adjust-balance" };
    data.push(defaultoption);
    const sortedData = data.slice().sort((a, b) => a.name.localeCompare(b.name));

    const tranferObject = getTransferFormObject({});
    const {renderFormInputs, isFormValid, form, resetForm} = useForm(tranferObject);
    const { useAddTransferQuery } = useTransferQueries();
    const addTransferMutation = useAddTransferQuery();
    
    const [accountTo, setAccountTo] = useState("");
    const [accountFrom, setAccountFrom] = useState("");
    const formRef = useRef(null);

    const handleAccountTo = (value) =>{
        setAccountTo(value);
    }

    const formData = {
      accountTo: { name: accountTo },
      accountFrom: { name: accountFrom},
      amount: form.amount.value,
      date: form.date.value,
      description: form.description.value,
    };

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(formData);
        //better would be to add a validation rule (handle change validation) to the form input itself
        if (formData.accountTo.name !== "adjust-balance") {
          postTransfer(formData);
        }
        resetForm();
        setAccountFrom("");
        setAccountTo("");
        formRef.current.reset();
    }

    const postTransfer = async (data)=>{
        try
        {
           const addedTransfer = await addTransferMutation.mutateAsync(data);
           console.log(addedTransfer);
        }
        catch(error)
        {
            console.error("Error:", error);
            console.log("Server Response:", error.response);
        }
    }

    return (
      <form className="form-general" ref={formRef} onSubmit={handleSubmit}>
        <h1> Add Transfer </h1>
        <DropDown
          data={sortedData}
          title="Account To"
          onValueChange={handleAccountTo}
          defaultValue={accountTo}
        />
        <DropDown
          data={sortedData.filter((item) => item.name !== accountTo)}
          title="Account From"
          onValueChange={(value) => setAccountFrom(value)}
          defaultValue={accountFrom}
        />
        {renderFormInputs()}
        <button type="submit" disabled={!isFormValid()}>
          Submit
        </button>
      </form>
    );

}

export default AddTransfer;
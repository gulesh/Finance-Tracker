import React, { useContext, useRef, useState } from "react";
import getTransferFormObject from '../forms/TransferFormObject'
import useForm from "../../utils/useForm";
import MyContext from "../../MyContext";
import DropDown from "../general/DropDown";
import "./AddFormStyles.css";
import axios from "axios";

const AddTransfer = (props) =>{
    const data = [...props.accounts];
    const defaultoption = { name: "adjust-balance" };
    data.push(defaultoption);
    const sortedData = data.slice().sort((a, b) => a.name.localeCompare(b.name));

    const tranferObject = getTransferFormObject({});
    const {renderFormInputs, isFormValid, form, resetForm} = useForm(tranferObject);
    const { transfers, updateTransfers } = useContext(MyContext);
    
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
        //check here if transfer to is "adjust-balance", we don't care about frm as we check that in the backend
        postTransfer(formData);
        resetForm();
        setAccountFrom("");
        setAccountTo("");
        formRef.current.reset();
    }

    const postTransfer = async (data)=>{
        try
        {
            const response = await axios.post("http://localhost:8080/transfers/", data);
            console.log(response);
            if(response.status === 200)
            {
                const newTransfer = response.data;
                updateTransfers([...transfers, newTransfer]);
                console.log("Transfer added successfully!");
            }
            console.log("respose is success");
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
        />
        <DropDown
          data={sortedData.filter((item) => item.name !== accountTo)}
          title="Account From"
          onValueChange={(value) => setAccountFrom(value)}
        />
        {renderFormInputs()}
        <button type="submit" disabled={!isFormValid()}>
          Submit
        </button>
      </form>
    );

}

export default AddTransfer;
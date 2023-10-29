import React, { useState } from "react";
import PageTitle from "../components/general/PageTitle";
import "../components/categorycomponents/CategoryStyles.css";
import { FiPlus } from "react-icons/fi";
import AddTransfer from "../components/forms/AddTransfer";

const Transfer = (props) =>{
    const accounts = props.accounts;
    const [isAddTransferFormVisible, setIsAddTransferFormVisible] =
      useState(false);

    const handlAddExpenseFormVisibility = () => {
      setIsAddTransferFormVisible(!isAddTransferFormVisible);
    };
    return (
      <div>
        <div className="page-header">
          <div className="page-header-content">
            <PageTitle title="Transfers" />
            <button
              onClick={handlAddExpenseFormVisibility}
              className="toggle-button-add-item"
            >
              <FiPlus />
            </button>
          </div>
        </div>
        {isAddTransferFormVisible && <AddTransfer accounts={accounts} />}
      </div>
    );

}

export default Transfer;
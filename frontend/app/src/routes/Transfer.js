import React, { useState } from "react";
import PageTitle from "../components/general/PageTitle";
import "../components/categorycomponents/CategoryStyles.css";
import { FiPlus } from "react-icons/fi";
import AddTransfer from "../components/forms/AddTransfer";
import { useTransferQueries } from "../queries/transferQueries";
import Transfers from "../components/transfer-components/Transfers";

const Transfer = (props) =>{
    const accounts = props.accounts;
    const [isAddTransferFormVisible, setIsAddTransferFormVisible] =
      useState(false);

    const handlAddExpenseFormVisibility = () => {
      setIsAddTransferFormVisible(!isAddTransferFormVisible);
    };

    const { useGetTransfersQuery } = useTransferQueries(); //get the query
    const { isLoading, data: transfers, isError } = useGetTransfersQuery();
    console.log(transfers);

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
        {isLoading && <p> Loading... </p>}
        {isError && <p> Error loading </p>}
        {transfers && <Transfers transfers={transfers} />}
      </div>
    );

}

export default Transfer;
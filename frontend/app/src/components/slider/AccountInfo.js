import React from "react";
import "./Slider.css";
import { FiEdit } from "react-icons/fi";
import DeleteConfirmationDialog from "../../utils/DeleteConfirmationDialog";
import { useNavigate } from "react-router-dom";
import { useAccountQueries } from '../../queries/accountQueries';

const AccountInfo = (props) => {
  const navigate = useNavigate();
  const creditStatus = props.isDebt ? "Credit" : "Debit";
  const { useDeleteAccountQuery } = useAccountQueries();
  const deleteAccountMutation = useDeleteAccountQuery();

  const redirectToEditAccount = (account) => {
    navigate(`/accounts/edit/${account.id}`, {
      state: { accountData: account },
    });
  };

  const handleConfirmDelete = (accountname) => {
    //make the api call
    if (accountname !== null) {
      deleteAccountByName(accountname);
    }
  };

  // Function to delete a category by its ID
  const deleteAccountByName = async (name) => {
    try {
      const deletedAccount = await deleteAccountMutation.mutateAsync(name);
      console.log(deletedAccount);
      
    } catch (error) {
      console.error("Error deleting the category: " + error);
    }
  };

  return (
    <div className="slider">
      <div className="slider-container">
        <div className="slider-content">
          <div className="account-card">
            <div className="account-card-header">
              <h2>{props.accountName}</h2>
            </div>
            <div className="account-card-body">
              <p>
                <span className="info-label">Account Balance:</span>
                <span className="info-value">{props.balance}</span>
              </p>
              <p>
                <span className="info-label">{creditStatus}</span>
                <span className="info-value">{props.isDebt}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="">
          <button
            onClick={() => {
              redirectToEditAccount(props.accountObject);
            }}
          >
            <FiEdit />
          </button>
          <DeleteConfirmationDialog
            onConfirmDelete={handleConfirmDelete}
            name={props.accountName}
            type="account"
          />
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;

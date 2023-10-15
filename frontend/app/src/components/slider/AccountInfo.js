import React from "react";
import "./Slider.css";
import { RiDeleteBin5Fill } from "react-icons/ri";

const AccountInfo = (props) => {
  const creditStatus = props.isDebt ? "Debit" : "Credit";

    const handleDelete = () => {
      

    }
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
            <button className="slider-button" onClick={handleDelete}>
              <RiDeleteBin5Fill />
            </button>
          </div>
        </div>
      </div>
    );
}

export default AccountInfo
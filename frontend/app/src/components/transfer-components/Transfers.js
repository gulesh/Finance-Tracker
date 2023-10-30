import React from "react";

const Transfers = (props) =>{
    const transfers = props.transfers;
    console.log(transfers);
    return (
      <div>
        {Object.values(transfers).map((transfer) => (
          <div key={transfer.id}>
            <p>ID: {transfer.id}</p>
            <p>Amount: {transfer.amount}</p>
            <p>Date: {transfer.date}</p>
            {/* Display other transfer-specific data */}
          </div>
        ))}
      </div>
    );

};

export default Transfers;
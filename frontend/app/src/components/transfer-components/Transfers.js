import React, { useState } from "react";
import TransferDataTable from './TransferDataTable';

const Transfers = (props) =>{

  const columns = [
    { field: "id", headerName: "ID", hide: true },
    { field: "date", headerName: "Transfer Date", flex: 1 },
    { field: "description", headerName: "Transfer Description", flex: 1 },
    { field: "accountTo", headerName: "Account To", flex: 1 },
    { field: "accountFrom", headerName: "Account From", flex: 1 },
    { field: "amount", headerName: "Amount", flex: 1 },
  ];

  const transfers = props.transfers;
  const [loading, setLoading] = useState(false);
  if(transfers.length <= 0)
  {
    setLoading(true);
  }
  // Update rows to extract specific properties from accountTo and accountFrom
  const updatedTransfers = transfers.map((row) => ({
    ...row,
    accountTo: row.accountTo ? row.accountTo.name : "", // Extracting 'name' property from 'accountTo'
    accountFrom: row.accountFrom ? row.accountFrom.name : "N/A", // Extracting 'name' property from 'accountFrom' or using 'N/A' if null
  }));

  console.log(transfers);
  return <TransferDataTable rows={updatedTransfers} columns={columns} loading={loading}/>;
};

export default Transfers;
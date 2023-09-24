import React, { useState } from "react";
import Dialog from "../components/UI/Dialog";
import ExpenseForm from "../components/forms/ExpenseForm";

const EditExpense = (props) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const openDialog = () => {
        setIsDialogOpen(true);
    }

    const closeDialog = () => {
        setIsDialogOpen(false);
    }


    //close the dialog once user hits submit
    const handleSubmit = () => {
        //make a post request here
        closeDialog();
    }

    return (
      <div>
        <button onClick={openDialog} className={props.styleclass}>
          Edit
        </button>
        {isDialogOpen && (
          <Dialog
            title="Edit Expense"
            content={<ExpenseForm />} //need to pass the data which is basically form
            onClose={closeDialog}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    );
}

export default EditExpense;
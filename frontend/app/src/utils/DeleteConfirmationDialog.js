import React from "react";
import { confirmAlert } from "react-confirm-alert"; // Import the library
import "react-confirm-alert/src/react-confirm-alert.css"; // Import the confirmation dialog styles
import { AiOutlineCheck } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";


const DeleteConfirmationDialog = ({ onConfirmDelete, name, type }) => {

  const showConfirmationDialog = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to delete this {type}?</p>
            <button
              onClick={() => {
                onConfirmDelete(name); // Calling the function with a param to delete the entry 
                onClose(); // Close the dialog
              }}
            >
              <AiOutlineCheck />
            </button>
            <button onClick={ onClose }> <RxCross1 /> </button>
          </div>
        );
      },
    });
  };

  return (
    <IconButton aria-label="delete" onClick={showConfirmationDialog}>
      <DeleteIcon />
    </IconButton>
  );
};

export default DeleteConfirmationDialog;

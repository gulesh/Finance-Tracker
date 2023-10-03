import React from "react";
import { confirmAlert } from "react-confirm-alert"; // Import the library
import "react-confirm-alert/src/react-confirm-alert.css"; // Import the confirmation dialog styles
import { RiDeleteBin5Fill } from "react-icons/ri";
import { AiOutlineCheck } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";


const DeleteConfirmationDialog = ({ onConfirmDelete }) => {
  const showConfirmationDialog = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to delete this item?</p>
            <button
              onClick={() => {
                onConfirmDelete(); // Callback to delete the item
                onClose(); // Close the dialog
              }}
            >
              <AiOutlineCheck />
            </button>
            <button onClick={onClose}> <RxCross1 /> </button>
          </div>
        );
      },
    });
  };

  return (
    <button className="delete-button" onClick={showConfirmationDialog}>
      <RiDeleteBin5Fill />
    </button>
  );
};

export default DeleteConfirmationDialog;

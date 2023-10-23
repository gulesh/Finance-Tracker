import React from "react";
import { confirmAlert } from "react-confirm-alert"; // Import the library
import "react-confirm-alert/src/react-confirm-alert.css"; // Import the confirmation dialog styles
import { RiDeleteBin5Fill } from "react-icons/ri";
import { AiOutlineCheck } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";


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
    <button
      className="delete-button"
      style={{
        padding: "0.5rem 1.5rem",
        border: "1px solid white",
        borderRadius: "12px",
      }}
      onClick={showConfirmationDialog}
    >
      <RiDeleteBin5Fill />
    </button>
  );
};

export default DeleteConfirmationDialog;

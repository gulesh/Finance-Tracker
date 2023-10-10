import React from "react";  
import { AiOutlineCheck } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { Modal, Button } from "react-bootstrap";
import "./DeleteConfirmationModal.css"; // Replace with the path to your CSS file


const DeleteConfirmationModel = ({ message, onConfirm, onCancel, showproperty}) => {
  return (
    <>
      <Modal
        show={showproperty}
        onHide={onCancel}
        backdrop="static"
        backdropClassName="modal-backdrop-custom"
      >
        <Modal.Header closeButton> Confirm Action </Modal.Header>
        <Modal.Body> Are you sure you want to add a new category? </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onCancel}>
            <RxCross1 />
          </Button>
          <Button variant="primary" onClick={onConfirm}>
            <AiOutlineCheck />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteConfirmationModel;
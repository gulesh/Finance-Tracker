
import React, {useState} from "react";
import { Form, Button, Modal } from "react-bootstrap";
import '../styles/AddCategories.css'

const AddCategory = () => {
  const [category, setCategory] = useState({
    name: "",
    amountAllocated: 0,
    amountSpent: 0,
    isRecurring: false,
  });

  //these functions and state will be used to show user a confirmation before the new User is added!
  const [showConfirmation, setShowConfirmation] = useState(false);
  const handleCloseConfirmation = () => setShowConfirmation(false);
  const handleShowConfirmation = () => setShowConfirmation(true);

  //function to reset form values.
  const resetForm = () => {
    setCategory({
      name: "",
      amountAllocated: 0,
      amountSpent: 0,
      isRecurring: false,
    });
  };

  const addNewCategory = async (e) => {
    e.preventDefault();
    handleShowConfirmation();
    console.log(category);
  };

  //this method will make a post request
  const confirmAddCategory = () => {
    console.log("Add the User!");
    //add the new category
    resetForm();
    //close the confirmation dialog
    handleCloseConfirmation();
  };
  return (
    <>
      <Form onSubmit={addNewCategory}>
        <Form.Group>
          <Form.Label> Name </Form.Label>
          <Form.Control
            id={category.name}
            type="text"
            value={category.name}
            onChange={(e) => setCategory({ ...category, name: e.target.value })}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label> AmountAllocated </Form.Label>
          <Form.Control
            id={category.amountAllocated}
            type="text"
            value={category.amountAllocated}
            onChange={(e) =>
              setCategory({
                ...category,
                amountAllocated: e.target.value,
              })
            }
          ></Form.Control>
          <Form.Group>
            <Form.Label> Amount Spent </Form.Label>
            <Form.Control
              id={category.amountSpent}
              type="text"
              value={category.amountSpent}
              onChange={(e) =>
                setCategory({
                  ...category,
                  amountSpent: e.target.value,
                })
              }
            ></Form.Control>
          </Form.Group>
        </Form.Group>
        <Form.Group>
          <Form.Label> Recurring </Form.Label>
          <Form.Check type="switch" id="recurring-check" label="Recurring" />
        </Form.Group>
        <Button type="submit"> Add Category </Button>
      </Form>
      {/* Confirmation Dialog */}
      <Modal show={showConfirmation} onHide={handleCloseConfirmation}>
        <Modal.Header closeButton> Confirm Action </Modal.Header>
        <Modal.Body> Are you sure you want to add a new category? </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmation}>
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmAddCategory}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddCategory;
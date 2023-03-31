import React, { useState } from "react";
import { useNavigate } from "react-router";
import NavbarItems from "./itemsNavbar";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

export default function CreateItem() {
  // We define the state for the form.
  const [form, setForm] = useState({
      id: "",
      name: "",
      price: 0,
  
  });
  const navigate = useNavigate();

  // These methods will update the state properties.
  // It is called with a specific value (name, price or level) that changed.
  // We update the state of the form.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newItem = { ...form };
   

    await fetch("http://localhost:8081/item/createNewItem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    })
    .catch(error => {
      window.alert(error);
      return;
    });

    setForm({id: "", name: "", price: 0 });
    navigate("/viewItemsList");
  }

  // This following section will display the form that takes the input from the user.
  // We refer to the functions we defined above for handling form changes.
  return (
    <div>
      <NavbarItems/>
      <Card body outline color="success" className="mx-1 my-2" style={{ width: '30rem' }}>
        <Card.Title>Add Item</Card.Title>
        <Card.Body> 
        <Form>
          <Form.Group className="mb-3" controlId="formId">
            <Form.Label>ID</Form.Label>
            <Form.Control type="text" placeholder="Enter ID" 
                        id="id"
                        value={form.id}
                        onChange={(e) => updateForm({ id: e.target.value })}
             />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formName">
             <Form.Label>Name</Form.Label>
             <Form.Control type="text" placeholder="Enter name" 
                         id="name"
                         value={form.name}
                         onChange={(e) => updateForm({ name: e.target.value })}
             />
          </Form.Group>

          
          <Form.Group className="mb-3" controlId="formPrice">
             <Form.Label>Price</Form.Label>
             <Form.Control type="number" placeholder="Enter price" 
                         id='price'
                         value={form.price}
                         onChange={(e) => updateForm({ price: parseFloat(e.target.value) })}
             />
          </Form.Group>
      
          <Button variant="primary" type="submit" onClick={onSubmit}>
            Submit
          </Button>
        </Form>
        </Card.Body>
      </Card>
      </div>
  );
}

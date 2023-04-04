import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import NavbarItems from "./itemsNavbar";
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import { FormControl } from 'react-bootstrap';



// Edit Component
export default function EditItem() {
  const [form, setForm] = useState({
    id: "",
    name: "",
    price: ""
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      if (!params || !params.id) {
        return;
      }
  
      const id = params.id.toString();
      const response = await fetch(`http://localhost:8081/item/getItemByDBId/${params.id.toString()}`);
  
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
  
      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/");
        return;
      }
  
      setForm(record);
    }
  
    fetchData();
  }, [params, navigate]);
  
  
// methods
  // These methods will update the state properties.
  // The value is an object like {name: "Jose"} identifying field and new value.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // Function that sends the request to the server to update the record.
  async function onSubmit(e) {
    e.preventDefault();
  
    const editedItem = {
      itemId: form.itemId,
      itemName: form.itemName,
      itemPrice: parseInt(form.itemPrice), // Convert the price to an integer if it's a string
    };
  
    const response = await fetch(`http://localhost:8081/item/editItem/${params.id.toString()}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedItem),
    });
  
    if (response.status === 200) {
      navigate("/viewItemsList");
    } else {
      const message = `An error occurred: ${response.statusText}`;
      console.log(message);
      window.alert(message);
    }
  }
  

  // This following section will display the form that takes input from the user to update the data.
  return (
    <div>
      <NavbarItems/>

      <Card body outline color="success" className="mx-1 my-2" style={{ width: '30rem' }}>
        <Card.Body>
        <Form onSubmit={onSubmit}>
          <InputGroup className="mb-3">
            <InputGroup.Text>ID</InputGroup.Text>
            <FormControl 
  type="text" 
  placeholder="Enter new ID"
  id="id"
  name="id"
  value={form.id}
  onChange={(e) => updateForm({ itemId: e.target.value })}
/>
          </InputGroup>
            
            <InputGroup className="mb-3">
              <InputGroup.Text>Name</InputGroup.Text>
              <FormControl 
  type="text" 
  placeholder="Enter new name"
  id="name"
  name="name"
  value={form.name}
  onChange={(e) => updateForm({ itemName: e.target.value })}
/>

            </InputGroup>
            <InputGroup className="mb-3">
  <InputGroup.Text>Price</InputGroup.Text>
  <FormControl 
  type="text" 
  placeholder="Enter a price"
  id="price"
  name="price"
  value={form.price}
  onChange={(e) => updateForm({ itemPrice: parseInt(e.target.value) })}
/>
</InputGroup>

            <input type="submit" value="Update" className="btn btn-primary" />
            </Form>

        </Card.Body>
      </Card>

    </div>
  );
}

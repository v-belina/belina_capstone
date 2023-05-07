import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Select from "react-select";
import axios from "axios";

export default function CreateTicket() {
  const [form, setForm] = useState({
    serverName: "",
    items: [], // array of selected item IDs
  });
  const [allItems, setAllItems] = useState([]);
  const navigate = useNavigate();

  function calculateTotalSum(items) {
    let total = 0;
    items.forEach((item) => {
      const selectedItem = allItems.find((i) => i.value === item);
      if (selectedItem) {
        total += selectedItem.itemPrice;
      }
    });
    return total;
  }
  useEffect(() => {
    // Fetch all items from the database to populate the options in the select component
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:8081/item/getAll");
        const items = response.data.map((item) => ({
          value: item._id,
          label: item.itemName,
          itemPrice: item.itemPrice,
        }));
        setAllItems(items);
      } catch (error) {
        console.error(error);
      }
    };
    fetchItems();
  }, []);

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  function handleItemChange(selectedItems) {
    const itemIds = selectedItems.map((item) => item.value);
    updateForm({ items: itemIds });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const totalSum = calculateTotalSum(
      allItems.filter((item) => form.items.includes(item.value))
    );
    const newTicket = {
      serverName: form.serverName,
      items: form.items.map((itemId) => ({
        itemId,
        price: allItems.find((item) => item.value === itemId).itemPrice,
      })),
      totalSum,
    };
    try {
      await axios.post("http://localhost:8081/ticket/createNew", newTicket);
      setForm({
        serverName: "",
        items: [],
      });
      navigate("/viewTickets");
    } catch (error) {
      window.alert(`Error creating new ticket: ${error.message}`);
    }
  }
  return (
    <div className="d-flex justify-content-center">
      <Card
        body
        outline
        color="success"
        className="mx-1 my-2 custom-card"
        style={{ width: "30rem" }}
      >
        <Card.Title>Create New Ticket</Card.Title>
        <Form onSubmit={onSubmit}>
          <Form.Group controlId="formServerName">
            <Form.Label>Server Name</Form.Label>
            <Form.Control
              type="text"
              value={form.serverName}
              onChange={(e) => updateForm({ serverName: e.target.value })}
            />
          </Form.Group>

          <Form.Group controlId="formItems">
            <Form.Label>Items</Form.Label>
            <Select
              isMulti
              options={allItems}
              value={allItems.filter((item) => form.items.includes(item.value))}
              onChange={handleItemChange}
              getOptionLabel={(option) =>
                `${option.label} - $${option.itemPrice}`
              }
              getOptionValue={(option) => option.value}
            />
          </Form.Group>

          <Form.Group>
            <Button variant="primary" type="submit">
              Create New Ticket
            </Button>
          </Form.Group>
        </Form>
      </Card>
    </div>
  );
}

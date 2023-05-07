import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { Button, Modal, Form, ListGroup, Card } from "react-bootstrap";
import Select from "react-select";

const TicketForm = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState({});
  const [items, setItems] = useState("");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const navigate = useNavigate();
  const [allItems, setAllItems] = useState([]);
  const [form, setForm] = useState({
    items: [], // array of selected item IDs
  });

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

  const editTicket = async (id, newItems) => {
    try {
      const response = await axios.get(
        `http://localhost:8081/ticket/getTicket/${id}`
      );
      const existingItems = response.data.items;
      const updatedItems = [...existingItems, ...newItems];
      const updatedTicket = { items: updatedItems };
      const putResponse = await axios.put(
        `http://localhost:8081/ticket/editTicket/${id}`,
        updatedTicket
      );
      return putResponse.data;
    } catch (error) {
      console.error(error);
    }
  };

  function updateForm(value) {
    setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  const handleItemChange = (selectedOptions) => {
    const selectedItems = selectedOptions.map((option) => ({
      value: option.value,
      label: option.label,
      itemPrice: option.itemPrice,
    }));
    updateForm({ items: selectedItems });
  };

  const accessTicket = async (ticket) => {
    try {
      const response = await axios.get(
        `http://localhost:8081/ticket/getTicketById/${ticket._id}`
      );
      const ticketDetails = response.data;
      const items = await Promise.all(
        ticketDetails.items.map(async (item) => {
          const itemDetailsResponse = await axios.get(
            `http://localhost:8081/item/getItemById/${item.itemId}`
          );
          const itemDetails = itemDetailsResponse.data;
          return (
            <div key={item._id}>
              {`${itemDetails.itemName} - $${itemDetails.price}`}
            </div>
          );
        })
      );
      const totalSum = `$${ticketDetails.totalSum.toFixed(2)}`;
      const serverName = ticketDetails.serverName;
      setSelectedTicket({ ...ticketDetails, items, totalSum, serverName });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/ticket/getTicketById/${id}`
        );
        setTicket(response.data);
        accessTicket(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTicket();
  }, [id]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await editTicket(id, form.items);
      setItems("");
      alert("Ticket updated successfully");
      navigate("/viewTickets");
    } catch (error) {
      console.error(error);
      alert("Error updating ticket");
    }
  };

  return (
    <>
      <h1>Edit Ticket</h1>
      <div className="d-flex justify-content-center">
        <Card style={{ width: "28rem" }} className="mx-2 my-2 custom-card">
          <Card.Body>
            {ticket && Object.keys(ticket).length !== 0 && (
              <ListGroup>
                <ListGroup.Item>
                  Ticket Number: {ticket.ticketNumber}
                </ListGroup.Item>
                <ListGroup.Item>Total Price: ${ticket.totalSum}</ListGroup.Item>
                <ListGroup.Item>Server: {ticket.serverName}</ListGroup.Item>
                <ListGroup.Item>
                  Created At:{" "}
                  {new Date(ticket.createdAt).toLocaleString("en-US", {
                    hour12: true,
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </ListGroup.Item>
                <ListGroup.Item>
                  <p>Items:</p>
                  <ul>
                    {ticket.items &&
                      ticket.items.length > 0 &&
                      ticket.items.map((item) => (
                        <li
                          key={item.itemId}
                        >{`${item.itemName} - $${item.price}`}</li>
                      ))}
                  </ul>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Form.Group controlId="formItems">
                    <Form.Label>Items to Add</Form.Label>
                    <Select
                      isMulti={true}
                      options={allItems}
                      value={form.items}
                      onChange={handleItemChange}
                      getOptionLabel={(option) =>
                        `${option.label} - $${option.itemPrice}`
                      }
                      getOptionValue={(option) => option.value}
                    />
                  </Form.Group>
                </ListGroup.Item>
              </ListGroup>
            )}
            <Form onSubmit={handleFormSubmit}>
              <Button type="submit">Save</Button>
              <Button
                variant="secondary"
                onClick={() => {
                  window.location.href = "http://localhost:8096/viewTickets";
                }}
              >
                Cancel
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default TicketForm;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router";
import { Card } from "react-bootstrap";

function TicketList() {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [itemDetails, getItemDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get("http://localhost:8081/ticket/getAll");
        setTickets(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTickets();
  }, []);

  const handleEdit = async (ticketId) => {
    try {
      // Navigate to the edit ticket page with the ticket ID as a parameter
      navigate(`/editTicket/${ticketId}`);
    } catch (error) {
      console.error(error);
    }
  };

  const accessTicket = async (ticket) => {
    try {
      const response = await axios.get(
        `http://localhost:8081/ticket/getTicketById/${ticket._id}`
      );

      setSelectedTicket(ticket);

      const ticketDetails = response.data;
      const items = await Promise.all(
        ticketDetails.items.map(async (item) => {
          const itemDetailsResponse = await axios.get(
            `http://localhost:8081/item/getItemById/${item._id}`
          );
          const itemDetails = itemDetailsResponse.data;
          return (
            <div>
              {selectedTicket.items.map((item) => {
                const itemDetails = getItemDetails(item.itemId);
                return (
                  <div
                    key={item._id}
                  >{`${itemDetails.itemName} - $${itemDetails.price}`}</div>
                );
              })}
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

  const deleteTicket = async (ticket) => {
    try {
      await axios.delete(
        `http://localhost:8081/ticket/deleteTicketById/${ticket._id}`
      );
      // Update the tickets state by filtering out the deleted ticket
      setTickets((prevTickets) =>
        prevTickets.filter((prevTicket) => prevTicket._id !== ticket._id)
      );
      setSelectedTicket(null);
    } catch (error) {
      console.error(error);
    }
  };
  console.log("Selected ticket:", selectedTicket);
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h1>All Tickets</h1>
        <h5>Available Tickets: {tickets.length}</h5>
      </div>
      <div className="d-flex flex-wrap justify-content-center">
        {tickets.map(
          (ticket) =>
            ticket &&
            Object.keys(ticket).length !== 0 && (
              <Card
                key={ticket._id}
                className="mx-2 my-2 custom-card"
                style={{ width: "18rem",background: 'rgba(255, 255, 255, 0.5)', border: 'none' }}
              >
                <Card.Header>Ticket Number: {ticket.ticketNumber}</Card.Header>
                <Card.Body>
                  <Card.Title>Server: {ticket.serverName}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Total Price: ${ticket.totalSum}
                  </Card.Subtitle>
                  <Card.Text>
                    Created At:{" "}
                    {new Date(ticket.createdAt).toLocaleString("en-US", {
                      hour12: true,
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </Card.Text>
                  <Button
                    className="btn btn-primary mr-4 mx-1 my-1"
                    onClick={() => accessTicket(ticket)}
                  >
                    View Ticket
                  </Button>
                  {/* THIS DELTES THE TICKET, NOT CASHES IT OUT*/}
                   <Button variant="danger" 
                  className="btn btn-primary mr-4 mx-1 my-1"
                  onClick={() => deleteTicket(ticket)}>
                    Cash out
                  </Button> 
                </Card.Body>
              </Card>
            )
        )}
      </div>

      {selectedTicket && (
        <Modal show={true} onHide={() => setSelectedTicket(null)}>
          <Modal.Header closeButton className=" custom-card">
            <Modal.Title>Ticket Details</Modal.Title>
          </Modal.Header>
          <Modal.Body className=" custom-card">
            <p>Server Name: {selectedTicket.serverName}</p>
            <p>Ticket Number: {selectedTicket.ticketNumber}</p>
            <p>Total Sum: {selectedTicket.totalSum}</p>
            <p>
              Created At:{" "}
              {new Date(selectedTicket.createdAt).toLocaleString("en-US", {
                hour12: true,
                month: "long",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}
            </p>
            <p>
              Updated At:{" "}
              {new Date(selectedTicket.updatedAt).toLocaleString("en-US", {
                hour12: true,
                month: "long",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}
            </p>
            <p>Items:</p>
            <ul>
              {selectedTicket.items.map((item) => (
                <li key={item.itemId}>{`${item.itemName} - $${item.price}`}</li>
              ))}
            </ul>
            <Button
              variant="primary"
              onClick={() => handleEdit(selectedTicket._id)}
            >
              Edit Ticket
            </Button>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}
export default TicketList;

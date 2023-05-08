import React from 'react';
import Card from 'react-bootstrap/Card';

const ServerPage = () => {
  return (
    <div className="d-flex justify-content-center">
      <Card style={{ width: '28rem' }} className="mx-2 my-2 custom-card">
        <Card.Body className="text-center">
            <h1>Welcome to VVB</h1>
          <Card.Title>You chose Server role</Card.Title>
          <Card.Text>Below is a list of functions you are able to do:</Card.Text>
          <Card.Link href="/serverItemsList">View a List of items available</Card.Link>
          <Card.Footer>In this function you can view all of the items that have been added to the system.
            You can also edit items here as well as Delete them.
          </Card.Footer>
          <p></p>
          <Card.Link href="/viewTickets">View Tickets</Card.Link>
          <Card.Footer>View all of tickets that are open.</Card.Footer>          
          <p></p>
          <Card.Link href="/createTicket">Create New Ticket</Card.Link>
          <Card.Footer>Here you are able to create a new ticket by providing a server's name and choosing a list of items that are availiable to 
            add to the ticket.</Card.Footer>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ServerPage;

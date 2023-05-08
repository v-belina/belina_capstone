import React from 'react';
import Card from 'react-bootstrap/Card';

const ManagerPage = () => {


  return (
    <div className="d-flex justify-content-center">
      <Card style={{ width: '28rem' }} className="mx-2 my-2 custom-card">
        <Card.Body className="text-center">
          <h1>Welcome to VVB</h1>
          <Card.Title>You chose Manager role</Card.Title>
          <Card.Text>Below is a list of functions you are able to do:</Card.Text>
          <Card.Link href="/viewItemsList">View a List of items available</Card.Link>
          <Card.Footer>In this function you can view all of the items that have been added to the system.
            You can also edit items here as well as Delete them.
          </Card.Footer>
          <p></p>
          <Card.Link href="/createNewItem">Create a new Item</Card.Link>
          <Card.Footer>Create a new Item by providing an ID, item's name and the price for the item.</Card.Footer>
          <p>
          </p>
          <Card.Link href="/managerViewTickets">View Tickets</Card.Link>
          <Card.Footer>View all of tickets that are open.</Card.Footer>
          <p></p>
          <Card.Link href="/generateReport">Generate Report</Card.Link>
          <Card.Footer>Here you can view the report</Card.Footer>
          <p></p>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ManagerPage;

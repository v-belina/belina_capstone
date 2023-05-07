import React, {} from 'react'
import Card from 'react-bootstrap/Card';
import '../../style/background.css'

const Landingpage = () => {
    
    return (
      <div className="d-flex justify-content-center">
      <Card style={{ width: '28rem' }} className="mx-2 my-2 custom-card">
        <Card.Body className="text-center">
          <Card.Title>VVB</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">A starting point for an application.</Card.Subtitle>
          <p>You can choose what you would like to do from the following list:</p>
          <Card.Link href="viewItemsList">View a List of items available</Card.Link>
          <br />
          <Card.Link href="/createTicket">Create a new Ticket</Card.Link>
        </Card.Body>
      </Card>
    </div>
    )
}

export default Landingpage
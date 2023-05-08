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
          <p>You can choose your role as follows</p>
          <Card.Link href="/managerPage">
          <p></p>MANAGER</Card.Link>
          <br />
          <Card.Link href="/serverPage">
          <p></p>SERVER</Card.Link>
        </Card.Body>
      </Card>
    </div>
    )
}

export default Landingpage
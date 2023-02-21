import React, {} from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom'
//new import to get the item info

const itemsPage = () => {
    
    return (
        <Card style={{ width: '30rem' }} className="mx-2 my-2">
        <Card.Body>
          <Card.Title>List of all of the items</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">You can veiw the list of items as well as create them</Card.Subtitle>
          <Card.Text>
          </Card.Text>
          <div>
                <Button variant="primary" className="mx-1 my-1" href={`/viewItems`} >View All Items</Button>
                <Button variant="primary" className="mx-1 my-1" href={`/createNewItem`} >Create New Item</Button>
          </div>
        </Card.Body>
      </Card>
    )
}
export default itemsPage
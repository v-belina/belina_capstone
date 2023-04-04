import React, {} from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom'
//new import to get the item info

const ItemsPage = () => {
    
    return (
        <Card style={{ width: '30rem' }} className="mx-2 my-2">
        <Card.Body>
          <Card.Title>This is the main page that is being
            used.
            List of all of the items can be found here</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">You can veiw the list of items as well as create them</Card.Subtitle>
          <Card.Text>
          </Card.Text>
          <div>
                <Button variant="primary" className="mx-1 my-1" href={`/viewItemsList`} >View All Items</Button>
                <Button variant="primary" className="mx-1 my-1" href={`/createNewItem`} >Create New Item</Button>
          </div>
        </Card.Body>
      </Card>
    )
}
export default ItemsPage
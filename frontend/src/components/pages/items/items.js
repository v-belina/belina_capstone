import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import axios from 'axios'


const Item = ({ id,name, price,deleteFunction}) => {
 
    return(
      <Card body outline  color="success" className="mx-1 my-2" style={{ width: '30rem', background: 'rgba(255, 255, 255, 0.5)', border: 'none' }}>
        <Card.Body> 
            <Stack> 
              <div><h4>{id}</h4></div>
              <div>{name}</div>
              <div>{price}</div>
              <div>
                <Button variant="primary" className="mx-1 my-1" href={`/editItem/${id}`} >Edit</Button>
              </div>
              <div>
                <Button variant="primary" className="mx-1 my-1" onClick={() => deleteFunction(id)}>Delete</Button>
              </div>
            </Stack>
        </Card.Body>
      </Card>
    )
};

export default Item;
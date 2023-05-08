import Card from 'react-bootstrap/Card';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import axios from "axios";

export default function serverItemsList() {
//main component in this file
    const [item, setItem] = useState([]);
  
    useEffect(() => {
      //define the function to fetch the records from the database
      async function getRecords() {
        try {
          const response = await fetch(`http://localhost:8081/item/getAll/`);
  
          if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
          }
  
          const fetchedRecords = await response.json();
          setItem(fetchedRecords); //update state
        } catch (error) {
          console.log("Error fetching records", error);
        }
      }
      getRecords(); //call the function
    }, []);
  
  
    //the following will map out the records on the table
  
    function List() {
      return (
        <div className="d-flex flex-wrap justify-content-center">
          {item.map((item) => {
            const { _id, itemId, itemName, itemPrice } = item;
            return (
              <Card
                key={_id}
                style={{ width: "250px", maxWidth: "90%", margin: "10px" }}
                className="custom-card"
              >
                <Card.Body>
                  <Card.Title>{itemName}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Price: ${itemPrice}
                  </Card.Subtitle>
                  <Card.Text>{itemId}</Card.Text>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      );
    }
  
    return (
      <div>
        <div
          style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
        >
          <div>
            <List />
          </div>
        </div>
      </div>
    );
}

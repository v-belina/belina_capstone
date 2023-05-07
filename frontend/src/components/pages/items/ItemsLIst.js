import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import NavbarItems from "./itemsNavbar";
import axios from "axios";
import EditItem from "./editItems";

//main component in this file
export default function ItemsList() {
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

  const deleteItem = async (_id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8081/item/deleteItemById/${_id}`
      );

      if (response.status !== 200) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        window.alert(message);
        return;
      }

      const newRecord = item.filter((el) => el._id !== _id);
      setItem(newRecord);
      console.log("deleted");
    } catch (error) {
      console.error("Error deleting item", error);
      alert("Error deleting an item");
    }
  };

  //the following will map out the records on the table

  function List() {
    return (
      <div className="d-flex flex-wrap justify-content-center">
        {item.map((item) => {
          const { _id, itemId, itemName, itemPrice } = item;
          return (
            <Card
              key={_id}
              style={{ width: "350px", maxWidth: "90%", margin: "10px" }}
              className="custom-card"
            >
              <Card.Body>
                <Card.Title>{itemName}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Price: ${itemPrice}
                </Card.Subtitle>
                <Card.Text>{itemId}</Card.Text>
                <Button variant="danger" onClick={() => deleteItem(_id)}>
                  Delete
                </Button>
                <Link to={`/editItem/${_id}`}>
                  <Button variant="warning" style={{ marginLeft: 10 }}>
                    Edit
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    );
  }

  return (
    <div>
      <NavbarItems />
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

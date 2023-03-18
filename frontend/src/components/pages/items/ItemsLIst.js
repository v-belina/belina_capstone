import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import NavbarItems from "./itemsNavbar";
import axios from "axios";
import Item from "./items";

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
      await axios.delete(`http://localhost:8081/item/${_id}`);
      const newRecord = item.filter((el) => el._id !== _id);
      setItem(newRecord);
      console.log("deleted");
    } catch (error) {
      console.log("Error deleting item", error);
      alert("Error deleting an item");
    }
  };

  //the following will map out the records on the table
  function List() {
    return item.map((item) => {
      const { itemId, itemName, itemPrice } = item; // item id should be '_id', not 'id'
      return (
        <tr key={itemId}> {/* each row in the table needs a unique 'key' prop */}
          <td>{itemId}</td>
          <td>{itemName}</td>
          <td>{itemPrice}</td>
          <td>
            {}
            <Button variant="danger" onClick={() => deleteItem(itemId)}>
              Delete
            </Button>
          </td>
        </tr>
      );
    });
  }

  return (
    <div>
      <NavbarItems />
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <List />
        </tbody>
      </table>
    </div>
  );
}

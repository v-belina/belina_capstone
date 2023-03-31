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
      const response = await axios.delete(`http://localhost:8081/item/deleteItemById/${_id}`);
  
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
    return item.map((item) => {
      const { _id, itemId, itemName, itemPrice } = item;
      return (
        <tr key={_id}>
          <td>{itemId}</td>
          <td>{itemName}</td>
          <td>{itemPrice}</td>
          <td>
            <Button variant="danger" onClick={() => deleteItem(_id)}>
              Delete
            </Button>
          </td>
          <td>
          <Link to={`/editItem/${_id}`}>
            <Button variant="warning">
              Edit
            </Button>
          </Link>
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
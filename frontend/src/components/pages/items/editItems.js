import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import NavbarItems from "./itemsNavbar";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";
import { FormControl } from "react-bootstrap";
import Item from "./items";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

// Edit Component
export default function EditItem() {
  const { id } = useParams();
  const [form, setForm] = useState({
    id: id,
    name: Item.itemName,
    price: "",
  });
  const [item_Name, setItem_Name] = useState(""); // Define item_Name and setItem_Name variables
  const [id_Name, setId_Name] = useState("");
  const [current_price, setCurrent_price] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      if (!params || !params.id) {
        return;
      }

      const id = params.id.toString();
      const response = await fetch(
        `http://localhost:8081/item/getItemByDBId/${params.id.toString()}`
      );

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/");
        return;
      }

      setForm(record);
      setItem_Name(record.itemName); // Set item_Name state variable with the fetched item name
      setId_Name(record.itemId);
      setCurrent_price(record.itemPrice);
    }

    fetchData();
  }, [params, navigate]);

  // methods
  // These methods will update the state properties.
  // The value is an object like {name: "Jose"} identifying field and new value.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // Function that sends the request to the server to update the record.
  async function onSubmit(e) {
    e.preventDefault();

    const editedItem = {
      itemId: form.itemId,
      itemName: form.itemName,
      itemPrice: parseInt(form.itemPrice), // Convert the price to an integer if it's a string
    };

    const response = await fetch(
      `http://localhost:8081/item/editItem/${params.id.toString()}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedItem),
      }
    );

    if (response.status === 200) {
      navigate("/viewItemsList");
    } else {
      const message = `An error occurred: ${response.statusText}`;
      console.log(message);
      window.alert(message);
    }
  }

  function handleCancel() {
    navigate("/viewItemsList");
  }
  // This following section will display the form that takes input from the user to update the data.
  return (
    <div>
      <NavbarItems />
      <div className="d-flex justify-content-center">
        <Card
          body
          outline
          color="success"
          className="mx-1 my-2 custom-card"
          style={{ width: "30rem" }}
        >
          <Card.Body>
            <Form onSubmit={onSubmit}>
              <InputGroup className="mb-3">
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>The ID cannot be changed</Tooltip>}
                >
                  <InputGroup.Text style={{ width: "120px" }}>
                    MongoDB ID
                  </InputGroup.Text>
                </OverlayTrigger>
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Told you it canoot be changed</Tooltip>}
                >
                  <FormControl
                    type="text"
                    placeholder=""
                    id="id"
                    name="id"
                    value={form.id}
                    readOnly
                    data-tip="Additional text on hover"
                  />
                </OverlayTrigger>
              </InputGroup>

              <InputGroup className="mb-3">
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>This ID cannot be changed</Tooltip>}
                >
                  <InputGroup.Text style={{ width: "120px" }}>
                    Item's ID
                  </InputGroup.Text>
                </OverlayTrigger>
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Why you don't believe me?</Tooltip>}
                >
                  <FormControl
                    type="text"
                    placeholder=""
                    id="id"
                    name="id"
                    value={id_Name}
                    readOnly
                    data-tip="Additional text on hover"
                  />
                </OverlayTrigger>
              </InputGroup>

              <InputGroup className="mb-3">
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>The name cannot be changed either</Tooltip>}
                >
                  <InputGroup.Text style={{ width: "120px" }}>
                    Current Name
                  </InputGroup.Text>
                </OverlayTrigger>
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Oh, c'omn now!</Tooltip>}
                >
                  <FormControl
                    type="text"
                    placeholder=""
                    id="id"
                    name="id"
                    value={item_Name}
                    readOnly
                    data-tip="Additional text on hover"
                  />
                </OverlayTrigger>
              </InputGroup>

              <InputGroup className="mb-3">
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>You cannot change this either </Tooltip>}
                >
                  <InputGroup.Text style={{ width: "120px" }}>
                    Current Price $
                  </InputGroup.Text>
                </OverlayTrigger>
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Wow! I had hope this whole time</Tooltip>}
                >
                  <FormControl
                    type="text"
                    placeholder=""
                    id="id"
                    name="id"
                    value={current_price}
                    readOnly
                    data-tip="Additional text on hover"
                  />
                </OverlayTrigger>
              </InputGroup>

              <InputGroup className="mb-3">
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip>Yes! You can finally change this field </Tooltip>
                  }
                >
                  <InputGroup.Text style={{ width: "120px" }}>
                    New Price ${" "}
                  </InputGroup.Text>
                </OverlayTrigger>
                <FormControl
                  type="text"
                  placeholder="Enter a price"
                  id="price"
                  name="price"
                  value={form.price}
                  pattern="^\d+(\.\d{1,2})?$"
                  title="Please enter a valid price (e.g. 10 or 10.50)"
                  onChange={(e) =>
                    updateForm({ itemPrice: parseInt(e.target.value) })
                  }
                />
              </InputGroup>

              <div className="d-grid gap-2">
                <Button variant="primary" type="submit">
                  Update
                </Button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="btn btn-secondary mx-2"
                >
                  Cancel
                </button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

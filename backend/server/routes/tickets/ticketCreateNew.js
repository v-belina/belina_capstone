const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Ticket = require("../../models/tickets/ticketModel");
const ItemPrice = require("../../models/itemModel");

router.post("/createNew", async (req, res) => {
  const { serverName, items } = req.body;

  try {
    // Map each item to a new object that includes the item name, item ID, and price
    const itemObjects = await Promise.all(
      items.map(async (item) => {
        const itemPrice = await ItemPrice.findById(
          mongoose.Types.ObjectId(item.itemId)
        );
        return {
          itemName: itemPrice.itemName,
          itemId: itemPrice._id,
          price: itemPrice.price,
        };
      })
    );

    // Calculate the total sum of all items in the ticket
    const totalSum = itemObjects.reduce((sum, item) => sum + item.price, 0);

    // Add the price field to the items array
    const itemsWithPrice = itemObjects.map((item, index) => {
      return {
        ...item,
        price: items[index].price,
      };
    });

    // Create a new ticket object using the constructor
    const ticket = new Ticket({
      serverName,
      items: itemsWithPrice,
      totalSum,
    });

    // Save the new ticket to the database
    await ticket.save();
    res.status(201).json(ticket);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: `Error creating new ticket: ${err.message}` });
  }
});

module.exports = router;

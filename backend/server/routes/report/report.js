const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Define schema for ticket and item collections
const ticketSchema = new mongoose.Schema({
  date: Date,
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
});

const itemSchema = new mongoose.Schema({
  name: String,
  price: Number,
});

// Define models for ticket and item collections
const TicketReport = mongoose.model("TicketReport", ticketSchema); // Changed the name of the model to TicketReport
const Item = mongoose.model("Item", itemSchema);

// Define route for report
router.get("/:date", async (req, res) => {
  const date = new Date(req.params.date);

  try {
    // Get tickets for given date
    const tickets = await TicketReport.find({ date: date }).populate("items");

    // Calculate total sum of ticket prices
    const totalSum = tickets.reduce((sum, ticket) => {
      return (
        sum +
        ticket.items.reduce((itemSum, item) => {
          return itemSum + item.price;
        }, 0)
      );
    }, 0);

    // Return report data as JSON
    res.json({ date: date, totalSum: totalSum });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;

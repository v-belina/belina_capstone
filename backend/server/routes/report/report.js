const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const reportSchema = require("../../models/report/reportModel")

// Define schema for ticket and item collections
const ticketSchema = new mongoose.Schema({
  createdAt: Date,
  Items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Items" }],
});

const itemSchema = new mongoose.Schema({
  name: String,
  price: Number,
});

// Define models for ticket and item collections
const TicketReport = mongoose.model("TicketReport", ticketSchema); // Changed the name of the model to TicketReport
const Items = mongoose.model("Items", itemSchema); // Changed the name of the model to "Items"

// Define route for report
router.get("/:date", async (req, res) => {
  const date = new Date(req.params.date);

  try {
    // Get tickets for given date
    const tickets = await TicketReport.find({
      createdAt: {
        $gte: new Date(date.setHours(0, 0, 0)),
        $lt: new Date(date.setHours(23, 59, 59)),
      },
    }).populate("items");

    // Calculate total sum of ticket prices
    const totalSum = tickets.reduce((sum, ticket) => {
      return (
        sum +
        ticket.Items.reduce((itemSum, item) => {
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

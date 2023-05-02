const express = require('express');
const router = express.Router();
const Ticket = require('../../models/tickets/ticketModel');

router.post('/createNew', async (req, res) => {
  const { serverName, items } = req.body;

  try {
    // Create a new ticket object using the constructor
    const ticket = new Ticket({
      serverName,
      items,
    });

    // Save the new ticket to the database
    await ticket.save();
    res.status(201).json(ticket);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: `Error creating new ticket: ${err.message}` });
  }
});

module.exports = router;

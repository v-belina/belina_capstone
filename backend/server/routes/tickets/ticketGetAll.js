const express = require('express');
const router = express.Router();
const ticket = require('../../models/tickets/ticketModel');

router.get('/getAll', async (req, res) => {
  try {
    const tickets = await ticket.find();
    res.json(tickets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error getting tickets' });
  }
});

module.exports = router;

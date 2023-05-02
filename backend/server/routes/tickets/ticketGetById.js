const express = require('express');
const router = express.Router();
const Ticket = require('../../models/tickets/ticketModel');

router.get('/getTicketById/:id', async (req, res) => {
  try {
    const ticketId = req.params.id;
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    res.json(ticket);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error getting ticket' });
  }
});

module.exports = router;

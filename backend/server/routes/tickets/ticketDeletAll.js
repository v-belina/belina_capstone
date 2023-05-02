const express = require("express");
const router = express.Router();
const newTicketModel = require('../../models/tickets/ticketModel')

router.delete('/deleteAll', async (req, res) => {
    const ticket = await newTicketModel.deleteMany();
    return res.json(ticket)
  })

  module.exports = router;
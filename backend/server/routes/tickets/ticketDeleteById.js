const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const TicketModel = require("../../models/tickets/ticketModel");

router.delete("/deleteTicketById/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ticket ID" });
  }

  try {
    const result = await TicketModel.findByIdAndDelete(id);

    if (result === null) {
      return res
        .status(404)
        .json({ error: `Ticket with ID '${id}' does not exist.` });
    }

    return res
      .status(200)
      .json({ message: `Ticket with ID '${id}' was deleted.` });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error deleting Ticket" });
  }
});

module.exports = router;

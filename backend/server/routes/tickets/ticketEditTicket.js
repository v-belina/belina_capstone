const express = require("express");
const router = express.Router();
const newTicketModel = require("../../models/tickets/ticketModel");

router.put("/editTicket/:id", async (req, res) => {
  const { id } = req.params;
  
  const { items} = req.body;
  
  if (!items) {
    return res.status(400).send({ message: "Missing required fields" });
  }

  newTicketModel.findByIdAndUpdate(
    id,
    {
      $set: {
        items
      },
    },
    { new: true },
    (err, ticket) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Error updating ticket");
      }
  
      return res.status(200).send(ticket);
    }
  );
});

module.exports = router;

const express = require("express");
const { newItemValidation } = require("../models/itemValidator");
const router = express.Router();
const newItemModel = require("../models/itemModel"); // Import the item model
router.put("/editItem/:id", async (req, res) => {
    // Extract the id from the request parameters
    const { id } = req.params;
  
    // Validate new item information
    const { error } = newItemValidation(req.body);
    if (error) return res.status(400).send({ message: error.errors[0].message });
  
    // Store new item information
    const { id: itemId, name: itemName, price: itemPrice } = req.body;
  
    // Find and update item using stored information
    newItemModel
      .findByIdAndUpdate(
        id,
        {
          itemId: itemId,
          itemName: itemName,
          itemPrice: itemPrice,
        },
        { new: true } // Add this option to return the updated document
      )
      .exec(function (err, item) {
        if (err) {
          console.log(err);
          res.status(500).send("Error updating item");
        } else {
          res.status(200).send(item); // Send the updated item as a response
        }
      });
  });
  
  module.exports = router;
  
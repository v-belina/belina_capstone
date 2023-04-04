const express = require("express");
const { newItemValidation } = require("../../models/itemValidator");
const router = express.Router();
const newItemModel = require("../../models/itemModel");
const mongoose = require("mongoose");

router.put('/editItem/:id', async (req, res) => {
  const { id } = req.params;
  const { itemId, itemName, itemPrice } = req.body;
  console.log('Received id:', id);
  // Validate the id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid id' });
  }

  try {
    const updatedItem = await newItemModel.findByIdAndUpdate(
      id,
      { itemId, itemName, itemPrice },
      { new: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    return res.status(200).json(updatedItem);
  } catch (error) {
    return res.status(500).json({ message: 'Error updating item', error });
  }
});

module.exports = router;


const express = require("express");
const router = express.Router();

const ItemModel = require("../../models/itemModel");
router.get("/getItemById/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const item = await ItemModel.findOne({ itemId: id });

    if (item === null) {
      res.status(404).send("Item with the provided ID does not exist.");
    } else {
      return res.json(item);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving item by ID");
  }
});


module.exports = router;

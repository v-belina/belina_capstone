const express = require("express");
const router = express.Router();

const ItemModel = require("../../models/itemModel");

router.delete("/deleteItemById/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await ItemModel.findByIdAndDelete(id);

    if (result === null) {
      res.status(404).send(`Item with ID '${id}' does not exist.`);
    } else {
      res.status(200).send(`Item with ID '${id}' was deleted.`);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting item");
  }
});

module.exports = router;

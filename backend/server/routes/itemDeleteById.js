const express = require("express");
const router = express.Router();

const newItemModel = require("../models/itemModel");

router.delete("/deleteItem/:id", async (req, res) => {
  const id = req.params.id;

  newItemModel.deleteById(id, function (err, item) {
    if (err) {
      console.log(err);
      res.status(500).send("An error occurred while deleting the item.");
    }
    if (item == null) {
      res.status(404).send("Item not found.");
    } else {
      return res.json(item);
    }
  });
});

module.exports = router;
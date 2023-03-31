const express = require("express");
const { newItemValidation } = require("../../models/itemValidator");
const router = express.Router();
const newItemModel = require("../../models/itemModel");

router.put("/editItem/:id", async (req, res) => {
  const { id } = req.params;
  const { error } = newItemValidation(req.body);
  
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }
  
  newItemModel.findByIdAndUpdate(
    id,
    {
      id: req.body.id,
      name: req.body.name,
      price: req.body.price,
    },
    { new: true },
    (err, item) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Error updating item");
      }
  
      return res.status(200).send(item);
    }
  );
});

module.exports = router;

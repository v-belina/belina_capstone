const mongoose = require("mongoose");
const { Schema } = require("zod");

//user schema/model
const newItemSchema = new mongoose.Schema(
  {
    itemId: {
      type: String,
      required: true,
      label: "Item Id"
    },
    itemName: {
      type: String,
      required: true,
      label: "Item Name",
    },
    itemPrice: {
      type: Number,
      required: true,
      label: "Item Price",
    },
  },
  { collection: "Items" }
);

module.exports = mongoose.model('items', newItemSchema)
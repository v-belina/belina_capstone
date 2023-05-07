const mongoose = require("mongoose");
const { Schema } = mongoose;
const uuid = require("uuid");
const ItemPrice = require("../../models/itemModel").ItemPrice;

const itemSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  itemId: { type: String, required: true },
  price: { type: Number, required: false },
});

const ticketSchema = new mongoose.Schema(
  {
    ticketNumber: { type: String, unique: true, default: uuid.v4 },
    serverName: { type: String, required: true },
    items: [itemSchema],
    displayMessage: { type: String, default: "Thank you for your business!" },
  },
  {
    toJSON: { virtuals: true },
    timestamps: true,
  }
);

ticketSchema.pre("save", function (next) {
  if (this.isNew) {
    // Generate a random number between 1 and 10000 (inclusive)
    const randomNumber = Math.floor(Math.random() * 10000) + 1;
    this.ticketNumber = randomNumber;
  }
  next();
});

ticketSchema.virtual("totalSum").get(function () {
  const totalSum = this.items.reduce((sum, item) => sum + item.price, 0);
  return totalSum;
});

const ticketModel = mongoose.model("Ticket", ticketSchema);

module.exports = ticketModel;

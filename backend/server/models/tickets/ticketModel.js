const mongoose = require('mongoose');
const { Schema } = mongoose;
const uuid = require ('uuid');

const itemPriceSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  price: { type: Number, required: true }
});

const ItemPrice = mongoose.model('ItemPrice', itemPriceSchema);

const ticketSchema = new mongoose.Schema({
  ticketNumber: { type: String, unique: true, default: uuid.v4 },
  serverName: { type: String, required: true },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ItemPrice', required: true }],
  displayMessage: { type: String, default: 'Thank you for your business!' }
}, { toJSON: { virtuals: true } });

ticketSchema.pre('save', function (next) {
  if (this.isNew) {
    // Generate a random number between 1 and 10000 (inclusive)
    const randomNumber = Math.floor(Math.random() * 10000) + 1;
    this.ticketNumber = randomNumber;
  }
  next();
});

ticketSchema.virtual('totalSum').get(async function() {
  const itemPrices = await ItemPrice.find({ _id: { $in: this.items } }).select('price');
  const totalSum = itemPrices.reduce((sum, itemPrice) => sum + itemPrice.price, 0);
  return totalSum;
});

const ticketModel = mongoose.model('Ticket', ticketSchema);

module.exports = ticketModel;

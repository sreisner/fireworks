const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderProduct = Schema({
  _id: {
    type: Number,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
});

const OrderSchema = Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zip: {
      type: Number,
      required: true,
    },
    products: {
      type: [OrderProduct],
      required: true,
    },
    amountCharged: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    createdOn: {
      type: Date,
      required: true,
      default: new Date(),
    },
  },
  { collection: 'orders' }
);

module.exports = mongoose.model('Order', OrderSchema);

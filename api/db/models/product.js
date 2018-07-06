const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = Schema(
  {
    price: {
      dollars: {
        type: Number,
        required: true,
        min: 0,
      },
      cents: {
        type: Number,
        required: true,
        min: 0,
        max: 99,
      },
    },
    name: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  { collection: 'products' }
);

module.exports = mongoose.model('Product', ProductSchema);

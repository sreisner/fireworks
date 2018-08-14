const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = Schema(
  {
    _id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    categoryId: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrls: {
      type: [String],
      required: true,
    },
    duration: {
      type: Number,
      required: false,
    },
    retailPrice: {
      type: Number,
      required: false,
    },
    casePrice: {
      type: Number,
      required: true,
    },
    manufacturer: {
      type: String,
      required: false,
    },
    colors: {
      type: [String],
      required: false,
    },
    videoUrl: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: false,
    },
    numShots: {
      type: Number,
      required: false,
    },
    casePacking: {
      type: Number,
      required: true,
    },
    effects: {
      type: [String],
      required: false,
    },
    count: {
      type: Number,
      required: true,
    },
  },
  { collection: 'products' }
);

module.exports = mongoose.model('Product', ProductSchema);

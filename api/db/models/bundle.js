const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContentSchema = Schema({
  count: {
    type: Number,
    required: true,
    min: 1,
  },
  categoryId: {
    type: Number,
    required: true,
  },
});

const BundleSchema = Schema(
  {
    _id: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    title: {
      type: String,
      required: true,
    },
    subTitle: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    contents: {
      type: [ContentSchema],
      required: true,
    },
  },
  { collection: 'bundles' }
);

module.exports = mongoose.model('Bundle', BundleSchema);

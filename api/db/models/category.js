const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = Schema(
  {
    _id: {
      type: Number,
      required: true,
    },
    singularName: {
      type: String,
      required: true,
    },
    pluralName: {
      type: String,
      required: true,
    },
  },
  { collection: 'categories' }
);

module.exports = mongoose.model('Category', CategorySchema);

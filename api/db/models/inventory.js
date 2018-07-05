const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InventorySchema = Schema(
  {
    price: {
      dollars: Number,
      cents: Number,
    },
    name: String,
    shortDescription: String,
    imageUrl: String,
  },
  { collection: 'inventory' }
);

module.exports = mongoose.model('Inventory', InventorySchema);

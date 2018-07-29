const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = Schema({}, { collection: 'products' });

module.exports = mongoose.model('Product', ProductSchema);

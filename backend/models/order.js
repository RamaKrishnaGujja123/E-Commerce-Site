const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user_id: { type: Number, required: true },  // Mock user ID
  products: [{
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  }],
  total: { type: Number, required: true },
  status: { type: String, default: 'Pending' },
});

module.exports = mongoose.model('Order', orderSchema);

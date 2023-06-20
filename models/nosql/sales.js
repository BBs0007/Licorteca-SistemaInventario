const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  products_sold: [
    {
      product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'productos',
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      total_pagar: {
        type: Number,
        required: true
      }
    }
  ],
  date: {
    type: Date,
    required: false,
    default: Date.now
  }
});

module.exports = mongoose.model('sales', saleSchema);

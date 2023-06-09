const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true 
},
  quantity: { 
    type: Number, 
    required: true 
},
  date: { 
      type: Date, 
      required: false, 
      default: Date.now 
    }
});

module.exports = mongoose.model('purchases', purchaseSchema);

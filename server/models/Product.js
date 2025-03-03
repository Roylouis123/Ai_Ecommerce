// File: models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true
  },
  description: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true,
    min: 0 
  },
  discountPercentage: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  stock: { 
    type: Number, 
    required: true,
    min: 0,
    default: 0 
  },
  brand: { 
    type: String, 
    required: true 
  },
  category: { 
    type: String, 
    required: true 
  },
  images: [{ 
    type: String 
  }],
  thumbnail: { 
    type: String 
  },
  rating: { 
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  features: [{ 
    type: String 
  }],
  specifications: {
    type: Map,
    of: String
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Update the 'updatedAt' field on save
productSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
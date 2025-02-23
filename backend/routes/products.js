const express = require('express');
const { getAllProducts, getProductById, addProduct } = require('../controllers/productController');
const router = express.Router();

// Get all products
router.get('/', getAllProducts);

// Get a single product by ID
router.get('/:id', getProductById);

// Create a new product (admin only)
router.post('/', addProduct);

module.exports = router;

const express = require('express');
const { placeOrder, getUserOrders } = require('../controllers/orderController');

const router = express.Router();

// Create an order (PostgreSQL version)
router.post('/', placeOrder);

// Get orders by user (PostgreSQL version)
router.get('/:userId', getUserOrders);

module.exports = router;

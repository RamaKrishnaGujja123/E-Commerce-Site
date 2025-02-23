const pool = require('../config'); // PostgreSQL database connection

// Place an order (with separate order_items table)
const placeOrder = async (req, res) => {
  const { user_id, products, total } = req.body;
  try {
    // Insert into orders table
    const orderResult = await pool.query(
      'INSERT INTO orders (user_id, total, status) VALUES ($1, $2, $3) RETURNING id',
      [user_id, total, 'Pending']
    );
    const order_id = orderResult.rows[0].id;

    // Insert order items into order_items table
    for (let product of products) {
      await pool.query(
        'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)',
        [order_id, product.product_id, product.quantity, product.price]
      );
    }

    // Mock Payment Processing
    const paymentStatus = Math.random() > 0.5 ? 'Success' : 'Failed'; // Randomize payment outcome

    // Update order status based on payment success
    await pool.query('UPDATE orders SET status = $1 WHERE id = $2', [paymentStatus, order_id]);

    res.json({ orderId: order_id, status: paymentStatus });
  } catch (err) {
    res.status(500).json({ message: 'Error placing order', error: err.message });
  }
};

// Get all orders for a specific user
const getUserOrders = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT o.id, o.total, o.status, o.created_at, 
              json_agg(json_build_object('product_id', oi.product_id, 'quantity', oi.quantity, 'price', oi.price)) AS items 
       FROM orders o 
       JOIN order_items oi ON o.id = oi.order_id 
       WHERE o.user_id = $1 
       GROUP BY o.id`,
      [req.params.userId]
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching orders', error: err.message });
  }
};

module.exports = { placeOrder, getUserOrders };
const pool = require('../config'); // PostgreSQL database connection (config.js)

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products', error: err.message });
  }
};

// Get a single product by ID
const getProductById = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching product', error: err.message });
  }
};

// Add a new product
const addProduct = async (req, res) => {
  const { name, description, price, image_url } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO products (name, description, price, image_url) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, description, price, image_url]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ message: 'Error adding product', error: err.message });
  }
};

module.exports = { getAllProducts, getProductById, addProduct };

// Import the dotenv package to load the .env file
require('dotenv').config();

const { Pool } = require('pg');

// Use environment variables for database connection values
const pool = new Pool({
  user: process.env.DB_USER,        // PostgreSQL username
  host: process.env.DB_HOST,        // PostgreSQL host
  database: process.env.DB_NAME,    // PostgreSQL database name
  password: process.env.DB_PASSWORD,// PostgreSQL password
  port: process.env.DB_PORT,        // PostgreSQL port
});

module.exports = pool;
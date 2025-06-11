// src/config/db.js
const mysql = require('mysql2/promise'); // <- IMPORTANTE: note o '/promise'

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'workflow_db'
});

module.exports = db;

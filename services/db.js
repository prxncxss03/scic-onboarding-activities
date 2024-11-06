const mysql = require("mysql2");

require("dotenv").config();
// const createTableQuery = `
//   CREATE TABLE IF NOT EXISTS Books (
//     Id INT AUTO_INCREMENT PRIMARY KEY,
//     Isbn VARCHAR(13) NOT NULL,
//     Title VARCHAR(255) NOT NULL,
//     Date DATE,
//     Rating TINYINT,
//     Comment TEXT,
//     Author VARCHAR(255),
//     Image_Url VARCHAR(255)
//   )
// `;

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
});

module.exports = pool;

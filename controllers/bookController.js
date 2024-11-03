const connection = require('../services/db');

async function getBooks() {
  return new Promise ((resolve, reject) => {
    connection.query('SELECT * FROM books', (err, rows) => {
      if (err) {
        reject(err)
      } else {
        resolve(rows);
      }
    })
  })
}

module.exports = {
  getBooks
}
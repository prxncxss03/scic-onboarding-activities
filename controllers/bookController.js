const pool = require("../services/db");

async function getBooks(sortByValue = "date") {
  const sortBy = sortByValue === "date" ? "id" : sortByValue;
  const sortOrder = sortBy === "title" ? "ASC" : "DESC";
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM books ORDER BY ${sortBy} ${sortOrder} `,
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      }
    );
  });
}

async function getBookByIsbn(isbn) {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM books WHERE Isbn = ?", [isbn], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows[0]);
      }
    });
  });
}

async function getBookById(id) {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM books WHERE id = ?", [id], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows[0]);
      }
    });
  });
}

async function addBook(isbn, title, author, date, rating, comment, imageUrl) {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO books (Isbn, Title, Author, Date, Rating, Comment, Image_Url) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [isbn, title, author, date, rating, comment, imageUrl],
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve("Book added");
        }
      }
    );
  });
}

async function updateBook(id, isbn, title, author, rating, comment, imageUrl) {
  return new Promise((resolve, reject) => {
    let query =
      "UPDATE books SET Isbn = ?, Title = ?, Author = ?, Rating = ?, Comment = ?";
    const params = [isbn, title, author, rating, comment];

    // Check if imageUrl is provided and add it to the query
    if (imageUrl) {
      query += ", Image_Url = ?";
      params.push(imageUrl);
    }

    // Complete the query with the WHERE clause
    query += " WHERE id = ?";
    params.push(id);

    pool.query(query, params, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve("Book updated");
      }
    });
  });
}

async function deleteBook(id) {
  return new Promise((resolve, reject) => {
    pool.query("DELETE FROM books WHERE id = (?)", [id], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve("Book deleted");
      }
    });
  });
}

module.exports = {
  getBooks,
  addBook,
  deleteBook,
  getBookById,
  updateBook,
  getBookByIsbn,
};

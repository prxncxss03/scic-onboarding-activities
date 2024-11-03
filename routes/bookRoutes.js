const express = require("express");
const axios = require("axios");
const router = express.Router();

const bookController = require("../controllers/bookController");

router.get("/", (req, res) => {
  res.redirect("/books?sort=date");
});

const fetchBookCover = async (isbn) => {
  const baseUrl = "https://bookcover.longitood.com/bookcover/";
  const url = `${baseUrl}${isbn}`;
  try {
    const response = await axios.get(url);
    return response.data.url;
  } catch (error) {
    return null;
  }
};

router.get("/books", async (req, res) => {
  const sort = req.query.sort;
  const validSorts = ["title", "date", "rating"];

  if (!validSorts.includes(sort)) {
    return res.status(400).send("Invalid sort parameter");
  }

  try {
    const bookResults = await bookController.getBooks(sort);
    res.render("index", { books: bookResults, sort: sort });
  } catch (error) {
    res.send(error);
  }
});

router.get("/add-book", (req, res) => {
  res.render("add-book");
});

router.get("/book/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const book = await bookController.getBookById(id);
    res.render("book", { book: book });
  } catch (error) {
    res.send(error);
  }
});

router.post("/book", async (req, res) => {
  const { isbn, title, author, rating, comment } = req.body;
  const date = new Date();
  const formattedDate = date.toISOString().slice(0, 10);
  const bookCover = await fetchBookCover(isbn);
  try {
    await bookController.addBook(
      isbn,
      title.trim(),
      author,
      formattedDate,
      Number(rating),
      comment.trim(),
      bookCover
    );
    res.redirect("/books?sort=date");
  } catch (error) {
    res.send(error);
  }
});

router.put("/book/:id", async (req, res) => {
  const id = req.params.id;
  const { isbn, originalIsbn, title, author, rating, comment, imageUrl, date } =
    req.body;
  let bookCover = null;
  if (isbn !== originalIsbn) {
    bookCover = await fetchBookCover(isbn);
  }

  try {
    await bookController.updateBook(
      id,
      isbn,
      title.trim(),
      author,
      rating,
      comment.trim(),
      bookCover
    );
    res.render("book", {
      book: {
        Id: id,
        Isbn: isbn,
        Date: date,
        Title: title,
        Author: author,
        Rating: rating,
        Comment: comment,
        Image_Url: bookCover ? bookCover : imageUrl,
      },
    });
  } catch (error) {
    res.send(error);
  }
});

router.delete("/book/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await bookController.deleteBook(id);
    res.send("Book deleted");
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;

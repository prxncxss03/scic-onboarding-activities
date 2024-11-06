const express = require("express");
const axios = require("axios");
const router = express.Router();
const helper = require("../utils/helper");
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

  // check if book already exists on the database
  const bookExists = await bookController.getBookByIsbn(isbn);
  if (bookExists) {
    return res.status(400).json({
      message:
        "Book already exists. Please add a new book or edit the existing one.",
    });
  }

  const bookCover = await fetchBookCover(isbn);
  try {
    if (!bookCover) {
      return res.status(400).json({
        message: "Book not found. Please make sure your ISBN-13 is correct.",
      });
    }

    await bookController.addBook(
      isbn,
      helper.formatToSentenceCase(title).trim(),
      helper.formatToSentenceCase(author).trim(),
      formattedDate,
      Number(rating),
      comment.charAt(0).toUpperCase() + comment.slice(1).toLowerCase().trim(),
      bookCover
    );
    res.status(200).json({ message: "Book added successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while adding the book." });
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
      helper.formatToSentenceCase(title).trim(),
      helper.formatToSentenceCase(author).trim(),
      rating,
      comment.charAt(0).toUpperCase() + comment.slice(1).toLowerCase().trim(),
      bookCover
    );
    res.render("book", {
      book: {
        Id: id,
        Isbn: isbn,
        Date: date,
        Title: helper.formatToSentenceCase(title).trim(),
        Author: helper.formatToSentenceCase(author).trim(),
        Rating: rating,
        Comment:
          comment.charAt(0).toUpperCase() +
          comment.slice(1).toLowerCase().trim(),
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

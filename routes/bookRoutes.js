const express = require('express')
const router = express.Router()

const bookController = require('../controllers/bookController');

router.get('/', async (req, res ) => {
  try {
    const bookResults = await bookController.getBooks()
    res.render('index', {books: bookResults})
  } catch (error) {
    res.send(error)
  }
})

module.exports = router;

# scic-onboarding-activity

## Simple Web Application Book Notes App

The Book Note App is a web application built using EJS, Axios, Express, Bootstrap, and MySQL. This tech stack allows for a dynamic user experience, enabling users to easily manage their book entries. To enhance the visual appeal of the book listings, the app integrates with the [Book Cover API](https://github.com/w3slley/bookcover-api) to fetch and display book cover images.

### Features

1. Create a Book Entry

- Easily add a new book to your collection by providing details such as the isbn-13, title, author, rating, and any comments you want to include.

2. Edit a Book Entry

- Modify any existing book entry. Update the isbn, title, author, rating, or comment to keep your records current.

3. Delete a Book Entry

- Remove any book entry from your collection when you no longer need it. This action is permanent, so be sure before you delete!

4. Sort Book Entries

- Organize your book entries for easier navigation and retrieval using the following sorting options:

  - Sort by Title: Arrange your entries alphabetically based on the book title.
  - Sort by Rating: View your entries in order of their ratings, from highest to lowest.
  - Sort by Recency: See your most recently added.

### SQL Schema
The books table stores all the information for each book entry. Here's the schema for creating the table:

```sql
CREATE TABLE IF NOT EXISTS books (
    Id INT AUTO_INCREMENT PRIMARY KEY,  -- Unique identifier for each book
    Isbn VARCHAR(13) NOT NULL UNIQUE,   -- ISBN-13 of the book (unique)
    Title VARCHAR(255) NOT NULL,        -- Title of the book
    Date DATE DEFAULT CURRENT_DATE,     -- Date when the book is added
    Rating TINYINT,                     -- Rating for the book (1 to 5)
    Comment TEXT,                       -- Comment about the book
    Author VARCHAR(255),                -- Author of the book
    Image_Url VARCHAR(255)              -- URL for the book cover image
);
```

### 🛜 [Live Site](https://princess-book-notes.onrender.com)

### Demo
https://github.com/user-attachments/assets/aed228ae-95ff-4cdb-ad16-a84171800f18

### Credits

- [REST API with Node.js, Express.js and MySQL2](https://medium.com/@sahni_hargun/rest-api-with-node-js-express-and-mysql2-86ea9f1db2b7)
- [Book Cover API](https://github.com/w3slley/bookcover-api) - For fetching book cover images.

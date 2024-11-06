const express = require("express");
const app = express();
var methodOverride = require("method-override");
const pool = require("./services/db");
const bookRouter = require("./routes/bookRoutes");
const helper = require("./utils/helper");
require("dotenv").config();
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(
  express.urlencoded({
    extended: true,
  })
);
const PORT = process.env.PORT || 5000;
app.locals.formatDate = helper.formatDate;

pool.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection error:", err);
    process.exit(1); // Stop the application if there is a connection error
  } else {
    console.log("Connected to the database");
    connection.release(); // Release the connection back to the pool
  }
});

app.use(express.static("public"));

app.use("/", bookRouter);

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});

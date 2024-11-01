const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index", {
    meme: null,
  });
});

app.get("/meme", (req, res) => {
  axios
    .get("https://api.imgflip.com/get_memes")
    .then((response) => {
      res.render("index", {
        meme: response.data.data.memes[
          Math.floor(Math.random() * response.data.data.memes.length)
        ],
      });
    })
    .catch((error) => {
      res.render("error", {
        error: error,
      });
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

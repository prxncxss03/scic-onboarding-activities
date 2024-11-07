const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
const PORT = 3000;

app.use(express.static("public"));

/*
The default route (home page) when you visit the root URL (/). It renders the index.ejs view.
The meme: null part is passed to the view to indicate that no meme is displayed initially when the user first visits the page.
*/
app.get("/", (req, res) => {
  res.render("index", {
    meme: null,
  });
});

/*
This route is used to fetch a random meme from the Imgflip API.
The axios.get() method makes a GET request to the Imgflip API at https://api.imgflip.com/get_memes to retrieve a list of memes.
If an error occurs while fetching the meme data, an error page (error.ejs) is rendered, passing the error information to the view. This is helpful for debugging or showing an error message to the user.
*/
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
  console.log(`Server is running on port: ${PORT}`);
});

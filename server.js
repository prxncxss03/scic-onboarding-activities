const express = require("express");
const bodyParser = require("body-parser");
var methodOverride = require("method-override");
const ejs = require("ejs");
const app = express();

const data = require("./content/blogs.json");
const port = 3000;
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

const upload = require("./middlewares/multerConfig");

app.get("/", (req, res) => {
  res.render("index", {
    posts: data,
    page: "home",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    page: "about",
  });
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    page: "contact",
  });
});

app.get("/blog-creation", (req, res) => {
  res.render("blog-creation", {
    page: "blog-creation",
  });
});

app.get("/blog/:id", (req, res) => {
  const id = req.params.id;
  const post = data.find((post) => post.id == id);
  res.render("blog", {
    post,
    page: "blog",
  });
});

app.post("/blog-create", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.send(err);
    } else {
      if (!req.file) {
        res.send("Error: No File Selected!");
      }
      const { title, content } = req.body;
      const newPost = {
        id: data.length + 1,
        title: title.charAt(0).toUpperCase() + title.slice(1),
        content: content.trim(),
        image_url: "/images/" + req.file.filename,
        date: new Date().toLocaleDateString(),
      };
      data.push(newPost);
      res.render("index", {
        posts: data,
        page: "home",
      });
    }
  });
});

app.put("/blog/:id", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.send(err);
    }

    const id = req.params.id;
    const postIndex = data.findIndex((post) => post.id == id);
    if (postIndex === -1) {
      return res.status(404).send("Blog Post not found");
    }

    const { title, content } = req.body;
    data[postIndex] = {
      id: id,
      title: title.charAt(0).toUpperCase() + title.slice(1),
      content: content.trim(),
      image_url: req.file
        ? "/images/" + req.file.filename
        : data[postIndex].image_url,
      date: new Date().toLocaleDateString(),
    };

    res.render("index", {
      posts: data,
      page: "home",
    });
  });
});

app.delete("/blog/:id", (req, res) => {
  const id = req.params.id;
  const postIndex = data.findIndex((post) => post.id == id);
  data.splice(postIndex, 1);
  if (postIndex === -1) {
    res.status(404).json({
      message: "Blog Post not found",
    });
  } else {
    res.json({
      message: "Blog Post deleted successfully",
    });
  }
});

// contact form
app.post("/send-message", (req, res) => {
  const { name } = req.body;
  res.render("email-confirmation", {
    name: name,
    page: "email-confirmation",
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

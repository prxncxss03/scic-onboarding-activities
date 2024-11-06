const express = require('express');
const app = express()
var methodOverride = require('method-override')
const connection = require('./services/db');
const bookRouter = require('./routes/bookRoutes');
const helper = require('./utils/helper');
require('dotenv').config();
app.set('view engine', 'ejs')
app.use(express.json());
app.use(express.static('public'));
app.use(methodOverride('_method'))
app.use(
  express.urlencoded({
    extended: true,
  })
);
const PORT = process.env.PORT || 5000;
app.locals.formatDate = helper.formatDate;
connection.connect((err)=> {
  if (err) {
    throw err
  }
  console.log("Connected to database")
})

app.use(express.static("public"));

app.use('/', bookRouter);

app.listen(PORT, ()=> {
  console.log(`server is listening on port ${PORT}`)
})
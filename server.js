const express = require("express");
const articleRouter = require('./routes/articles');
const mongoose = require('mongoose');
const Article = require('./models/article')
const methodOverride = require('method-override')
const app = express();

let connectionString = "mongodb://localhost/blog"

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(client => {
    console.log('Connected to Database');
  })
  .catch(error => console.error(error));

app.set("view engine", "ejs")

app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))
app.use('/articles', articleRouter)

app.get("/", async (req, res) => {
  const articles = await Article.find().sort({createdAt: 'desc'})
  res.render("articles/index", { articles: articles});
});

app.listen(5000);
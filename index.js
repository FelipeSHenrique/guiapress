const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const connection = require("./database/database");

// Carregando minhas controllers no arquivo principal
const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");
const UsersController = require("./users/UsersController");

// Importando meus MODELS
const Article = require("./articles/Aticle");
const Category = require("./categories/Category");
const User = require("./users/User");

//VIEW ENGINE
app.set('view engine', 'ejs');

// Session
app.use(session({
  secret: "qualquercoisa", cookie: { maxAge: 3000000 }
}));

//Static files
app.use(express.static('public'));

//Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); //Aceitar dados em json

// Conexão com banco de dados
connection.authenticate()
  .then(() => {
    console.log("Conexão feita com sucesso");
  }).catch((error) => {
    console.log(error);
  });

//ROTAS

app.use("/", categoriesController);
app.use("/", articlesController);
app.use("/", UsersController);

app.get("/", (req, res) => {
  Article.findAll({
    order: [
      ['id', 'DESC']
    ],
    limit: 4
  }).then(articles => {
    Category.findAll().then(categories => {
      res.render("index", { articles: articles, categories: categories });
    });
  });
});

app.get("/:slug", (req, res) => {
  var slug = req.params.slug;
  Article.findOne({
    where: {
      slug: slug
    }
  }).then(article => {
    if (article != undefined) {
      Category.findAll().then(categories => {
        res.render("article", { article: article, categories: categories });
      });

    } else {
      res.redirect("/");
    }
  }).catch(err => {
    res.redirect("/");
  });
});

app.get("/category/:slug", (req, res) => {
  var slug = req.params.slug;
  Category.findOne({
    where: {
      slug: slug
    },
    include: [{ model: Article }]
  }).then(category => {
    if (category != undefined) {

      Category.findAll().then(categories => {
        res.render("index", { articles: category.articles, categories: categories });
      });

    } else {
      res.redirect("/");
    }
  }).catch(err => {
    res.redirect("/");
  });
});

app.listen(3333, () => {
  console.log("O servidor está rodando!");
});

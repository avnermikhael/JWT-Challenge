const db = require("../app/db.js");
const Article = db.article;
const User = db.user;
const asyncMiddleware = require("express-async-handler");

exports.addArticle = asyncMiddleware(async (req, res) => {
  // Add article to Database
  const userId = req.params.id;
  await Article.create({
    title: req.body.title,
    content: req.body.content,
    status: false,
    userId: userId
  });
  res.status(201).send({
    status: "New Article added, awaiting admin confirmation!"
  });
});

//delete article by id
exports.deleteArticle = asyncMiddleware(async (req, res) => {
  const article_id = req.params.id;
  await Article.destroy({ where: { id: article_id } });
  res.status(201).send({
    status: "Article deleted!"
  });
});

//update article status by id
exports.updateArticle = asyncMiddleware(async (req, res) => {
  await Article.update(
    {
      status: true
    },
    { where: { id: req.params.id } }
  );
  res.status(201).send({
    status: "Article posted in website!"
  });
});

//show article by user id
exports.showArticle = asyncMiddleware(async (req, res) => {
  const user = await User.findOne({
    where: { id: req.params.id },
    attributes: ["name", "username", "email"],
    include: [
      {
        model: Article,
        attributes: ["title", "content"]
      }
    ]
  });
  res.status(200).json({
    data: user
  });
});

//show all articles
exports.showAll = asyncMiddleware(async (req, res) => {
  const article = await Article.findAll({
    where: { status: false },
    attributes: ["id", "title", "content", "userId"]
  });
  res.status(200).json({
    description: "Showing all articles",
    data: article
  });
});

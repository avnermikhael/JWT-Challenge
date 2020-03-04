const db = require("../app/db.js");
const Article = db.article;
const User = db.user;
const asyncMiddleware = require("express-async-handler");

exports.addArticle = asyncMiddleware(async (req, res) => {
  // Add article to Database
  const userId = req.params.id;
  await Article.create({
    title: req.body.newArticle.title,
    content: req.body.newArticle.content,
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

//suspend article by id
exports.suspendArticle = asyncMiddleware(async (req, res) => {
  await Article.update(
    {
      status: false
    },
    { where: { id: req.params.id } }
  );
  res.status(201).send({
    status: "Article posted in website!"
  });
});

//show article by user id
exports.showArticle = asyncMiddleware(async (req, res) => {
  const article = await Article.findAll({
    where: { userId: req.params.id },
    attributes: ["id", "title", "content", "userId", "status"]
  });

  res.status(200).json({
    data: article
  });
});

//show article by user id
exports.showOneArticle = asyncMiddleware(async (req, res) => {
  const article = await Article.findOne({
    where: { id: req.params.id },
    attributes: ["id", "title", "content", "status"]
  });
  res.status(200).json({
    data: article
  });
});

//show all inactive articles
exports.showAll = asyncMiddleware(async (req, res) => {
  const article = await Article.findAll({
    where: { status: false },
    attributes: ["id", "title", "content", "userId", "status"]
  });
  res.status(200).json({
    description: "Showing all articles",
    data: article
  });
});

//show all active articles
exports.showAllActive = asyncMiddleware(async (req, res) => {
  const article = await Article.findAll({
    where: { status: true },
    attributes: ["id", "title", "content", "userId", "status"],
    include: [
      {
        model: User,
        attributes: ["id", "username"]
      }
    ]
  });
  res.status(200).json({
    description: "Showing all articles",
    data: article
  });
});

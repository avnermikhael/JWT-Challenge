const db = require("../app/db.js");
const User = db.user;
const Article = db.article;
const Comment = db.comment;
const asyncMiddleware = require("express-async-handler");

exports.addComment = asyncMiddleware(async (req, res) => {
  // Add comment to Database
  const userId = req.params.user_id;
  const articleId = req.params.article_id;

  await Comment.create({
    content: req.body.content,
    status: false,
    userId: userId,
    articleId: articleId
  });
  res.status(201).send({
    status: "New Comment added, awaiting admin confirmation!"
  });
});

//delete comment by id
exports.deleteComment = asyncMiddleware(async (req, res) => {
  const comment_id = req.params.id;
  await Comment.destroy({ where: { id: comment_id } });
  res.status(201).send({
    status: "Comment deleted!"
  });
});

//update comment status by id
exports.updateComment = asyncMiddleware(async (req, res) => {
  await Comment.update(
    {
      status: true
    },
    { where: { id: req.params.id } }
  );
  res.status(201).send({
    status: "Comment posted in website!"
  });
});

//show comment by article id
exports.showComments = asyncMiddleware(async (req, res) => {
  const article = await Article.findOne({
    where: { id: req.params.id },
    attributes: ["title", "content"],
    include: [
      {
        model: Comment,
        attributes: ["userId", "content"]
      }
    ]
  });
  res.status(200).json({
    data: article
  });
});

exports.ordering = asyncMiddleware(async (req, res) => {
  // Save order to Database
  console.log("Processing func -> Ordering");
  const user = await User.findOne({
    where: { id: req.params.id_user }
  });
  const books = await Book.findOne({
    where: { id: req.params.id_buku }
  });
  await user.addBooks(books);
  res.status(201).send({
    status: "Order registered successfully!"
  });
});

//show all orders
exports.orders = asyncMiddleware(async (req, res) => {
  const user = await User.findAll({
    attributes: ["name", "username", "email"],
    include: [
      {
        model: Book,
        attributes: ["title", "author", "page", "language", "publisher_id"],
        through: {
          attributes: ["userId", "bookId"]
        }
      }
    ]
  });
  res.status(200).json({
    description: "All Order",
    data: user
  });
});

//find order by user id
exports.getOrder = asyncMiddleware(async (req, res) => {
  const user = await User.findOne({
    where: { id: req.params.id },
    attributes: ["name", "username", "email"],
    include: [
      {
        model: Book,
        attributes: ["title", "author", "page", "language", "publisher_id"],
        through: {
          attributes: ["userId", "bookId"]
        }
      }
    ]
  });
  res.status(200).json({
    data: user
  });
});

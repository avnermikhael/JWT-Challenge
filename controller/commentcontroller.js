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
    content: req.body.newComment.content,
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
        where: { status: true },
        require: false,
        required: false,
        attributes: ["id", "userId", "status", "content"],
        include: [
          {
            model: User,
            attributes: ["id", "username"]
          }
        ]
      }
    ]
  });
  res.status(200).json({
    data: article
  });
});

//show all inactive comments
exports.showInactiveComments = asyncMiddleware(async (req, res) => {
  const comment = await Comment.findAll({
    where: { status: false },
    attributes: ["id", "content", "userId"],
    include: [
      {
        model: User,
        attributes: ["id", "username"]
      }
    ]
  });
  res.status(200).json({
    data: comment
  });
});

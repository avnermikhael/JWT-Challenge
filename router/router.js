const verifySignUp = require("./verifySignUp");

const authController = require("../controller/authController.js");
const userController = require("../controller/userController.js");
const commentController = require("../controller/commentcontroller.js");
const articleController = require("../controller/articleController.js");

module.exports = function(app) {
  ///////////////////////////////////ini untuk BOOK/////////////////////////////////////////
  /* GET all inactive article. */
  app.get("/articles", articleController.showAll);

  /* GET all active article. */
  app.get("/activearticles", articleController.showAllActive);

  /* GET article by user ID. */
  app.get("/article/:id", articleController.showArticle);

  /* GET article by ID. */
  app.get("/articles/:id", articleController.showOneArticle);

  /* ADD article. */
  app.post("/articles/:id", articleController.addArticle);

  /* UPDATE article status. */
  app.put("/articles/:id", articleController.updateArticle);

  /* SUSPEND article. */
  app.put("/suspendarticles/:id", articleController.suspendArticle);

  /* DELETE article. */
  app.delete("/articles/:id", articleController.deleteArticle);

  ////////////////////////////////////ini untuk USER/////////////////////////////////////////////
  /* REGISTER user. */
  app.post(
    "/register",
    [verifySignUp.checkDuplicateUserNameOrEmail],
    authController.signup
  );
  /* LOGIN user. */
  app.post("/login", authController.signin);

  /* Update Role user. */
  app.put("/users/:id", userController.userUpdate);

  /* SHOW all users. */
  app.get(
    "/users",
    // [authJwt.verifyToken],

    userController.users
  );

  /* SHOW user by ID*/
  app.get(
    "/users/:id",
    // [authJwt.verifyToken],
    userController.userContent
  );

  ///////////////////////////ini untuk ORDER///////////////////////////////////////////////////

  /* DELETE comment. */
  app.delete("/comments/:id", commentController.deleteComment);

  /* ADD comment. */
  app.post(
    "/comments/:user_id/:article_id",
    // [authJwt.verifyToken],
    commentController.addComment
  );

  /* UPDATE comment status. */
  app.put("/comments/:id", commentController.updateComment);

  /* SHOW comments by article ID. */
  app.get("/comments/:id", commentController.showComments);

  /* SHOW all inactive comments */
  app.get("/inactivecomments", commentController.showInactiveComments);

  // error handler 404
  app.use(function(req, res, next) {
    return res.status(404).send({
      status: 404,
      message: "Not Found"
    });
  });
  // error handler 500
  app.use(function(err, req, res, next) {
    return res.status(500).send({
      error: err
    });
  });
};

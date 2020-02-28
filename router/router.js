const verifySignUp = require("./verifySignUp");

const authController = require("../controller/authController.js");
const userController = require("../controller/userController.js");
const commetController = require("../controller/commentcontroller.js");
const articleController = require("../controller/articleController.js");

module.exports = function(app) {
  ///////////////////////////////////ini untuk BOOK/////////////////////////////////////////
  /* GET all article. */
  app.get("/articles", articleController.showAll);

  /* GET article by user ID. */
  app.get("/article/:id", articleController.showArticle);

  /* ADD article. */
  app.post("/addarticle/:id", articleController.addArticle);

  /* UPDATE article status. */
  app.put("/article/:id", articleController.updateArticle);

  /* DELETE article. */
  app.delete("/deletearticle/:id", articleController.deleteArticle);

  ////////////////////////////////////ini untuk USER/////////////////////////////////////////////
  /* REGISTER user. */
  app.post(
    "/register",
    // [
    //   verifySignUp.checkDuplicateUserNameOrEmail
    // ],
    authController.signup
  );
  /* LOGIN user. */
  app.post("/login", authController.signin);

  /* Update Role user. */
  app.put("/update/:id", userController.userUpdate);

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
  app.delete("/comments/:id", commetController.deleteComment);

  /* GET order by user ID. */
  app.get(
    "/orders/:id"
    // [authJwt.verifyToken],
    // orderController.getOrder
  );

  /* ADD comment. */
  app.post(
    "/comments/:user_id/:article_id",
    // [authJwt.verifyToken],
    commetController.addComment
  );

  /* UPDATE comment status. */
  app.put("/comments/:id", commetController.updateComment);

  /* SHOW comments by article ID. */
  app.get("/comments/:id", commetController.showComments);

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

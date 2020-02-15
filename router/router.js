const verifySignUp = require("./verifySignUp");
const authJwt = require("./verifyJwtToken");
const authController = require("../controller/authController.js");
const userController = require("../controller/userController.js");
const orderController = require("../controller/orderController.js");
const bookController = require("../controller/bookController.js");

module.exports = function(app) {
  ///////////////////////////////////ini untuk BOOK/////////////////////////////////////////
  /* GET book. */
  app.get("/books", [authJwt.verifyToken], bookController.showAll);

  /* GET book by ID. */
  app.get("/books/:id", [authJwt.verifyToken], bookController.showBook);

  /* ADD book. */
  app.post(
    "/books",
    [authJwt.verifyToken, authJwt.isAdmin],
    bookController.addbook
  );

  /* UPDATE book. */
  app.put(
    "/books/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    bookController.updateBook
  );

  /* DELETE book. */
  app.delete(
    "/books/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    bookController.deleteBook
  );

  ////////////////////////////////////ini untuk USER/////////////////////////////////////////////
  /* REGISTER user. */
  app.post(
    "/register",
    [
      verifySignUp.checkDuplicateUserNameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    authController.signup
  );
  /* LOGIN user. */
  app.post("/login", authController.signin);

  /* SHOW all users. */
  app.get("/users", [authJwt.verifyToken], userController.users);

  ///////////////////////////ini untuk ORDER///////////////////////////////////////////////////
  /* GET all orders. */
  app.get("/orders", [authJwt.verifyToken], orderController.orders);

  /* GET order by user ID. */
  app.get("/orders/:id", [authJwt.verifyToken], orderController.getOrder);

  /* ADD order. */
  app.post("/orders/:id", [authJwt.verifyToken], orderController.ordering);

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

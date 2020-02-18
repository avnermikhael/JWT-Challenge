const jwt = require("jsonwebtoken");
const config = require("../app/config.js");
const db = require("../app/db.js");
const Book = db.book;

checkDuplicateBookAndAuthor = (req, res, next) => {
  // -> Check
  Book.findOne({
    where: {
      title: req.body.title,
      author: req.body.author
    }
  }).then(book => {
    if (book) {
      res.status(400).send("Fail -> Book with same author is already exist!");
      return;
    }
    next();
  });
};

const authBook = {};
authBook.checkDuplicateBookAndAuthor = checkDuplicateBookAndAuthor;

module.exports = authBook;

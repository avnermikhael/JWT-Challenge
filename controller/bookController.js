const db = require("../app/db.js");
const Book = db.book;
const asyncMiddleware = require("express-async-handler");

exports.addbook = asyncMiddleware(async (req, res) => {
  // Add book to Database
  const book = await Book.create({
    title: req.body.data.title,
    author: req.body.data.author,
    page: req.body.data.page,
    language: req.body.data.language,
    publisher_id: req.body.data.publisher_id
  });
  res.status(201).send({
    status: "New book added successfully!"
  });
});

//delete book by id
exports.deleteBook = asyncMiddleware(async (req, res) => {
  console.log("ini idnya" + req.params.id);
  const book_id = req.params.id;
  const book = await Book.destroy({ where: { id: book_id } });
  res.status(201).send({
    status: "Book deleted!"
  });
});

//update book by id
exports.updateBook = asyncMiddleware(async (req, res) => {
  await Book.update(
    {
      title: req.body.title,
      author: req.body.author,
      page: req.body.page,
      language: req.body.language,
      publisher_id: req.body.publisher_id
    },
    { where: { id: req.params.id } }
  );
  res.status(201).send({
    status: "Book updated successfully!"
  });
});

//show book by id
exports.showBook = asyncMiddleware(async (req, res) => {
  const book = await Book.findOne({
    where: { id: req.params.id },
    attributes: ["title", "author", "page", "language", "publisher_id"]
  });
  res.status(200).json({
    description: "Showing book",
    data: book
  });
});

//show all books
exports.showAll = asyncMiddleware(async (req, res) => {
  const book = await Book.findAll({
    attributes: ["id", "title", "author", "page", "language", "publisher_id"]
  });
  res.status(200).json({
    description: "Showing all book",
    data: book
  });
});

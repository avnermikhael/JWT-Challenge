const db = require("../app/db.js");
const User = db.user;
const asyncMiddleware = require("express-async-handler");

//get all users
exports.users = asyncMiddleware(async (req, res) => {
  const user = await User.findAll({
    attributes: ["id", "name", "username", "email", "admin", "status"]
  });
  res.status(200).json({
    description: "All User",
    data: user
  });
});

//get user by ID
exports.userContent = asyncMiddleware(async (req, res) => {
  const user = await User.findOne({
    where: { id: req.params.id },
    attributes: ["id", "name", "username", "email", "admin", "status"]
  });
  res.status(200).json({
    data: user
  });
});

//update status user by id
exports.userUpdate = asyncMiddleware(async (req, res) => {
  await User.update(
    {
      status: req.body.status
    },
    { where: { id: req.params.id } }
  );
  res.status(201).send({
    status: "Status updated successfully!"
  });
});

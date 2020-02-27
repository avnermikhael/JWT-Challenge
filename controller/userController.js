const db = require("../app/db.js");
const User = db.user;
const Role = db.role;
const asyncMiddleware = require("express-async-handler");

exports.users = asyncMiddleware(async (req, res) => {
  const user = await User.findAll({
    attributes: ["id", "name", "username", "email"],
    include: [
      {
        model: Role,
        attributes: ["id", "name"],
        through: {
          attributes: ["userId", "roleId"]
        }
      }
    ]
  });
  res.status(200).json({
    description: "All User",
    data: user
  });
});

exports.userContent = asyncMiddleware(async (req, res) => {
  const user = await User.findOne({
    where: { id: req.params.id },
    attributes: ["name", "username", "email"],
    include: [
      {
        model: Role,
        attributes: ["id", "name"],
        through: {
          attributes: ["userId", "roleId"]
        }
      }
    ]
  });
  res.status(200).json({
    data: user
  });
});

//update user role by id
exports.userUpdate = asyncMiddleware(async (req, res) => {
  const user = await User.findOne({
    where: { id: req.params.id },
    attributes: ["name", "username", "email"],
    include: [
      {
        model: Role,
        attributes: ["id", "name"],
        through: {
          attributes: ["userId", "roleId"]
        }
      }
    ]
  });
  const roles = await Role.findAll({
    where: {
      name: {
        [Op.or]: req.body.roles
      }
    }
  });
  await user.setRoles(roles);
});

exports.adminBoard = asyncMiddleware(async (req, res) => {
  const user = await User.findOne({
    where: { id: req.userId },
    attributes: ["name", "username", "email"],
    include: [
      {
        model: Role,
        attributes: ["id", "name"],
        through: {
          attributes: ["userId", "roleId"]
        }
      }
    ]
  });
  res.status(200).json({
    description: "Admin Board",
    user: user
  });
});

exports.managementBoard = asyncMiddleware(async (req, res) => {
  const user = await User.findOne({
    where: { id: req.userId },
    attributes: ["name", "username", "email"],
    include: [
      {
        model: Role,
        attributes: ["id", "name"],
        through: {
          attributes: ["userId", "roleId"]
        }
      }
    ]
  });
  res.status(200).json({
    description: "Management Board",
    user: user
  });
});

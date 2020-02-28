const db = require("../app/db.js");
const config = require("../app/config.js");
const User = db.user;
const asyncMiddleware = require("express-async-handler");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = asyncMiddleware(async (req, res) => {
  // Save User to Database
  console.log("Processing func -> SignUp");
  await User.create({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    admin: true,
    status: true
  });
  res.status(201).send({
    status: "User registered successfully!"
  });
});

exports.signin = asyncMiddleware(async (req, res) => {
  console.log("Sign-In");
  const user = await User.findOne({
    where: {
      username: req.body.username
    }
  });
  if (!user) {
    return res.status(404).send({
      auth: false,
      accessToken: null,
      reason: "User Not Found!"
    });
  }

  const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
  if (!passwordIsValid) {
    return res.status(401).send({
      auth: false,
      accessToken: null,
      reason: "Invalid Password!"
    });
  } else if (user.status === false) {
    return res.status(401).send({
      auth: false,
      accessToken: null,
      reason: "User blocked!"
    });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username },

    config.secret,
    {
      expiresIn: 86400 // expires in 24 hours
    }
  );

  res.status(200).send({
    auth: true,
    type: "Bearer",
    accessToken: token,
    admin: user.admin,
    id_user: user.id
  });
});

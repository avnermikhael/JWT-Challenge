const db = require("../app/db.js");
const config = require("../app/config.js");
const User = db.user;
const Role = db.role;
const asyncMiddleware = require("express-async-handler");
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(
  `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`
);

/*
SG.K89eLaPkSxm2P0OFLfkCtA.Y__SFKYiULLh_tmt9ackBqBsZUGfHGIiZPSISmlaeJs
*/

exports.signup = asyncMiddleware(async (req, res) => {
  // Save User to Database
  console.log("Processing func -> SignUp");
  // const user = await User.create({
  //   name: req.body.name,
  //   username: req.body.username,
  //   email: req.body.email,
  //   password: bcrypt.hashSync(req.body.password, 8)
  // });
  // const roles = await Role.findAll({
  //   where: {
  //     name: {
  //       [Op.or]: req.body.roles
  //     }
  //   }
  // });
  // await user.setRoles(roles);

  // sgMail.setApiKey(
  //   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
  // );

  const msg = {
    to: req.body.email,
    from: "admin@jewete.com",
    subject: "Thank you for registering!",
    text: "Let us start by ordering a book!"
    // html: "<strong>and easy to do anywhere, even with Node.js</strong>"
  };
  sgMail.send(msg, (error, result) => {
    if (error) {
      res.status(400).send({ status: error });
    } else {
      res.status(200).send({ status: result });
    }
  });

  // res.status(201).send({
  //   status: "User registered successfully!"
  // });
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
  }

  const token = jwt.sign({ id: user.id }, config.secret, {
    expiresIn: 86400 // expires in 24 hours
  });

  res.status(200).send({
    auth: true,
    type: "Bearer",
    accessToken: token
  });
});

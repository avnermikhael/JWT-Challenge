const env = require("./env.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  logging: false,
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("../model/user.js")(sequelize, Sequelize);
db.article = require("../model/article.js")(sequelize, Sequelize);
db.comment = require("../model/comment.js")(sequelize, Sequelize);

db.user.hasMany(db.article, {
  foreignKey: "userId"
});

db.user.hasMany(db.comment, {
  foreignKey: "userId"
});

db.article.hasMany(db.comment, {
  foreignKey: "articleId"
});

// db.user.belongsToMany(db.book, {
//   through: "book_user",
//   foreignKey: "userId",
//   otherKey: "bookId"
// });
// db.book.belongsToMany(db.user, {
//   through: "book_user",
//   foreignKey: "bookId",
//   otherKey: "userId"
// });

// db.role.belongsToMany(db.user, {
//   through: "user_roles",
//   foreignKey: "roleId",
//   otherKey: "userId"
// });
// db.user.belongsToMany(db.role, {
//   through: "user_roles",
//   foreignKey: "userId",
//   otherKey: "roleId"
// });

module.exports = db;

module.exports = (sequelize, Sequelize) => {
  const Article = sequelize.define("articles", {
    title: {
      type: Sequelize.STRING
    },
    content: {
      type: Sequelize.TEXT
    },
    status: {
      type: Sequelize.BOOLEAN
    }
  });
  return Article;
};

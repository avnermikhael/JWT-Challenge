module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("comments", {
    content: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.BOOLEAN
    }
  });
  return Comment;
};

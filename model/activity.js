module.exports = (sequelize, Sequelize) => {
  const Activity = sequelize.define("activities", {
    date: {
      type: Sequelize.DATEONLY
    },
    activity: {
      type: Sequelize.STRING
    },
    duration: {
      type: Sequelize.INTEGER
    },
    details: {
      type: Sequelize.STRING
    },
    weight: {
      type: Sequelize.FLOAT
    }
  });
  return Activity;
};

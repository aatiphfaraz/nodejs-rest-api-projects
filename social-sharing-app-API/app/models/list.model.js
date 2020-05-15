module.exports = (sequelize, Sequelize) => {
  const List = sequelize.define('lists', {
    title: {
      type: Sequelize.STRING,
    },
    content: {
      type: Sequelize.STRING,
    },
    userId: {
      type: Sequelize.INTEGER,
    },
  });

  return List;
};

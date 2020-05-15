module.exports = (sequelize, Sequelize) => {
  const Friend = sequelize.define('friends', {
    uuid: {
      type: Sequelize.INTEGER,
    },
    friendId: {
      type: Sequelize.INTEGER,
    },
    ative: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  });

  return Friend;
};

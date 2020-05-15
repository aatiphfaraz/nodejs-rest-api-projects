module.exports = (sequelize, Sequelize) => {
  const Messages = sequelize.define('messages', {
    from_user_id: {
      type: Sequelize.INTEGER,
    },
    to_user_id: {
      type: Sequelize.INTEGER,
    },
    message: {
      type: Sequelize.STRING,
    },
  });

  return Messages;
};

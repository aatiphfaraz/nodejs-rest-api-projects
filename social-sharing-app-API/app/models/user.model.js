module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    token:{
      type: Sequelize.INTEGER
    },
    isValid: {
      type: Sequelize.BOOLEAN ,
      defaultValue: false
    },
    path:{
      type: Sequelize.STRING,
      defaultValue: null
    }
  });

  return User;
};

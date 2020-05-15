const db = require('../models');
const userModel = db.users;
const roleModel = db.roles;

createUser = async (un, em, pass, token, file) => {
  try {
    roleModel.belongsToMany(userModel, {
      through: 'user_roles',
      foreignKey: 'roleId',
      otherKey: 'userId',
    });
    userModel.belongsToMany(roleModel, {
      through: 'user_roles',
      foreignKey: 'userId',
      otherKey: 'roleId',
    });
    const user = await userModel.create({
      username: un,
      email: em,
      password: pass,
      token: token,
    });
    if (typeof file !== 'undefined') {
      user.path = file.path;
      user.save();
    }
    return user;
  } catch (err) {
    console.log(err);
  }
};

findRole = async (roles, user) => {
  try {
    const role = await roleModel.findAll({
      where: {
        name: roles,
      },
    });
    console.log(role);
    user.setRoles(role);
  } catch (err) {
    console.log(err);
  }
};

userRole = async (user) => {
  try {
    await user.setRoles([1]);
  } catch (err) {
    console.log(err);
  }
};

checkValid = async (un) => {
  try {
    roleModel.belongsToMany(userModel, {
      through: 'user_roles',
      foreignKey: 'roleId',
      otherKey: 'userId',
    });
    userModel.belongsToMany(roleModel, {
      through: 'user_roles',
      foreignKey: 'userId',
      otherKey: 'roleId',
    });
    return await userModel.findOne({
      where: {
        username: un,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

validateUser = async (id) => {
  try {
    const user = await userModel.findOne({
      where: {
        token: id,
      },
    });
    user.isValid = true;
    user.save();
  } catch (err) {
    console.log(err);
  }
};

const authService = {
  createUser: createUser,
  findRole: findRole,
  checkValid: checkValid,
  validateUser: validateUser,
  userRole: userRole,
};

module.exports = authService;

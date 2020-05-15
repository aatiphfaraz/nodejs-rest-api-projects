const db = require('../models');
const userModel = db.users;
const messageModel = db.messages;
const friendModel = db.friends;
const listModel = db.lists;
const { Op } = require('sequelize');

getUsers = async (userId) => {
  try {
    return await userModel.findAll({
      attributes: ['id', 'username', 'email'],
      where: { id: { [Op.not]: userId } },
    });
  } catch (err) {
    console.log(err);
  }
};

remUser = async (id) => {
  try {
    const user = await userModel.findOne({ where: { id: id } });

    await userModel.destroy({ where: { id: id } });

    await messageModel.destroy({
      where: {
        [Op.or]: [{ from_user_id: id }, { to_user_id: id }],
      },
    });

    await friendModel.destroy({
      where: {
        [Op.or]: [{ uuid: id }, { friendId: id }],
      },
    });

    await listModel.destroy({
      where: {
        userId: id,
      },
    });
    return user;
  } catch (err) {
    console.log(err);
  }
};

getUser = async (userId) => {
  try {
    return await userModel.findOne({ where: { id: userId } });
  } catch (err) {
    console.log(err);
  }
};

uploadImg = async (user, file) => {
  try {
    await userModel.findOne({ where: { id: user.id } });

    user.path = await file.path;

    await user.save();
  } catch (err) {
    console.log(err);
  }
};

const userService = {
  getUsers: getUsers,
  remUser: remUser,
  uploadImg: uploadImg,
  getUser: getUser,
};

module.exports = userService;

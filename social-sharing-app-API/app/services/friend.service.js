const db = require('../models');
const userModel = db.users;
const friendModel = db.friends;
const { Op } = require('sequelize');

// delete below
followUser = async (userId, friendId) => {
  try {
    const user = await friendModel.findOne({
      where: { uuid: userId, friendId: friendId },
    });
    if (!user) {
      return await friendModel.create({
        uuid: userId,
        friendId: friendId,
        active: 1,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

getFollowing = async (userId) => {
  try {
    const following = await friendModel.findAll({
      where: { uuid: userId },
      attributes: ['friendId'],
    });
    const arr = following.map((x) => x.dataValues.friendId);
    const users = await userModel.findAll({
      where: { id: { [Op.in]: arr } },
      attributes: ['id', 'username', 'email'],
    });
    return users;
  } catch (err) {
    console.log(err);
  }
};

getFollowers = async (userId) => {
  try {
    const followers = await friendModel.findAll({
      where: { friendId: userId },
      attributes: ['uuid'],
    });

    const arr = followers.map((x) => x.dataValues.uuid);

    const users = await userModel.findAll({
      where: { id: { [Op.in]: arr } },
      attributes: ['id', 'username', 'email'],
    });

    return users;
  } catch (err) {
    console.log(err);
  }
};

getUsers = async (userId) => {
  try {
    const following = await friendModel.findAll({
      where: { uuid: userId },
      attributes: ['friendId'],
    });

    const arr = following.map((x) => x.dataValues.friendId);
    arr.push(userId);
    const users = await userModel.findAll({
      where: { id: { [Op.notIn]: arr } },
      attributes: ['id', 'username', 'email'],
    });

    return users;
  } catch (err) {
    console.log(err);
  }
};
unfollowUser = async (userId, friendId) => {
  try {
    await friendModel.destroy({ where: { uuid: userId, friendId: friendId } });
  } catch (err) {
    console.log(err);
  }
};

const friendService = {
  followUser: followUser,
  getFollowers: getFollowers,
  getFollowing: getFollowing,
  getUsers: getUsers,
  unfollowUser: unfollowUser,
};

module.exports = friendService;

const db = require('../models');
const { Op } = require('sequelize');
const messageModel = db.messages;

addMessage = async (userId, toUser, message) => {
  try {
    return await messageModel.create({
      from_user_id: userId,
      to_user_id: toUser,
      message: message,
    });
  } catch (err) {
    console.log(err);
  }
};

getMessages = async (fromUser, toUser) => {
  try {
    return await messageModel.findAll({
      where: {
        [Op.or]: [
          { from_user_id: fromUser, to_user_id: toUser },
          { from_user_id: toUser, to_user_id: fromUser },
        ],
      },
    });
  } catch (err) {
    console.log(err);
  }
};

const messageService = {
  addMessage: addMessage,
  getMessages: getMessages,
};

module.exports = messageService;

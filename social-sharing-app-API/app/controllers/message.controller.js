const { messageService } = require('../services');

addMessage = (req, res, next) => {
  messageService
    .addMessage(req.userId, req.body.toUser, req.body.message)
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
};

getMessages = (req, res, next) => {
  messageService
    .getMessages(req.userId, req.params.id)
    .then((msgs) => {
      res.send(JSON.stringify(msgs));
    })
    .catch((err) => {
      res.status(404).send({ message: err.message });
    });
};

const messages = {
  addMessage: addMessage,
  getMessages: getMessages,
};

module.exports = messages;

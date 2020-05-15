const messageController = require('../controllers/message.controller');
const { authJwt } = require('../middleware');
const { setResponseHeader } = require('../middleware');

module.exports = function (app) {
  app.use(setResponseHeader.setHeader);

  app.post('/addMsg', [authJwt.verifyToken], messageController.addMessage);

  app.get(
    '/getMessages/:id',
    [authJwt.verifyToken],
    messageController.getMessages
  );
};

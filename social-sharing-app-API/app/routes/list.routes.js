const listController = require('../controllers/list.controller');
const { authJwt } = require('../middleware');
const { setResponseHeader } = require('../middleware');

module.exports = function (app) {
  app.use(setResponseHeader.setHeader);

  app.get('/getAll', [authJwt.verifyToken], listController.getPosts);

  app.post('/delete', listController.remPost);

  app.post('/addPost', [authJwt.verifyToken], listController.addPost);

  app.post('/updatePost', listController.updatePost);
};

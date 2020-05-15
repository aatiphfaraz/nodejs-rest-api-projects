const { authJwt } = require('../middleware');
const userController = require('../controllers/user.controller');
const { setResponseHeader } = require('../middleware');
const multer = require('../utils/multer');

module.exports = function (app) {
  app.use(setResponseHeader.setHeader);

  app.post(
    '/users',
    [authJwt.verifyToken, authJwt.isAdmin],
    userController.remUser
  );

  app.get('/users', authJwt.verifyToken, userController.getUsers);

  app.get(
    '/home/aatif/Documents/node-js-jwt-auth/app/uploads/:img',
    userController.getImg
  );
  app.post(
    '/img',
    multer.upload,
    authJwt.verifyToken,
    userController.uploadImg
  );
};

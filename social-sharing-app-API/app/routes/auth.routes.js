const verifySignUp = require('../utils/verifySignUp');
const multer = require('../utils/multer');
const authController = require('../controllers/auth.controller');
const { setResponseHeader } = require('../middleware');

module.exports = function (app) {
  app.use(setResponseHeader.setHeader);

  app.post(
    '/api/auth/signup',
    [
      multer.upload,
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    authController.signup
  );

  app.post('/api/auth/signin', authController.signin);

  // validates user using mail verification
  app.get('/verify', authController.isValid);
};

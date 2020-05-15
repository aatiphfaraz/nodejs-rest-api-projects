const friendController = require('../controllers/friend.controller');
const { authJwt } = require('../middleware');
const { setResponseHeader } = require('../middleware');

module.exports = function (app) {
  app.use(setResponseHeader.setHeader);

  app.post('/followUser', [authJwt.verifyToken], friendController.followUser);

  app.get('/followers', authJwt.verifyToken, friendController.getFollowers);

  app.get('/following', authJwt.verifyToken, friendController.getFollowing);

  app.get('/getUsers', authJwt.verifyToken, friendController.getUsers);

  app.post('/unfollowUser', authJwt.verifyToken, friendController.unfollowUser);
};

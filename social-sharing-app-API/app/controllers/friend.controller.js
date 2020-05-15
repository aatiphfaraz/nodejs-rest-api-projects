const { friendService } = require('../services');

getUsers = (req, res, next) => {
  friendService
    .getUsers(req.userId)
    .then((user) => {
      res.send(JSON.stringify(user));
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

unfollowUser = (req, res, next) => {
  friendService
    .unfollowUser(req.userId, req.body.friendId)
    .then(() => {
      res.send(this.getUsers);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

followUser = (req, res, next) => {
  friendService
    .followUser(req.userId, req.body.friendId)
    .then(() => {
      res.send(this.getUsers);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

getFollowers = (req, res, next) => {
  friendService
    .getFollowers(req.userId)
    .then((followers) => {
      res.send(followers);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

getFollowing = (req, res, next) => {
  friendService
    .getFollowing(req.userId)
    .then((following) => {
      res.send(following);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

const friendController = {
  getUsers: getUsers,
  followUser: followUser,
  unfollowUser: unfollowUser,
  getFollowers: getFollowers,
  getFollowing: getFollowing,
};

module.exports = friendController;

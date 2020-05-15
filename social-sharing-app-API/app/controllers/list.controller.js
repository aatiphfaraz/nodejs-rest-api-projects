const { listService } = require('../services');

getPosts = (req, res, next) => {
  listService
    .getPosts(req.userId)
    .then((post) => {
      res.send(JSON.stringify(post));
    })
    .catch((err) => {
      res.status(404).send({ message: err.message });
    });
};

remPost = (req, res, next) => {
  listService
    .remPost(req.body.id)
    .then(() => {
      res.send(this.getPosts);
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
};

addPost = (req, res, next) => {
  listService
    .addPost(req.body.title, req.body.content, req.userId)
    .then(() => {
      res.send(this.getPosts);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

updatePost = (req, res, next) => {
  listService
    .updatePost(req.body.id, req.body.title, req.body.content)
    .then((post) => {
      res.send(post);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

const listController = {
  getPosts: getPosts,
  remPost: remPost,
  addPost: addPost,
  updatePost: updatePost,
};

module.exports = listController;

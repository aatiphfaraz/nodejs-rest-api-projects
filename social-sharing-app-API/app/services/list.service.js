const db = require('../models');
const listModel = db.lists;

getPosts = async (userId) => {
  try {
    return await listModel.findAll({
      attributes: ['id', 'title', 'content'],
      where: { userId: userId },
    });
  } catch (err) {
    console.log(err);
  }
};

remPost = async (id) => {
  try {
    return await listModel.destroy({ where: { id: id } });
  } catch (err) {
    console.log(err);
  }
};

addPost = async (title, content, userId) => {
  try {
    return await listModel.create({
      title: title,
      content: content,
      userId: userId,
    });
  } catch (err) {
    console.log(err);
  }
};

updatePost = async (id, title, content) => {
  try {
    const post = await listModel.findByPk(id);
    post.title = title;
    post.content = content;
    post.save();
    return post;
  } catch (err) {
    console.log(err);
  }
};

const listService = {
  getPosts: getPosts,
  remPost: remPost,
  addPost: addPost,
  updatePost: updatePost,
};

module.exports = listService;

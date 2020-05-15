const { userService } = require('../services');
const fs = require('fs');

getUsers = (req, res, next) => {
  userService
    .getUsers(req.userId)
    .then((user) => {
      res.send(JSON.stringify(user));
    })
    .catch((err) => {
      res.send(err);
    });
};

remUser = (req, res, next) => {
  userService
    .remUser(req.body.id)
    .then((user) => {
      // delete img
      if (user.path) {
        fs.unlink(user.path, (err) => {
          if (err) throw err;
          // if no error, file has been deleted successfully
          console.log('File deleted!');
        });
      }
      res.send(this.getUsers);
    })
    .catch((err) => {
      res.send(err);
    });
};

getImg = async (req, res, next) => {
  try {
    let imagename = req.params.img;
    let imagepath = `/home/aatif/Documents/NodeJs/social-sharing-app-API/app/uploads/${imagename}`;
    let image = await fs.readFileSync(imagepath);
    res.end(image);
  } catch (err) {
    console.log(err);
  }
};

uploadImg = async (req, res, next) => {
  userService
    .getUser(req.userId)
    .then((user) => {
      if (req.file) {
        if (user.path) {
          fs.unlink(user.path, (err) => {
            if (err) throw err;
            // if no error, file has been deleted successfully
            console.log('File deleted!');
          });
        }
        userService.uploadImg(user, req.file).then(() => {
          res.send(this.getImg);
        });
      }
    })

    .catch((err) => {
      res.send(err);
    });
};

const userController = {
  getUsers: getUsers,
  remUser: remUser,
  getImg: getImg,
  uploadImg: uploadImg,
};

module.exports = userController;

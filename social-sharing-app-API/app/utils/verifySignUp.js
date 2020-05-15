const db = require('../models');
const ROLES = db.ROLES;
const userModel = db.users;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  userModel
    .findOne({
      where: {
        username: req.body.username,
      },
    })
    .then((user) => {
      if (user) {
        res.status(400).send({
          message: 'Failed! Username is already in use!',
        });
        return;
      }

      // Email
      userModel
        .findOne({
          where: {
            email: req.body.email,
          },
        })
        .then((user) => {
          if (user) {
            res.status(400).send({
              message: 'Failed! Email is already in use!',
            });
            return;
          }

          next();
        });
    });
};

checkRolesExisted = (req, res, next) => {
  console.log(req.body.roles);
  if (req.body.roles) {
    if (!ROLES.includes(req.body.roles)) {
      res.status(400).send({
        message: 'Failed! Role does not exist = ' + req.body.roles[i],
      });
      return;
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted,
};

module.exports = verifySignUp;

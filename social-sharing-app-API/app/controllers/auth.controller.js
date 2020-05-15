const config = require('../config/auth.config');
const { authService } = require('../services');

var nodemailer = require('nodemailer');
var smtpTransport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'aatiphfaraz1@gmail.com',
    pass: '9897592887',
  },
});
var mailOptions, link;

let rand = Math.floor(Math.random() * 100 + 54);

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

exports.signup = (req, res) => {
  // Save User to Database
  authService
    .createUser(
      req.body.username,
      req.body.email,
      bcrypt.hashSync(req.body.password, 8),
      rand,
      req.file
    )
    .then((user) => {
      if (req.body.roles) {
        authService.findRole(req.body.roles, user).then(() => {
          host = req.get('host');
          link = 'http://' + req.get('host') + '/verify?id=' + rand;
          mailOptions = {
            to: req.body.email,
            subject: 'Please confirm your Email account',
            html:
              'Hello,<br> Please Click on the link to verify your email.<br><a href=' +
              link +
              '>Click here to verify</a>',
          };

          smtpTransport.sendMail(mailOptions, function (error, response) {
            if (error) {
              res.end('error');
            } else {
              res.end('sent');
            }
          });

          res.send({ message: 'Sign up verification mail sent!' });
        });
      } else {
        authService.userRole(user).then(() => {
          host = req.get('host');
          link = 'http://' + req.get('host') + '/verify?id=' + rand;
          mailOptions = {
            to: req.body.email,
            subject: 'Please confirm your Email account',
            html:
              'Hello,<br> Please Click on the link to verify your email.<br><a href=' +
              link +
              '>Click here to verify</a>',
          };

          smtpTransport.sendMail(mailOptions, function (error, response) {
            if (error) {
              res.end('error');
            } else {
              res.end('sent');
            }
          });

          res.send({ message: 'Sign up verification mail sent!' });
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  authService
    .checkValid(req.body.username)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'User Not found.' });
      }
      if (!user.isValid) {
        return res.status(401).send({ message: 'Mail not verified yet!' });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: 'Invalid Password!',
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      var authorities = [];
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push('ROLE_' + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          path: user.path,
          accessToken: token,
        });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.isValid = (req, res, next) => {
  authService
    .validateUser(req.query.id)
    .then(() => {
      res.send('Mail Verified');
    })
    .catch((err) => {
      res.send(err);
    });
};

const config = require('../config/db.config.js');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: false,

  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('../models/user.model.js')(sequelize, Sequelize);
db.roles = require('../models/role.model.js')(sequelize, Sequelize);
db.lists = require('./list.model.js')(sequelize, Sequelize);
db.friends = require('./friend.model')(sequelize, Sequelize);
db.messages = require('./messages.model')(sequelize, Sequelize);

db.ROLES = ['user', 'admin'];

module.exports = db;

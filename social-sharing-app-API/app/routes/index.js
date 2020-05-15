module.exports = (app) => {
  require('./friend.routes')(app);
  require('./auth.routes')(app);
  require('./list.routes')(app);
  require('./message.routes')(app);
  require('./user.routes')(app);
};

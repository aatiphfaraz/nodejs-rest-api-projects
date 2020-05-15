var users = [];

chat = (server) => {
  const io = require('socket.io').listen(server);
  io.on('connection', (socket) => {
    console.log('a user connected', socket.id);
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
    socket.on('user_connected', (data) => {
      // save in array

      users[data.username] = socket.id;
      console.log(users);

      // socket ID will be used to send message to individual person
      // notify all connected clients
    });

    socket.on('chat', (data) => {
      var socketId = users[data.toUser];
      io.to(socketId).emit('chat', data);
    });

    socket.on('typing', (data) => {
      io.to(users[data.toUser]).emit('typing', data);
    });
  });
};

const socketIO = {
  chat: chat,
};

module.exports = socketIO;

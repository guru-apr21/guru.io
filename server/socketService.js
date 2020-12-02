function connect(io) {
  const users = [];
  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('new_user', (username) => {
      users.push({ id: socket.id, username });
      io.emit('users', users);
    });

    socket.on('new_msg', ({ recieverId, message, sentBy }) => {
      io.to(recieverId).emit('recieve_message', { message, sentBy });
    });

    socket.on('disconnect', () => {
      for (let i = 0; i < users.length; i++)
        if (users[i].id === socket.id) users.splice(i, 1);
      io.emit('exit', users);
    });
  });
}
module.exports = connect;

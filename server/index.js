const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});
const cors = require('cors');

app.use(cors());

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('join', (data) => {
    socket.join(data.email);
  });

  socket.on('message', (msg) => {
    socket.broadcast.emit('message', msg);
  });

  socket.on('SEND_MESSAGE', (data) => {
    io.to(data.user).emit('RECIEVE_MESSAGE', data.message);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = 3001;

http.listen(PORT, () => console.log(`Listening on port ${PORT}`));

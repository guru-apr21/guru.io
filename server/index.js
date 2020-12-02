const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});
const cors = require('cors');
const connect = require('./socketService');

app.use(cors());

//Establish socket connection
connect(io);
const PORT = 3001;

http.listen(PORT, () => console.log(`Listening on port ${PORT}`));

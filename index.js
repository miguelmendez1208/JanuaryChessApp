const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
var colour = 1;

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log("Assigned colour" + colour);
  io.emit('serverColor', colour);
  colour = colour *-1;

  socket.on('chat message', (msg) => {
    console.log(msg);
    socket.broadcast.emit('chat message', msg);
  });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});

const express = require('express');
const app = express();
const dotenv=require("dotenv");
const { Server } = require('socket.io');
const http = require('http');
const server = http.createServer(app);
dotenv.config();
console.log("k",process.env.URL)
const io = new Server(server, {
  cors: { 
    origin: "*"
  },
  // Production optimizations
  pingTimeout: 60000,
  pingInterval: 25000,
  transports: ['websocket', 'polling']
});


const players = {};
const spawn = [
  { x: 200, y: 200 },
  { x: 210, y: 200 },
  { x: 240, y: 200 }
];

io.on('connection', (socket) => {
  console.log('a user connected with ID:', socket.id);

//message

socket.on("chatMessage",(data)=>{
  socket.broadcast.emit("chatMessage2",data);
})





//player
  const spawnPoint = spawn[Object.keys(players).length % spawn.length];
  players[socket.id] = {
    id: socket.id,
    x: spawnPoint.x,
    y: spawnPoint.y
  }

  // Send ALL existing players to the new player
  socket.emit('currentplayers', players);
  
  // Tell all OTHER players about the new player
  socket.broadcast.emit('newplayer', players[socket.id]);

  socket.on("newpal",({id,x,y})=>{
    players[id]={
      id:id,
      x:x,
      y:y
    }
    console.log("New player added:", players[id]);
    socket.emit('currentplayers', players);
    
    socket.broadcast.emit('newplayer', players[id]);
  })

  socket.on('playermove', (data) => {
    if (!players[socket.id]) return;
    players[socket.id].x = data.x
    players[socket.id].y = data.y
    players[socket.id].animation = data.animation;
    players[socket.id].flipX = data.flipX;

    socket.broadcast.emit("playerMoved", players[socket.id]);
  })

  socket.on("disconnect", () => {
    console.log("Player disconnected:", socket.id);
    delete players[socket.id];
    io.emit("playerDisconnected", socket.id);
  });
})

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
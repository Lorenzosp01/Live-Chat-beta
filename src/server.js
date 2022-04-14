const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

let users = {
    id: [],
    name: [],
};


io.on('connection', (socket) => {
    console.log("user connected")
    socket.on('disconnect', (msg) => {
        if(socket.id){
            var socketName = users.name[users.id.indexOf(socket.id)];
            users.name = users.name.filter((name) => name !== socketName)
            users.id = users.id.filter((id) => socket.id !== id)
            io.emit('left', socketName + ":left")
        }
    })

    socket.on('join', (msg) => {
        io.emit('join', msg + ":join")
        users.id.push(socket.id);
        users.name.push(msg);
    })

    socket.on('left', (msg) => {
        io.emit('left', msg + ":left")
    })
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    })
});

server.listen(20000, () => {
    console.log('listening on *:20000');
});
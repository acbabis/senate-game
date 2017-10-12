'use strict';

const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { NODE_ENV, PORT = 3000 } = process.env;

// Game service
const ConnectionController = require('mission-game-server').ConnectionController;

const app = express();
const server = http.createServer(app);

// React static content bundle
app.use(express.static('build'));

const io = socketIO(server);
ConnectionController.listen(io);

server.listen(PORT, () => console.log(`Listening on ${ PORT }`));

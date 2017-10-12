'use strict';

const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { NODE_ENV, PORT = 3000 } = process.env;

// Game service
const ConnectionController = require('mission-game-server').ConnectionController;

const app = express();
const server = http.createServer(app);

if (!Object.entries) {
    Object.entries = (obj) => {
        var ownProps = Object.keys(obj),
            i = ownProps.length,
            resArray = new Array(i); // preallocate the Array
        while (i--)
            resArray[i] = [ownProps[i], obj[ownProps[i]]];
        
        return resArray;
    };
}

// React static content bundle
app.use(express.static('build'));

const io = socketIO(server);
ConnectionController.listen(io);

server.listen(PORT, () => console.log(`Listening on ${ PORT }`));

const { func } = require('joi');
const socketio = require('socket.io');

let io, socketExport;
let userMap = new Map();

module.exports = {
    init: function (server) {

        io = socketio(server, {
            cors: {
                origin: '*'
            }
        });

        io.sockets.on('connection', function (socket) {
            socketExport = socket;
            socket.on('init connection', function (userId) {
                console.log('Client connected: ' + userId);
                userMap.set(userId, socket.id);
                console.log(userMap);
            });

            //Defining Server behavious on Socket Events
            //In this context message is video/audio feed (packet of data = message)
            socket.on('message', function (message, room) {
                console.log('Client said: ', message);
                //server should send the receive only in room
                socket.in(room).emit('message', message, room);
            });

            //Event for joining/creating room
            socket.on('create or join', function (room) {
                console.log('Received request to create or join room ' + room);

                //Finding clients in the current room
                var clientsInRoom = io.sockets.adapter.rooms[room];
                var numClients = clientsInRoom ? Object.keys(clientsInRoom.sockets).length : 0;
                console.log('Room ' + room + ' now has ' + numClients + ' client(s)');

                //If no client is in the room, create a room and add the current client
                if (numClients === 0) {
                    socket.join(room);
                    console.log('Client ID ' + socket.id + ' created room ' + room);
                    socket.emit('created', room, socket.id);
                } else { //There is somebody in the room, join
                    console.log('Client ID ' + socket.id + ' joined room ' + room);
                    io.sockets.in(room).emit('join', room);
                    socket.join(room);
                    socket.emit('joined', room, socket.id);
                    io.sockets.in(room).emit('ready');
                }
            });

            //Utility event 
            socket.on('ipaddr', function () {
                var ifaces = os.networkInterfaces();
                for (var dev in ifaces) {
                    ifaces[dev].forEach(function (details) {
                        if (details.family === 'IPv4' && details.address !== '127.0.0.1') {
                            socket.emit('ipaddr', details.address);
                        }
                    });
                }
            });

            //Event for notifying other clients when a client leaves the room
            socket.on('bye', function (userId, room) {
                console.log('received bye');
                userMap.delete(userId);
                io.sockets.in(room).emit('left', userId)
            });

        });
    },
    getSocket: function () {
        if (!socketExport) {
            throw new Error("socket.io has not yet been initialized");
        }
        return socketExport;
    },
    getIO: function () {
        if (!io) {
            throw new Error("socket.io has not yet been initialized");
        }
        return io;
    },
    connectedClients: userMap
}

// For android developer:
// https://stackoverflow.com/questions/24771872/how-to-keep-web-socket-connection-active-when-android-app-is-closed
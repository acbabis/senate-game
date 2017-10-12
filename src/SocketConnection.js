export default {
    open(eventHandler) {
        const socket = window.io();

        socket.on('disconnect', () => { window.location = window.location; });

        window.navigator.geolocation.getCurrentPosition(({coords}) => {
            const { latitude, longitude } = coords;
            socket.emit('userdata', {
                coords: {
                    latitude,
                    longitude
                }
            });
        });

        socket.on('userdata', ({username}) => {
            eventHandler({username});
        });

        socket.on('lobby', (message) => {
            const {room, rooms, type, isUserHost} = message;
            switch(type) {
                case 'room-update': {
                    eventHandler({ room, isUserHost });
                    break;
                }
                case 'room-cancelled': {
                    eventHandler({ room: null });
                    break;
                }
                case 'listing': {
                    eventHandler({ rooms });
                    break;
                }
                default:
                    break;
            }
        });

        socket.on('game', (game) => {
            eventHandler({ game });
        });

        socket.on('service-error', (error) => {
            console.error(error);
        });

        return {
            setUsername(username) {
                socket.emit('userdata', {username});
            },

            hostLocalGame() {
                socket.emit('lobby', {action: 'host', room: {type: 'local'}});
            },

            hostLinkGame() {
                socket.emit('lobby', {action: 'host', room: {type: 'link'}});
            },

            hostPasswordGame(password) {
                socket.emit('lobby', {action: 'host', room: {type: 'password', password}});
            },

            joinGame(id, password) {
                socket.emit('lobby', {action: 'join', id, password});
            },

            startGame() {
                socket.emit('lobby', {action: 'start'});
            },

            leaveGame() {
                socket.emit('lobby', {action: 'leave'});
            },

            sendNominations(nominations) {
                socket.emit('game', {action: 'move', nominations});
            },

            sendVote(approve) {
                socket.emit('game', {action: 'move', approve});
            },

            sendMissionAction(succeed) {
                socket.emit('game', {action: 'move', succeed});
            }
        }
    }
}

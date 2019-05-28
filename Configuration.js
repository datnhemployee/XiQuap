// import io from 'socket.io-client/dist/socket.io';
import io from 'socket.io-client/dist/socket.io';
// import io from 'socket.io-client';

const connectionConfig = {
    jsonp: false,
    reconnection: true,
    reconnectionDelay: 100,
    reconnectionAttempts: 5000,
    transports: ['websocket']/// you need to explicitly tell it to use websockets
  };

const socket = io('http://192.168.43.36:3000/', connectionConfig
// const socket = io('http://10.90.118.182:3000', connectionConfig
// {jsonp: false}
);

// console.log(socket.send('dsadas'))
socket.on('connect', () => {
    console.log('connected');
    // console.log('connected ' + JSON.stringify(socket.emit('deleted',['asas'])));
})

socket.on('disconnect', (reason) => {
    console.log('disconnected because '+ reason);
})
// socket.open();
export default socket;
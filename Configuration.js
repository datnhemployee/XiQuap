// import io from 'socket.io-client/dist/socket.io';
import io from 'socket.io-client/dist/socket.io';
// import io from 'socket.io-client';

const connectionConfig = {
    jsonp: false,
    reconnection: true,
    reconnectionDelay: 0,
    reconnectionDelayMax: 0,
    reconnectionAttempts: Infinity,
    transports: ['websocket']/// you need to explicitly tell it to use websockets
  };
  
// const socket = io('http://192.168.1.36:3000/', connectionConfig
const socket = io('http://192.168.56.1:3000', connectionConfig
// {jsonp: false}
);

// console.log(socket.send('dsadas'))
socket.on('connect', () => {
    console.log('connected');
    // console.log('connected ' + JSON.stringify(socket.emit('deleted',['asas'])));
})


// socket.open();
export default socket;
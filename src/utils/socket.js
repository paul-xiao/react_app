import client from 'socket.io-client';
const socket = client.connect('http://localhost:8080');

export default socket
import { io } from "socket.io-client";

export let socket = io('');

export const connect = () => {
    let ip=""; // enter the ip on which server operates
    socket = io(`http://${ip}:3000`)
}

socket.on('serverToClient', (data) => {
    // alert(data);
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaa ", socket.id);
    // socket.emit('clientToServer', socket.id);
});



export const disconnect = () => {

}




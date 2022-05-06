import { io } from "socket.io-client";
import {useEffect} from "react";
import { ip } from "./ipconfig";

export let socket = io('');

export const connect = () => {
    socket = io(`http://${ip}:3000`)
}

socket.on('serverToClient', (data) => {
    // alert(data);
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaa ", socket.id);
    // socket.emit('clientToServer', socket.id);
});

export const disconnect = () => {

}




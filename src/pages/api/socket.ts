// pages/api/socket.js
import { verifyToken } from "@/utils/auth";
import { Server } from "socket.io";
import { v4 as uuidv4 } from 'uuid';

export const config = {
  api: {
    bodyParser: false,
  },
};

let io: any;

export const initSocket = (server) => {

    if(!io){
      console.log("Initialing Socket.IO");
      io = new Server(server, {
        path: '/api/socket',
        addTrailingSlash: false,
      });
      
      io.on("connection", (socket) => {
        console.log("Socket connected:", socket.id);

        socket.on("clientMessage", (data) => {
          console.log("Message from client:", data);
        });

      });
  }


  return io;

}

export default async function handler(req, res) {
  if(!res.socket.server.io){
    io = initSocket(res.socket.server);
    res.socket.server.io = io;
  }
  res.end();
}

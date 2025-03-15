import 'dotenv/config';
import http from "http";
import app from "./app.js";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";


const server = http.createServer(app);

const io = new Server(server);

io.use((socket, next) => {
    try {
        const token =
          socket.handshake.auth?.token ||
          socket.handshake.headers.authorization?.split(" ")[1];
        if (!token) {
          return next(new Error("Please login to the server"));
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
          return next(new Error("Please login to the server"));
        }

        next();
    }catch(error) {
        console.error(error);
        next(error);
    }
 })

io.on("connection", (client) => {
    console.log("Client connected");
  client.on("event", (data) => {
    /* … */
  });
  client.on("disconnect", () => {
    /* … */
  });
});


const PORT = process.env.PORT || 3000;


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
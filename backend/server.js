import 'dotenv/config';
import http from "http";
import app from "./app.js";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import mongoose from 'mongoose';
import projectModel from './models/project.model.js';
import { join } from 'path';


const server = http.createServer(app);

const io = new Server(server,{cors: {
    origin: "*",
}});

io.use(async (socket, next) => {
    try {
        const token =
          socket.handshake.auth?.token ||
            socket.handshake.headers.authorization?.split(" ")[1];
        
        const projectId = socket.handshake.query.projectId;       

        if(!mongoose.Types.ObjectId.isValid(projectId)) {
            return next(new Error("Invalid project id"));
        }

        socket.project = await projectModel.findById(projectId);
       

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

io.on("connection", (socket) => {
    console.log("Client connected");
    socket.join(socket.project._id)
  socket.on("event", (data) => {
    /* … */
  });
  socket.on("disconnect", () => {
    /* … */
  });

  socket.on("project-message", data => {
    socket.broadcast.to(socket.project._id).emit("project-message", data);  
  })

});


const PORT = process.env.PORT || 3000;


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
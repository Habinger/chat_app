
const app = require("express")();
const httpserver = require("http").createServer(app);
const io = require("socket.io")(httpserver,{
    cors:{
        origin:"http://localhost:3000"
    }
});

  httpserver.listen(5000,()=>console.log("SERVER IS RUNNING..."));
  io.on("connection", (socket)=>{
        console.log(`User Connected: ${socket.id}`);
        socket.on("join_room",(info)=>{
            socket.join(info);
            console.log(`User ${socket.id} Has joined room ${info}`);
            
        })
        socket.on("send_message", (data)=>{
            socket.to(data.room).emit("recieve_message",data);
        })
  })
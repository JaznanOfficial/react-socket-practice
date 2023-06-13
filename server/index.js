const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const port = 5000;
const { Server } = require("socket.io");
const server = http.createServer(app)
    
app.use(cors());

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods:["GET","POST"]
    }
})

io.on('connection', (socket) => {
    console.log(`user connected on: ${socket.id}`)

    socket.on('join_room', (data) => {
        socket.join(data);
        console.log(`user with id: ${socket.id} joinded the room ${data}`)
    })

    socket.on('send_message', (data) => {
        console.log(data)
        socket.to(data.room).emit('receive_message', data)
    })



    socket.on('disconnect', () => {
        console.log("user disconnected")
    })
})





app.get("/", (req, res) => res.send("Hello World!"));
server.listen(port, () => console.log(`Practice app listening on port ${port}!`));

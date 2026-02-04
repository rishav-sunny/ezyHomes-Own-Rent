import { Server } from "socket.io";
import dotenv from "dotenv";
dotenv.config();

const io = new Server({
    cors: {
    origin: process.env.CLIENT_URL?.split(',') || ["http://localhost:5174"],
    methods: ["GET", "POST"],
  }
});

let onlineUser = [];

const addUser = (userId, socketId) => {
    const userExists = onlineUser.find((user) => user.userId === userId);

    if(!userExists){
        onlineUser.push({userId, socketId});
    }
}

const getUser = (userId) => {
    return onlineUser.find((user) => user.userId === userId);
}

const removeUser = (socketId) => {
    onlineUser = onlineUser.filter((user) => user.socketId !== socketId);
}

io.on("connection", (socket) => {
    
    socket.on("newUser", (userId) => {
        addUser(userId, socket.id);
    })

    socket.on("sendMessage", ({receiverId, text}) => {
        // console.log(receiverId, text);
        const receiver = getUser(receiverId);
        io.to(receiver.socketId).emit("getMessage", {
            text,
            senderId: socket.id,
        })
    })

    socket.on("disconnect", () => {
        removeUser(socket.id);
    })

})

const PORT = process.env.PORT || 4000;
io.listen(PORT);
console.log(`Socket server running on port ${PORT}`);

import { Server } from "socket.io";

const io = new Server({
    cors: {
    origin: ["https://ezy-homes-own-rent.vercel.app", "http://localhost:5173"],
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

io.listen("4000");

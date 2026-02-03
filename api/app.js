import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import postRouter from "./routes/post.route.js";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import chatRouter from "./routes/chat.route.js";
import messageRouter from "./routes/message.route.js"
import contactRouter from "./routes/contact.route.js"

import testRoute from "./routes/test.route.js";
import dotenv from "dotenv"
dotenv.config()

const app = express();

//CORS
app.use(cors({
  origin: process.env.CLIENT_URL?.split(',') || ["http://localhost:5173"],
  credentials:true,
}));

//MIDDLEWARES
app.use(express.json());
app.use(cookieParser());


//ROUTES
app.use("/api/auth", authRouter);

app.use("/api/users", userRouter);

app.use("/api/posts", postRouter);

app.use("/api/chats", chatRouter);

app.use("/api/messages", messageRouter);

app.use("/api/contacts", contactRouter)

app.use("/api/test", testRoute);


//SERVER Server
const PORT = process.env.PORT || 8800
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})

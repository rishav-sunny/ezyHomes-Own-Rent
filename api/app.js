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
// hi this idhfjshkf
app.use(cors({
  origin: ["http://localhost:5173", "https://dev-estate-saa21.netlify.app"],
  credentials:true,
}));


app.use(express.json());
app.use(cookieParser());

app.use("/api/post", postRouter);

app.use("/api/auth", authRouter);

app.use("/api/users", userRouter);

app.use("/api/posts", postRouter);

app.use("/api/chats", chatRouter);

app.use("/api/messages", messageRouter);

app.use("/api", contactRouter)

app.use("/api/test", testRoute);


const port = process.env.PORT || 8800

app.listen(port, ()=>{
    console.log("Server is running on port 8800");
})

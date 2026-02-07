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

// Log environment check
console.log('=== Environment Variables Check ===');
console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);
console.log('JWT_SECRET_KEY exists:', !!process.env.JWT_SECRET_KEY);
console.log('CLIENT_URL:', process.env.CLIENT_URL);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('===================================');

//CORS
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = process.env.CLIENT_URL?.split(',') || ["http://localhost:5174"];
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('CORS policy violation'), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
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

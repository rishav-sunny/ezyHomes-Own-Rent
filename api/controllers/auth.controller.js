import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma.js';

export const register = async (req, res) => {
    const { username, email, password } = req.body;

    // HASH THE PASSWORD
    try{
        // check this user exists or new
        const user = await prisma.user.findUnique({
            where: {
                username
            }
        });

        if(user){
            return res.status(401).json({ message: "User Exists! Failed to create user" });
        }

        // if no user exists then create a new user
        const hashedPassword = await bcrypt.hash(password, 12);
        
        // CREATE A NEW USER AND SAVE IT TO THE DATABASE
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        });

        // console.log(newUser);
        res.status(201).json({ message: "User created successfully" });
    }catch(error){
        console.log(error);
        res.status(500).json({ message: "Failed to create user!" });
    }

};


export const login = async (req, res) => {
    const { username, password } = req.body;

    try{
        // CHECK IF THE USER EXISTS
        const user = await prisma.user.findUnique({
            where: {
                username
            }
        });

        if(!user){
            return res.status(401).json({ message: "Invalid credentials!" });
        }
        
        // CHECK IF THE PASSWORD IS CORRECT
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(401).json({ message: "Invalid credentials!" });
        }
        // GENERATE COOKIE TOKEN AND SEND TO THE USER
        const age = 1000 * 60 * 60 * 24 * 7; // 1 week

        const token = jwt.sign({
                id: user.id,
                isAdmin: false,
            }, 
            process.env.JWT_SECRET_KEY, 
            {expiresIn: age}
        )

        const { password: userPassword, ...userInfo } = user;

        // res.setHeader("Set-Cookie", "test=" + "myValue").json("success")
        res.cookie("token", token, {
            httpOnly: true,
            // secure: true,    // only for https
            maxAge: age,
        }).status(200).json(userInfo);
    }catch(error){
        console.log(error);
        res.status(500).json({ message: "Failed to login!" });
    }
};


export const logout = async (req, res) => {
    res.clearCookie("token").status(200).json({ message: "Logout successful" });
};
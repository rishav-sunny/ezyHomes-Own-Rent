import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma.js';

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    console.log("Register request body:", req.body);

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { username }
    });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await prisma.user.create({
      data: { username, email, password: hashedPassword }
    });

    console.log("New user created:", newUser);

    res.status(201).json({ message: "User created successfully", user: newUser });

  } catch (error) {
    console.error("REGISTER ERROR:", error); // <-- important!
    res.status(500).json({ message: error.message, stack: error.stack });
  }
};


//   const { username, email, password } = req.body;

//   try {
//     // Check if user already exists by username or email
//     const existingUser = await prisma.user.findFirst({
//       where: {
//         OR: [{ username }, { email }]
//       }
//     });

//     if (existingUser) {
//       return res.status(401).json({ message: "Username or Email already exists!" });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 12);

//     // Create new user
//     const newUser = await prisma.user.create({
//       data: {
//         username,
//         email,
//         password: hashedPassword,
//       }
//     });

//     res.status(201).json({ message: "User created successfully", user: { id: newUser.id, username: newUser.username, email: newUser.email } });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to create user!" });
//   }
// };



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
# EzyHomes 🏠

A full-stack real estate platform built with modern web technologies, featuring property listings, user authentication, real-time chat, and more.

## 🚀 Features

- **Property Listings**: Browse and search through available properties
- **User Authentication**: Secure user registration and login system
- **Real-time Chat**: Communicate with property owners and agents using Socket.IO
- **User Profiles**: Manage user accounts and preferences
- **Contact System**: Direct communication between users
- **Responsive Design**: Mobile-friendly interface

## 🏗️ Architecture

This project follows a microservices architecture with three main components:

```
EzyHomes/
├── api/          # Backend API server (Node.js + Express + Prisma)
├── client/       # Frontend application (React + Vite)
├── socket/       # Real-time communication server (Socket.IO)
└── README.md
```

### Tech Stack

**Backend (API)**
- Node.js & Express.js
- Prisma ORM
- JWT Authentication
- Cookie-based sessions
- CORS enabled

**Frontend (Client)**
- React.js
- Vite (Build tool)
- Modern JavaScript/ES6+

**Real-time Communication (Socket)**
- Socket.IO
- WebSocket connections
- Real-time messaging

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- Database (PostgreSQL/MySQL/SQLite - depending on your Prisma configuration)

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd EzyHomes
```

### 2. Environment Setup

Create `.env` files in the respective directories:

**API (.env)**
```env
# Database
DATABASE_URL="your-database-connection-string"

# JWT
JWT_SECRET_KEY="your-jwt-secret"

# Client URL for CORS
CLIENT_URL="http://localhost:5173"

# Other environment variables as needed
```

### 3. Install Dependencies

Install dependencies for all components:

```bash
# Install API dependencies
cd api
npm install

# Install Client dependencies
cd ../client
npm install

# Install Socket dependencies
cd ../socket
npm install
```

### 4. Database Setup

Set up your database using Prisma:

```bash
cd api
npx prisma generate
npx prisma db push
# or npx prisma migrate dev (if you have migrations)
```

### 5. Start the Development Servers

You'll need to run all three components simultaneously. Open three terminal windows:

**Terminal 1 - API Server**
```bash
cd api
npm start
# Server will run on http://localhost:8800
```

**Terminal 2 - Socket Server**
```bash
cd socket
npm start
# Socket server will run on its configured port
```

**Terminal 3 - Client**
```bash
cd client
npm run dev
# Client will run on http://localhost:5173 (or as configured by Vite)
```

## 📁 Project Structure

```
EzyHomes/
├── api/
│   ├── controllers/     # Route controllers
│   ├── lib/            # Utility libraries
│   ├── middleware/     # Express middleware
│   ├── prisma/         # Database schema and migrations
│   ├── routes/         # API route definitions
│   ├── app.js          # Express application setup
│   └── package.json    # API dependencies
├── client/
│   ├── public/         # Static assets
│   ├── src/            # React source code
│   ├── index.html      # HTML template
│   ├── vite.config.js  # Vite configuration
│   └── package.json    # Client dependencies
├── socket/
│   ├── app.js          # Socket.IO server
│   └── package.json    # Socket dependencies
└── README.md
```

## 🔌 API Endpoints

The API server provides the following main endpoints:

- `/api/auth` - Authentication routes (login, register, logout)
- `/api/users` - User management
- `/api/posts` - Property listings
- `/api/chats` - Chat functionality
- `/api/messages` - Message handling
- `/api/contact` - Contact forms and communication

## 🔧 Development

### Available Scripts

**API**
```bash
npm start          # Start the API server
npm run dev        # Start with nodemon (if configured)
```

**Client**
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
```

**Socket**
```bash
npm start          # Start the Socket.IO server
```

## 🚀 Deployment

### Production Build

1. Build the client for production:
```bash
cd client
npm run build
```

2. Set up production environment variables

3. Deploy each component to your preferred hosting service:
   - **API**: Deploy to services like Heroku, Railway, or DigitalOcean
   - **Client**: Deploy to Vercel, Netlify, or serve the built files
   - **Socket**: Deploy alongside the API or separately
   - **Database**: Use managed database services like PlanetScale, Supabase, or AWS RDS

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the package.json files for details.

## 📞 Support

If you have any questions or need help with setup, please open an issue in the repository.

---

**Happy Coding! 🏠✨**

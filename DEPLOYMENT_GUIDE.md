# EzyHomes - Real Estate Platform

A full-stack real estate application built with React, Node.js, Express, and MongoDB (Prisma).

## Features

- 🏠 Browse and search properties
- 🔍 Advanced search with filters (city, price range, property type)
- 👤 User authentication (login/register)
- 📝 Create, update, and delete property listings
- 💬 Real-time chat functionality
- 📱 Responsive design
- 🗺️ Interactive maps

## Tech Stack

**Frontend:**
- React 18
- React Router DOM
- Sass/SCSS
- Axios
- Vite

**Backend:**
- Node.js
- Express.js
- Prisma (MongoDB)
- JWT Authentication
- Socket.io (for real-time chat)

## Local Development Setup

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd ezyHomes
```

### 2. Setup Backend (API)

```bash
cd api

# Install dependencies
npm install

# Create .env file based on .env.example
cp .env.example .env

# Edit .env with your configuration:
# DATABASE_URL="your_mongodb_connection_string"
# JWT_SECRET_KEY="your_secret_key"
# CLIENT_URL="http://localhost:5173"
# NODE_ENV=development
# PORT=8800

# Generate Prisma Client
npx prisma generate

# Run database migrations (if any)
npx prisma db push

# Start the server
npm start
```

The API will run on `http://localhost:8800`

### 3. Setup Socket Server

```bash
cd socket

# Install dependencies
npm install

# Start the socket server
npm start
```

The socket server will run on `http://localhost:4000`

### 4. Setup Frontend (Client)

```bash
cd client

# Install dependencies
npm install

# Create .env.local file based on .env.example
cp .env.example .env.local

# Edit .env.local:
# VITE_API_URL=http://localhost:8800/api

# Start the development server
npm run dev
```

The client will run on `http://localhost:5173`

### 5. Test the Application

1. Open `http://localhost:5173` in your browser
2. Register a new account
3. Login and explore the features
4. Try searching for properties
5. Create a new property listing

## Production Deployment

### Frontend (Vercel/Netlify)

1. **Build the client:**
   ```bash
   cd client
   npm run build
   ```

2. **Update environment variables:**
   - Set `VITE_API_URL` to your production API URL

3. **Deploy to Vercel:**
   ```bash
   vercel --prod
   ```

   Or **Deploy to Netlify:**
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `dist`
   - Add environment variable: `VITE_API_URL`

### Backend (Render/Heroku/Railway)

1. **Prepare for deployment:**
   - Ensure all environment variables are set
   - Update `CLIENT_URL` with your frontend domain
   - Use MongoDB Atlas for production database

2. **Deploy to Render:**
   - Create a new Web Service
   - Connect your repository
   - Set build command: `cd api && npm install`
   - Set start command: `cd api && npm start`
   - Add environment variables:
     - `DATABASE_URL`
     - `JWT_SECRET_KEY`
     - `CLIENT_URL`
     - `NODE_ENV=production`
     - `PORT=8800`

3. **Deploy Socket Server:**
   - Create another Web Service for socket
   - Set build command: `cd socket && npm install`
   - Set start command: `cd socket && npm start`

### Database Setup (MongoDB Atlas)

1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Update `DATABASE_URL` in your backend `.env`
5. Run migrations:
   ```bash
   npx prisma db push
   ```

## Environment Variables

### Backend (.env)
```env
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/dbname"
JWT_SECRET_KEY="your-secret-key-here"
CLIENT_URL="http://localhost:5173,https://your-frontend-domain.com"
NODE_ENV=production
PORT=8800
```

### Frontend (.env.local)
```env
VITE_API_URL=http://localhost:8800/api
```

### Frontend (.env.production)
```env
VITE_API_URL=https://your-api-domain.com/api
```

## Troubleshooting

### CORS Issues
- Ensure `CLIENT_URL` in backend includes your frontend domain
- Check that `withCredentials: true` is set in axios config

### Authentication Issues
- Verify JWT_SECRET_KEY matches between deployments
- Check cookie settings for production (secure, sameSite)

### Search Not Working
- Verify API endpoint is accessible
- Check that query parameters match backend expectations
- Ensure database has property data

### Properties Not Showing
- Check API is running and accessible
- Verify database connection
- Check browser console for errors

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Posts/Properties
- `GET /api/posts` - Get all posts (supports filtering)
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create new post (auth required)
- `PUT /api/posts/:id` - Update post (auth required)
- `DELETE /api/posts/:id` - Delete post (auth required)

### Users
- `GET /api/users/profileposts` - Get user's posts (auth required)
- `PUT /api/users/:id` - Update user profile (auth required)

### Chats
- `GET /api/chats` - Get user's chats (auth required)
- `POST /api/chats` - Create new chat (auth required)
- `PUT /api/chats/:id` - Mark chat as read (auth required)

## License

MIT

## Support

For issues and questions, please create an issue in the repository.

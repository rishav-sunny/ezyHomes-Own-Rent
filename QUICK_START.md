# EzyHomes - Quick Start Guide

## 🚀 Start Development Servers

### Option 1: Start All Servers Manually

Open 3 separate terminals:

**Terminal 1 - API Server:**
```bash
cd api
npm install   # First time only
npm start
```
Server runs on: http://localhost:8800

**Terminal 2 - Socket Server:**
```bash
cd socket
npm install   # First time only
npm start
```
Server runs on: http://localhost:4000

**Terminal 3 - Frontend:**
```bash
cd client
npm install   # First time only
npm run dev
```
App runs on: http://localhost:5173

## ✅ All Fixed Issues

### 1. ✅ Navigation Order Fixed
- Header now shows: **Home → Properties → About → Contact → Agents**
- Mobile menu matches desktop navigation

### 2. ✅ Latest Properties on Homepage
- Homepage now displays the 6 most recent properties
- Properties appear below the hero section
- Responsive grid layout (3 columns → 2 columns → 1 column)

### 3. ✅ Search Functionality Fixed
- Fixed query parameter mismatch (`city` instead of `location`)
- Search now properly filters properties by:
  - Type (buy/rent)
  - City
  - Price range (min/max)
- Search results display on the `/list` page

### 4. ✅ Production Ready
- Environment variables configured for easy deployment
- API URL uses environment variable
- CORS properly configured for multiple origins
- Database connection ready for MongoDB Atlas
- Deployment guide created

## 🧪 Testing the Fixes

### Test Search Functionality:
1. Go to homepage
2. Select "Buy" or "Rent"
3. Enter a city name
4. Set price range
5. Click search button
6. Should redirect to `/list` page with filtered results

### Test Property Listings:
1. Login to your account
2. Click "Add New Post" or go to `/add`
3. Fill in property details
4. Submit the form
5. Property should appear:
   - On your profile page
   - On the homepage (if it's one of the 6 latest)
   - In search results (when filters match)

### Test Navigation:
1. Check header navigation order
2. Click each link to verify routing
3. Test on mobile view (responsive menu)

## 📝 Environment Setup

### Backend (.env):
```env
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/dbname"
JWT_SECRET_KEY="your-secret-key"
CLIENT_URL="http://localhost:5173"
NODE_ENV=development
PORT=8800
```

### Frontend (.env.local):
```env
VITE_API_URL=http://localhost:8800/api
```

## 🌐 Deployment Checklist

Before deploying to production:

- [ ] Test all features on localhost
- [ ] Update MongoDB to Atlas (production database)
- [ ] Set environment variables on hosting platform
- [ ] Update `VITE_API_URL` to production API URL
- [ ] Update `CLIENT_URL` in backend to include frontend domain
- [ ] Test CORS configuration
- [ ] Deploy backend (Render/Railway/Heroku)
- [ ] Deploy frontend (Vercel/Netlify)
- [ ] Deploy socket server
- [ ] Test production deployment

## 🐛 Common Issues & Solutions

### Search Returns No Results:
- Check if database has properties
- Verify API is running
- Check browser console for errors
- Ensure search parameters match database fields

### Properties Not Loading on Homepage:
- Verify API endpoint: `GET /api/posts?limit=6`
- Check database connection
- Look for errors in browser console

### CORS Errors:
- Verify `CLIENT_URL` in backend `.env`
- Check that `withCredentials: true` is set
- Ensure frontend URL is in CORS origin list

### Authentication Issues:
- Clear cookies and local storage
- Re-login
- Check JWT_SECRET_KEY matches

## 📚 Additional Resources

- Full deployment guide: `DEPLOYMENT_GUIDE.md`
- API documentation: See DEPLOYMENT_GUIDE.md
- React documentation: https://react.dev
- Vite documentation: https://vitejs.dev

## 🎉 You're All Set!

Your EzyHomes application is now fully functional and production-ready!

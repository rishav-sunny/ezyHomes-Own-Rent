# Production Deployment Checklist

## Pre-Deployment Testing ✅

- [ ] All features work on localhost
- [ ] Search functionality works correctly
- [ ] Properties display on homepage
- [ ] Navigation menu is correct
- [ ] User authentication works
- [ ] Property CRUD operations work
- [ ] Chat functionality works
- [ ] Responsive design on mobile/tablet

## Database Setup 🗄️

- [ ] Create MongoDB Atlas account
- [ ] Create production cluster
- [ ] Whitelist IP addresses (0.0.0.0/0 for all)
- [ ] Get connection string
- [ ] Update DATABASE_URL in backend
- [ ] Run `npx prisma generate`
- [ ] Run `npx prisma db push`
- [ ] Verify database connection

## Backend Deployment (Render) 🚀

- [ ] Create Render account
- [ ] Create new Web Service
- [ ] Connect GitHub repository
- [ ] Configure build settings:
  - Build command: `cd api && npm install && npx prisma generate`
  - Start command: `cd api && npm start`
- [ ] Add environment variables:
  - DATABASE_URL
  - JWT_SECRET_KEY
  - CLIENT_URL (add your frontend domain)
  - NODE_ENV=production
  - PORT=8800
- [ ] Deploy and test API endpoints
- [ ] Note your API URL (e.g., https://ezyhomes-api.onrender.com)

## Socket Server Deployment 🔌

- [ ] Create another Web Service on Render
- [ ] Configure build settings:
  - Build command: `cd socket && npm install`
  - Start command: `cd socket && npm start`
- [ ] Update socket/app.js CORS to include frontend domain
- [ ] Deploy socket server
- [ ] Note socket URL for frontend configuration

## Frontend Deployment (Vercel/Netlify) 🌐

### Vercel:
- [ ] Install Vercel CLI: `npm i -g vercel`
- [ ] Update `.env.production`:
  - VITE_API_URL=https://your-api-domain.onrender.com/api
- [ ] Build locally to test: `npm run build`
- [ ] Deploy: `vercel --prod`
- [ ] Add environment variable in Vercel dashboard:
  - VITE_API_URL

### Netlify:
- [ ] Update `.env.production` with production API URL
- [ ] Create netlify.toml (if not exists)
- [ ] Push to GitHub
- [ ] Connect repository in Netlify
- [ ] Configure build settings:
  - Build command: `npm run build`
  - Publish directory: `dist`
  - Base directory: `client`
- [ ] Add environment variables:
  - VITE_API_URL
- [ ] Deploy

## Post-Deployment Testing 🧪

- [ ] Test homepage loads correctly
- [ ] Test property search functionality
- [ ] Test user registration
- [ ] Test user login
- [ ] Test create new property
- [ ] Test edit property
- [ ] Test delete property
- [ ] Test chat functionality
- [ ] Test on mobile devices
- [ ] Test on different browsers

## Environment Variables Reference 📋

### Backend (.env):
```
DATABASE_URL=mongodb+srv://user:pass@cluster.mongodb.net/dbname
JWT_SECRET_KEY=your-strong-secret-key-here
CLIENT_URL=http://localhost:5173,https://your-app.vercel.app
NODE_ENV=production
PORT=8800
```

### Frontend (.env.production):
```
VITE_API_URL=https://your-api.onrender.com/api
```

## Common Deployment Issues 🔧

### Issue: CORS Error
**Solution:** 
- Add frontend URL to CLIENT_URL in backend
- Redeploy backend

### Issue: API Returns 404
**Solution:**
- Check API URL in frontend .env
- Verify backend is deployed and running
- Check API route paths

### Issue: Database Connection Failed
**Solution:**
- Verify DATABASE_URL is correct
- Check MongoDB Atlas IP whitelist
- Ensure network access is configured

### Issue: Authentication Not Working
**Solution:**
- Check JWT_SECRET_KEY is set
- Verify cookies are enabled
- Check CORS credentials setting

### Issue: Images Not Loading
**Solution:**
- Check image URLs are absolute
- Verify image hosting service is accessible
- Update image paths if needed

## Performance Optimization 🚀

- [ ] Enable gzip compression on backend
- [ ] Add caching headers
- [ ] Optimize images
- [ ] Implement lazy loading
- [ ] Add loading states
- [ ] Monitor API response times

## Security Checklist 🔒

- [ ] Use strong JWT secret
- [ ] Enable HTTPS
- [ ] Validate all user inputs
- [ ] Sanitize database queries
- [ ] Rate limit API endpoints
- [ ] Keep dependencies updated
- [ ] Don't expose sensitive data in errors

## Monitoring 📊

- [ ] Set up error tracking (Sentry)
- [ ] Monitor API performance
- [ ] Check database usage
- [ ] Monitor hosting costs
- [ ] Set up uptime monitoring

## Maintenance 🛠️

- [ ] Regular backups of database
- [ ] Update dependencies monthly
- [ ] Monitor for security vulnerabilities
- [ ] Review and optimize database queries
- [ ] Check logs for errors

---

**Deployment Date:** _______________  
**Deployed By:** _______________  
**Frontend URL:** _______________  
**Backend URL:** _______________  
**Socket URL:** _______________  

**Notes:**
_______________________________________________
_______________________________________________
_______________________________________________

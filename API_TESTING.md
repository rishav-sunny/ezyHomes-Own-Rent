# API Testing Guide

## Test API Endpoints

### Base URL
- Local: `http://localhost:8800/api`
- Production: `https://your-api-domain.com/api`

## 1. Test Health Check

```bash
curl http://localhost:8800/api/test
```

## 2. Test Authentication

### Register New User
```bash
curl -X POST http://localhost:8800/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:8800/api/auth/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{
    "username": "testuser",
    "password": "password123"
  }'
```

## 3. Test Property Endpoints

### Get All Properties
```bash
curl http://localhost:8800/api/posts
```

### Get Properties with Filters
```bash
# Filter by city
curl "http://localhost:8800/api/posts?city=NewYork"

# Filter by type
curl "http://localhost:8800/api/posts?type=buy"

# Filter by price range
curl "http://localhost:8800/api/posts?minPrice=100000&maxPrice=500000"

# Get limited results (for homepage)
curl "http://localhost:8800/api/posts?limit=6"

# Combined filters
curl "http://localhost:8800/api/posts?city=London&type=rent&minPrice=1000&maxPrice=3000"
```

### Get Single Property
```bash
curl http://localhost:8800/api/posts/{property-id}
```

### Create New Property (Requires Authentication)
```bash
curl -X POST http://localhost:8800/api/posts \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "postData": {
      "title": "Beautiful Apartment",
      "price": 250000,
      "images": ["https://example.com/image1.jpg"],
      "address": "123 Main St",
      "city": "NewYork",
      "bedroom": 2,
      "bathroom": 2,
      "latitude": "40.7128",
      "longitude": "-74.0060",
      "type": "buy",
      "property": "apartment"
    },
    "postDetail": {
      "desc": "A beautiful apartment in the heart of the city",
      "utilities": "Tenant",
      "pet": "Allowed",
      "income": "50000",
      "size": 1200,
      "school": 500,
      "bus": 200,
      "restaurant": 100
    }
  }'
```

## 4. Test User Endpoints

### Get User Profile Posts (Requires Authentication)
```bash
curl http://localhost:8800/api/users/profileposts \
  -b cookies.txt
```

### Update User Profile (Requires Authentication)
```bash
curl -X PUT http://localhost:8800/api/users/{user-id} \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "username": "newusername",
    "email": "newemail@example.com",
    "avatar": "https://example.com/avatar.jpg"
  }'
```

## 5. Test Chat Endpoints

### Get User Chats (Requires Authentication)
```bash
curl http://localhost:8800/api/chats \
  -b cookies.txt
```

### Create New Chat (Requires Authentication)
```bash
curl -X POST http://localhost:8800/api/chats \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "receiverId": "{user-id}"
  }'
```

## Using Postman

### Import Collection

Create a new collection in Postman with these requests:

1. **Environment Variables:**
   - `base_url`: `http://localhost:8800/api`
   - `token`: (will be set after login)

2. **Pre-request Script for Authenticated Requests:**
   ```javascript
   // This will automatically include cookies from login
   pm.request.headers.add({
     key: 'Cookie',
     value: pm.environment.get('token')
   });
   ```

3. **Test Scripts for Login:**
   ```javascript
   // Save token from cookies
   const cookies = pm.cookies.get('token');
   if (cookies) {
     pm.environment.set('token', 'token=' + cookies);
   }
   ```

## Testing Checklist

- [ ] Can register new user
- [ ] Can login with credentials
- [ ] Can get all properties
- [ ] Can filter properties by city
- [ ] Can filter properties by type
- [ ] Can filter properties by price range
- [ ] Can get limited number of properties
- [ ] Can get single property details
- [ ] Can create new property (authenticated)
- [ ] Can update property (authenticated)
- [ ] Can delete property (authenticated)
- [ ] Can get user profile
- [ ] Can update user profile
- [ ] Can get chats
- [ ] Can create chat

## Expected Responses

### Success Response (200)
```json
{
  "id": "123",
  "title": "Property Title",
  ...
}
```

### Error Response (400/401/403/500)
```json
{
  "message": "Error message description"
}
```

## Common HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

## Tips

1. Save cookies after login for authenticated requests
2. Replace `{property-id}` and `{user-id}` with actual IDs
3. Test each endpoint individually before integration
4. Check response status codes and error messages
5. Verify data is being saved to database

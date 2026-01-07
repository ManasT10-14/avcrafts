# Environment Configuration for AVCrafts

## Client (.env in /client folder)
VITE_API_URL=http://localhost:5000

## Server (.env in /server folder - already exists)
DATABASE_URL=your_postgres_connection_string
PORT=5000

## For Production Deployment:
1. Update VITE_API_URL in client/.env to your production API URL
2. Update DATABASE_URL in server/.env to production database
3. Set up CORS in server for your production domain
4. Build client: `cd client && npm run build`
5. Deploy build folder to hosting service (Vercel, Netlify, etc.)
6. Deploy server to backend service (Railway, Render, etc.)

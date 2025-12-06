# Local Development Setup Guide

This guide will help you set up the Veridia platform for local development without Docker.

## Prerequisites

- **Python 3.12+** - [Download](https://www.python.org/downloads/)
- **Node.js 20+** - [Download](https://nodejs.org/)
- **PostgreSQL 15+** (Optional, SQLite works for development) - [Download](https://www.postgresql.org/download/)

## Step-by-Step Setup

### 1. Backend Setup

#### 1.1 Navigate to Backend Directory
```bash
cd backend
```

#### 1.2 Create Virtual Environment
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Linux/Mac
python3 -m venv venv
source venv/bin/activate
```

#### 1.3 Install Dependencies
```bash
pip install -r requirements.txt
```

#### 1.4 Create Environment File
Copy `env.example` to `.env`:
```bash
# Windows
copy env.example .env

# Linux/Mac
cp env.example .env
```

Edit `.env` and update the following:
```env
DEBUG=True
SECRET_KEY=your-secret-key-here-change-this
# Leave DATABASE_URL empty for SQLite (local development)
DATABASE_URL=
CORS_ALLOWED_ORIGINS=http://localhost:5173
```

#### 1.5 Run Migrations
```bash
python manage.py migrate
```

#### 1.6 Create Superuser
```bash
python manage.py createsuperuser
```
Follow the prompts to create an admin account.

#### 1.7 (Optional) Load Dummy Data
```bash
python manage.py create_dummy_data
```

#### 1.8 Start Development Server
```bash
python manage.py runserver
```

The backend will be available at: http://localhost:8000

### 2. Frontend Setup

#### 2.1 Navigate to Frontend Directory
Open a new terminal and:
```bash
cd frontend
```

#### 2.2 Install Dependencies
```bash
npm install
```

#### 2.3 Create Environment File
Copy `env.example` to `.env`:
```bash
# Windows
copy env.example .env

# Linux/Mac
cp env.example .env
```

The default `.env` should work for local development:
```env
VITE_API_URL=http://localhost:8000/api/v1
```

#### 2.4 Start Development Server
```bash
npm run dev
```

The frontend will be available at: http://localhost:5173

## Verification

1. **Backend API**: Visit http://localhost:8000/api/v1/departments/
   - Should return JSON data (may require authentication)

2. **Admin Panel**: Visit http://localhost:8000/admin
   - Login with your superuser credentials

3. **Frontend**: Visit http://localhost:8000
   - Should show the login page

## Common Issues

### Backend Issues

**Module not found errors:**
```bash
# Make sure virtual environment is activated
# Reinstall dependencies
pip install -r requirements.txt
```

**Database errors:**
```bash
# If using SQLite, make sure db.sqlite3 is writable
# If using PostgreSQL, check DATABASE_URL in .env
```

**Port already in use:**
```bash
# Use a different port
python manage.py runserver 8001
```

### Frontend Issues

**npm install fails:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

**API connection errors:**
- Check that backend is running on port 8000
- Verify `VITE_API_URL` in `frontend/.env`
- Check browser console for CORS errors

**Build errors:**
```bash
# Check TypeScript errors
npm run build
```

## Next Steps

1. **Create an applicant account**: Register at http://localhost:5173
2. **Submit an application**: Use the application form
3. **Login as admin**: Use superuser credentials to manage applications
4. **Explore features**: Check out the admin dashboard and analytics

## Development Tips

- **Hot Reload**: Both frontend and backend support hot reload
- **API Testing**: Use http://localhost:8000/admin for quick data access
- **Database**: SQLite file is at `backend/db.sqlite3`
- **Logs**: Check terminal output for errors and debug information

## Stopping Services

- **Backend**: Press `Ctrl+C` in the backend terminal
- **Frontend**: Press `Ctrl+C` in the frontend terminal
- **Deactivate venv**: Run `deactivate` in the backend terminal


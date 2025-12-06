# Quick Start Guide

Get the Veridia platform running in 5 minutes!

## Option 1: Docker (Recommended - Easiest)

```bash
# 1. Clone and navigate
cd web

# 2. Create environment files
# Backend: Copy backend/env.example to backend/.env
# Frontend: Copy frontend/env.example to frontend/.env

# 3. Start everything
docker-compose up --build

# 4. In a new terminal, setup database
docker-compose exec backend python manage.py migrate
docker-compose exec backend python manage.py createsuperuser

# 5. Access the app
# Frontend: http://localhost:5173
# Backend API: http://localhost:8000/api/v1
# Admin: http://localhost:8000/admin
```

## Option 2: Local Development

### Backend (Terminal 1)
```bash
cd backend
python -m venv venv
# Windows: venv\Scripts\activate
# Linux/Mac: source venv/bin/activate
pip install -r requirements.txt
cp env.example .env  # Edit .env with your settings
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### Frontend (Terminal 2)
```bash
cd frontend
npm install
cp env.example .env  # Edit .env with your settings
npm run dev
```

## First Steps After Setup

1. **Login as Admin**: Use superuser credentials at http://localhost:8000/admin
2. **Register as Applicant**: Go to http://localhost:5173 and register
3. **Submit Application**: Fill out the application form
4. **Manage Applications**: Login as admin to review applications

## Need Help?

- **Full Documentation**: See [README.md](README.md)
- **Local Setup Details**: See [LOCAL_SETUP.md](LOCAL_SETUP.md)
- **Production Deployment**: See [PRODUCTION_DEPLOYMENT.md](PRODUCTION_DEPLOYMENT.md)

## Common Commands

```bash
# Docker
docker-compose up              # Start services
docker-compose down            # Stop services
docker-compose logs -f         # View logs
docker-compose exec backend python manage.py migrate  # Run migrations

# Local
python manage.py migrate       # Run migrations
python manage.py createsuperuser  # Create admin
npm run dev                    # Start frontend dev server
npm run build                  # Build frontend for production
```

---

**That's it!** You're ready to start using Veridia. 🚀


# Quick Setup Guide

## Prerequisites
- Docker and Docker Compose installed
- OR Node.js 20+ and Python 3.12+ for local development

## Quick Start with Docker

1. **Navigate to web directory**
   ```bash
   cd web
   ```

2. **Start all services**
   ```bash
   docker-compose up --build
   ```

3. **In a new terminal, run migrations**
   ```bash
   docker-compose exec backend python manage.py migrate
   ```

4. **Create admin user**
   ```bash
   docker-compose exec backend python manage.py createsuperuser
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000/api/v1
   - Admin Panel: http://localhost:8000/admin

## Local Development (Without Docker)

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## First Steps

1. **Create an admin account** using the superuser command above
2. **Register as an applicant** at http://localhost:5173
3. **Login as admin** to view and manage applications
4. **Submit an application** as an applicant to test the flow

## Important Notes

- The frontend components from the extracted folder need to be in place
- Make sure UI components are copied to `frontend/src/components/ui/`
- Make sure page components are copied to `frontend/src/components/pages/`
- Email notifications require email configuration in backend settings

## Troubleshooting

- If frontend can't connect to backend: Check `VITE_API_URL` in frontend `.env`
- If migrations fail: Run `python manage.py makemigrations` first
- If UI components missing: Copy from `extracted/src/components/ui/` to `frontend/src/components/ui/`
- If pages missing: Copy from `extracted/src/components/pages/` to `frontend/src/components/pages/`


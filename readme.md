# Veridia Hiring Platform

A comprehensive hiring platform built with React/TypeScript frontend and Django backend, designed to streamline and professionalize the hiring process for Veridia.

## Features

- **Candidate Registration and Login**: Secure authentication system for applicants
- **Application Form**: Comprehensive form to collect applicant details
- **Applicant Dashboard**: View application status, update profile, and manage applications
- **Admin Dashboard**: HR team can view, filter, and manage all applications
- **Automated Email Notifications**: Email notifications on application submission and status updates

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Radix UI components
- Axios for API calls

### Backend
- Django 5.2.9
- Django REST Framework
- JWT Authentication
- SQLite (development) / PostgreSQL (production)
- Email notifications

### Infrastructure
- Docker & Docker Compose
- PostgreSQL database

## Project Structure

```
web/
├── backend/          # Django backend
│   ├── authentication/  # Auth endpoints
│   ├── applications/      # Application management
│   ├── users/            # User management
│   └── notifications/    # Email notifications
├── frontend/         # React frontend
│   ├── src/
│   │   ├── components/   # React components
│   │   └── services/     # API services
└── docker-compose.yml
```

## Setup Instructions

### Prerequisites
- Docker and Docker Compose installed
- Node.js 20+ (for local development)
- Python 3.12+ (for local development)

### Using Docker (Recommended)

1. **Clone the repository**
   ```bash
   cd web
   ```

2. **Build and start containers**
   ```bash
   docker-compose up --build
   ```

3. **Run database migrations**
   ```bash
   docker-compose exec backend python manage.py migrate
   ```

4. **Create a superuser (admin account)**
   ```bash
   docker-compose exec backend python manage.py createsuperuser
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000
   - Admin Panel: http://localhost:8000/admin

### Local Development

#### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run migrations**
   ```bash
   python manage.py migrate
   ```

5. **Create superuser**
   ```bash
   python manage.py createsuperuser
   ```

6. **Start development server**
   ```bash
   python manage.py runserver
   ```

#### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

## Environment Variables

### Backend
Create a `.env` file in the `backend` directory:

```env
DEBUG=1
SECRET_KEY=your-secret-key-here
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
DEFAULT_FROM_EMAIL=noreply@veridia.com
```

### Frontend
Create a `.env` file in the `frontend` directory:

```env
VITE_API_URL=http://localhost:8000/api/v1
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/register/` - Register new applicant
- `POST /api/v1/auth/login/` - Login
- `POST /api/v1/auth/logout/` - Logout
- `POST /api/v1/auth/token/refresh/` - Refresh access token

### Applicant Endpoints
- `GET /api/v1/applicant/dashboard/stats/` - Get dashboard statistics
- `GET /api/v1/applicant/applications/` - Get all applications
- `POST /api/v1/applicant/applications/` - Submit new application
- `GET /api/v1/applicant/applications/{id}/` - Get application details
- `DELETE /api/v1/applicant/applications/{id}/` - Withdraw application

### Admin Endpoints
- `GET /api/v1/admin/dashboard/stats/` - Get admin dashboard statistics
- `GET /api/v1/admin/applications/` - Get all applications (with filters)
- `GET /api/v1/admin/applications/{id}/` - Get application details
- `PATCH /api/v1/admin/applications/{id}/` - Update application
- `PATCH /api/v1/admin/applications/{id}/status/` - Update application status
- `GET /api/v1/admin/analytics/` - Get analytics data
- `GET /api/v1/admin/activity/` - Get recent activity
- `GET /api/v1/admin/interviews/upcoming/` - Get upcoming interviews

### User Endpoints
- `GET /api/v1/profile/` - Get user profile
- `PATCH /api/v1/profile/` - Update user profile
- `GET /api/v1/departments/` - Get all departments
- `GET /api/v1/positions/` - Get all positions

## Default Credentials

After creating a superuser, you can login with:
- Email: (the email you used when creating superuser)
- Password: (the password you set)

## Email Configuration

The platform sends automated emails for:
- Registration confirmation
- Application submission confirmation
- Application status updates
- Interview invitations
- Acceptance/rejection notifications

Configure email settings in `backend/veridia/settings.py` or via environment variables.

## Development Notes

- The backend uses SQLite by default for development
- For production, update `settings.py` to use PostgreSQL
- File uploads (resumes, profile pictures) are stored in the `media/` directory
- Static files are collected to `staticfiles/` directory

## Troubleshooting

### Backend Issues
- If migrations fail, try: `python manage.py makemigrations` then `python manage.py migrate`
- If port 8000 is in use, change it in `docker-compose.yml` or use `python manage.py runserver 8001`

### Frontend Issues
- If dependencies fail to install, delete `node_modules` and `package-lock.json`, then run `npm install` again
- If API calls fail, check that the backend is running and `VITE_API_URL` is correct

### Docker Issues
- If containers fail to start, check logs: `docker-compose logs`
- To rebuild containers: `docker-compose up --build --force-recreate`

## License

© 2025 Veridia. All rights reserved.


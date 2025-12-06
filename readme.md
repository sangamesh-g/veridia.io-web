# Veridia Hiring Platform

A comprehensive, production-ready hiring platform built with React/TypeScript frontend and Django REST Framework backend. This platform streamlines the entire hiring process from application submission to candidate management.

![Veridia Platform](screenshots/Screenshot%20(1).png)

## 📋 Table of Contents

- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Screenshots](#-screenshots)
- [Getting Started](#-getting-started)
- [Local Development](#-local-development)
- [Production Deployment](#-production-deployment)
- [API Documentation](#-api-documentation)
- [Environment Variables](#-environment-variables)
- [Project Structure](#-project-structure)
- [Troubleshooting](#-troubleshooting)

## 🛠 Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Axios** - HTTP client for API calls
- **React Hook Form** - Form state management
- **Recharts** - Data visualization library
- **Sonner** - Toast notifications

### Backend
- **Django 5.2.9** - High-level Python web framework
- **Django REST Framework** - Powerful toolkit for building Web APIs
- **JWT Authentication** - Secure token-based authentication
- **PostgreSQL** - Production database (SQLite for local dev)
- **Celery** - Asynchronous task queue
- **Redis** - Caching and message broker
- **Gunicorn** - Production WSGI HTTP server
- **WhiteNoise** - Static file serving for Django

### Infrastructure & DevOps
- **Docker & Docker Compose** - Containerization
- **Nginx** - Reverse proxy and static file server (production)
- **PostgreSQL** - Relational database
- **Environment-based Configuration** - Secure configuration management

## ✨ Features

### For Applicants

#### 🔐 Authentication & Registration
- Secure user registration with email validation
- JWT-based authentication with refresh tokens
- Password reset functionality
- Profile management with photo upload

#### 📝 Application Management
- **Comprehensive Application Form**
  - Personal information (name, email, phone)
  - Professional details (experience, current company, salary expectations)
  - Education background (degree, university, graduation year)
  - Skills and qualifications
  - Portfolio links (LinkedIn, personal website)
  - Resume upload (PDF/DOCX)
  - Cover letter submission
  - Referral information

- **Application Dashboard**
  - View all submitted applications
  - Track application status in real-time
  - View application history and timeline
  - Withdraw applications if needed
  - Download submitted resumes

- **Profile Management**
  - Update personal information
  - Upload profile picture
  - Manage contact details
  - View application statistics

#### 📊 Dashboard Features
- Application statistics overview
- Status tracking (Under Review, Interview Scheduled, Accepted, Rejected)
- Quick actions for new applications
- Recent activity feed

### For Administrators (HR Team)

#### 🎛 Admin Dashboard
- **Overview Statistics**
  - Total applications count
  - Applications by status
  - Recent applications
  - Upcoming interviews
  - Department-wise breakdown

#### 📋 Application Management
- **Advanced Filtering & Search**
  - Filter by status, department, position
  - Search by applicant name, email, or keywords
  - Sort by date, status, or department
  - Pagination for large datasets

- **Application Review**
  - View complete application details
  - Download applicant resumes
  - Review cover letters and portfolios
  - Add internal notes and comments

- **Status Management**
  - Update application status
  - Schedule interviews with date/time
  - Add comments and feedback
  - Track status change history

#### 📈 Analytics & Reporting
- **Visual Analytics Dashboard**
  - Application trends over time
  - Department-wise application distribution
  - Status distribution charts
  - Interview scheduling statistics
  - Acceptance/rejection rates

- **Activity Logs**
  - Recent system activities
  - Application status changes
  - User actions tracking
  - Timestamped activity feed

#### ⚙️ System Management
- **Department Management**
  - Create and manage departments
  - Department descriptions
  - Active/inactive status

- **Position Management**
  - Create job positions
  - Link positions to departments
  - Position requirements and descriptions
  - Enable/disable positions

- **Settings**
  - System configuration
  - Email notification settings
  - Platform preferences

#### 📧 Automated Notifications
- Application submission confirmations
- Status update notifications
- Interview scheduling emails
- Acceptance/rejection notifications

### Security Features
- JWT token-based authentication
- Secure password hashing
- CSRF protection
- XSS protection
- SQL injection prevention
- Secure file uploads
- Environment-based secret management
- HTTPS support in production

### Additional Features
- Responsive design (mobile, tablet, desktop)
- Real-time status updates
- File upload handling (resumes, profile pictures)
- Email notifications
- Activity tracking and audit logs
- Role-based access control (Applicant/Admin)
- RESTful API architecture
- API pagination and filtering

## 📸 Screenshots

### Login & Registration
![Login Page](screenshots/Screenshot%20(1).png)
*Secure login interface with email and password authentication*

![Registration Page](screenshots/Screenshot%20(2).png)
*User-friendly registration form for new applicants*

### Applicant Dashboard
![Applicant Dashboard](screenshots/Screenshot%20(3).png)
*Overview dashboard showing application statistics and quick actions*

![Application Form](screenshots/Screenshot%20(4).png)
*Comprehensive application form with all required fields*

![My Applications](screenshots/Screenshot%20(5).png)
*View and manage all submitted applications*

![Applicant Profile](screenshots/Screenshot%20(6).png)
*Profile management page for applicants*

### Admin Dashboard
![Admin Dashboard](screenshots/Screenshot%20(7).png)
*Admin overview with key metrics and statistics*

![Applications Management](screenshots/Screenshot%20(8).png)
*Advanced application management with filtering and search*

![Analytics Dashboard](screenshots/Screenshot%20(9).png)
*Visual analytics and reporting dashboard*

![Admin Settings](screenshots/Screenshot%20(10).png)
*System settings and configuration page*

![Create Application](screenshots/Screenshot%20(11).png)
*Admin interface for creating new job positions*

## 🚀 Getting Started

### Prerequisites

- **Docker & Docker Compose** (Recommended)
  - Docker Desktop: [Download](https://www.docker.com/products/docker-desktop)
  - Docker Compose: Included with Docker Desktop

- **OR Local Development**
  - Node.js 20+ and npm
  - Python 3.12+
  - PostgreSQL 15+ (for production)

### Quick Start with Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd web
   ```

2. **Set up environment variables**
   
   Create `backend/.env`:
   ```env
   DEBUG=True
   SECRET_KEY=your-secret-key-here
   DATABASE_URL=postgresql://veridia:veridia123@db:5432/veridia
   CORS_ALLOWED_ORIGINS=http://localhost:5173
   EMAIL_HOST_USER=your-email@gmail.com
   EMAIL_HOST_PASSWORD=your-app-password
   ```
   
   Create `frontend/.env`:
   ```env
   VITE_API_URL=http://localhost:8000/api/v1
   ```

3. **Start all services**
   ```bash
   docker-compose up --build
   ```

4. **Run database migrations**
   ```bash
   docker-compose exec backend python manage.py migrate
   ```

5. **Create a superuser (admin account)**
   ```bash
   docker-compose exec backend python manage.py createsuperuser
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000/api/v1
   - Admin Panel: http://localhost:8000/admin

## 💻 Local Development

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   # Windows
   venv\Scripts\activate
   # Linux/Mac
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   
   Create `backend/.env`:
   ```env
   DEBUG=True
   SECRET_KEY=your-secret-key-here
   # Leave DATABASE_URL empty to use SQLite for local development
   DATABASE_URL=
   CORS_ALLOWED_ORIGINS=http://localhost:5173
   EMAIL_HOST_USER=your-email@gmail.com
   EMAIL_HOST_PASSWORD=your-app-password
   ```

5. **Run migrations**
   ```bash
   python manage.py migrate
   ```

6. **Create superuser**
   ```bash
   python manage.py createsuperuser
   ```

7. **Start development server**
   ```bash
   python manage.py runserver
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create `frontend/.env`:
   ```env
   VITE_API_URL=http://localhost:8000/api/v1
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:8000

## 🚢 Production Deployment

### Using Docker Compose (Production)

1. **Set up production environment variables**
   
   Update `backend/.env`:
   ```env
   DEBUG=False
   SECRET_KEY=your-strong-secret-key-here
   DATABASE_URL=postgresql://user:password@db:5432/veridia
   ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
   CORS_ALLOWED_ORIGINS=https://yourdomain.com
   SECURE_SSL_REDIRECT=True
   EMAIL_HOST_USER=your-email@gmail.com
   EMAIL_HOST_PASSWORD=your-app-password
   ```
   
   Update `frontend/.env`:
   ```env
   VITE_API_URL=https://api.yourdomain.com/api/v1
   ```

2. **Build and start production containers**
   ```bash
   docker-compose -f docker-compose.prod.yml up -d --build
   ```

3. **Run migrations**
   ```bash
   docker-compose -f docker-compose.prod.yml exec backend python manage.py migrate
   ```

4. **Collect static files**
   ```bash
   docker-compose -f docker-compose.prod.yml exec backend python manage.py collectstatic --noinput
   ```

5. **Create superuser**
   ```bash
   docker-compose -f docker-compose.prod.yml exec backend python manage.py createsuperuser
   ```

### Manual Production Deployment

1. **Backend Deployment**
   ```bash
   cd backend
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py collectstatic --noinput
   gunicorn veridia.wsgi:application --bind 0.0.0.0:8000 --workers 4
   ```

2. **Frontend Deployment**
   ```bash
   cd frontend
   npm install
   npm run build
   # Serve the dist/ folder with nginx or any static file server
   ```

## 📚 API Documentation

### Authentication Endpoints

- `POST /api/v1/auth/register/` - Register new applicant
- `POST /api/v1/auth/login/` - Login and get JWT tokens
- `POST /api/v1/auth/logout/` - Logout and blacklist token
- `POST /api/v1/auth/token/refresh/` - Refresh access token

### Applicant Endpoints

- `GET /api/v1/applicant/dashboard/stats/` - Get dashboard statistics
- `GET /api/v1/applicant/applications/` - List all applications
- `POST /api/v1/applicant/applications/` - Submit new application
- `GET /api/v1/applicant/applications/{id}/` - Get application details
- `DELETE /api/v1/applicant/applications/{id}/` - Withdraw application

### Admin Endpoints

- `GET /api/v1/admin/dashboard/stats/` - Get admin dashboard statistics
- `GET /api/v1/admin/applications/` - List all applications (with filters)
- `GET /api/v1/admin/applications/{id}/` - Get application details
- `PATCH /api/v1/admin/applications/{id}/` - Update application
- `PATCH /api/v1/admin/applications/{id}/status/` - Update application status
- `DELETE /api/v1/admin/applications/{id}/` - Delete application
- `GET /api/v1/admin/analytics/` - Get analytics data
- `GET /api/v1/admin/activity/` - Get recent activity
- `GET /api/v1/admin/interviews/upcoming/` - Get upcoming interviews

### Common Endpoints

- `GET /api/v1/profile/` - Get user profile
- `PATCH /api/v1/profile/` - Update user profile
- `GET /api/v1/departments/` - Get all departments
- `GET /api/v1/positions/` - Get all positions

## 🔧 Environment Variables

### Backend Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `DEBUG` | Enable debug mode | `False` | Yes |
| `SECRET_KEY` | Django secret key | - | Yes |
| `ALLOWED_HOSTS` | Comma-separated list of allowed hosts | `localhost,127.0.0.1` | Yes |
| `DATABASE_URL` | Database connection string | SQLite | No |
| `CORS_ALLOWED_ORIGINS` | Comma-separated CORS origins | `http://localhost:5173` | Yes |
| `EMAIL_HOST_USER` | Email username | - | No |
| `EMAIL_HOST_PASSWORD` | Email password | - | No |
| `DEFAULT_FROM_EMAIL` | Default sender email | `noreply@veridia.com` | No |
| `SECURE_SSL_REDIRECT` | Force HTTPS redirect | `False` | No |

### Frontend Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `VITE_API_URL` | Backend API URL | `http://localhost:8000/api/v1` | Yes |

## 📁 Project Structure

```
web/
├── backend/                    # Django backend
│   ├── applications/          # Application management app
│   │   ├── fixtures/         # Dummy data fixtures
│   │   ├── management/       # Management commands
│   │   ├── migrations/        # Database migrations
│   │   ├── models.py         # Application models
│   │   ├── serializers.py    # DRF serializers
│   │   ├── urls.py           # URL routing
│   │   └── views.py          # API views
│   ├── authentication/       # Authentication app
│   ├── users/                # User management app
│   ├── notifications/         # Email notifications
│   ├── veridia/              # Django project settings
│   │   ├── settings.py       # Main settings file
│   │   ├── urls.py           # Root URL config
│   │   └── wsgi.py           # WSGI config
│   ├── manage.py             # Django management script
│   ├── requirements.txt      # Python dependencies
│   ├── Dockerfile            # Backend Docker image
│   └── .env                  # Environment variables (create this)
│
├── frontend/                  # React frontend
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── pages/       # Page components
│   │   │   └── ui/          # UI component library
│   │   ├── services/        # API services
│   │   ├── App.tsx          # Main app component
│   │   └── main.tsx         # Entry point
│   ├── public/              # Static assets
│   ├── package.json         # Node dependencies
│   ├── Dockerfile           # Frontend dev Docker image
│   ├── Dockerfile.prod      # Frontend prod Docker image
│   ├── nginx.conf           # Nginx config for production
│   └── .env                 # Environment variables (create this)
│
├── screenshots/              # Platform screenshots
├── docker-compose.yml       # Development Docker Compose
├── docker-compose.prod.yml  # Production Docker Compose
└── README.md               # This file
```

## 🔍 Troubleshooting

### Backend Issues

**Migrations fail:**
```bash
python manage.py makemigrations
python manage.py migrate
```

**Port 8000 already in use:**
- Change port in `docker-compose.yml` or use `python manage.py runserver 8001`

**Database connection errors:**
- Check `DATABASE_URL` in `.env` file
- Ensure PostgreSQL is running (if using PostgreSQL)
- Verify database credentials

**Static files not loading:**
```bash
python manage.py collectstatic --noinput
```

### Frontend Issues

**Dependencies fail to install:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**API calls fail:**
- Verify `VITE_API_URL` in `frontend/.env`
- Check backend is running
- Verify CORS settings in backend

**Build errors:**
```bash
npm run build
# Check for TypeScript errors
```

### Docker Issues

**Containers fail to start:**
```bash
docker-compose logs backend
docker-compose logs frontend
```

**Rebuild containers:**
```bash
docker-compose down
docker-compose up --build --force-recreate
```

**Database connection in Docker:**
- Ensure `DATABASE_URL` uses service name: `postgresql://user:pass@db:5432/veridia`
- Check database container is healthy: `docker-compose ps`

### Email Configuration

**Emails not sending:**
- Verify `EMAIL_HOST_USER` and `EMAIL_HOST_PASSWORD` in `.env`
- For Gmail, use App Password (not regular password)
- Check email backend settings

## 📝 Additional Notes

### Loading Dummy Data

To load sample data for testing:

```bash
# Using Docker
docker-compose exec backend python manage.py create_dummy_data

# Local
python manage.py create_dummy_data
```

### Creating Superuser Without Password Prompt

```bash
# Using Docker
docker-compose exec backend python manage.py create_superuser_no_password

# Local
python manage.py create_superuser_no_password
```

### Database Backup

```bash
# PostgreSQL
pg_dump -U veridia veridia > backup.sql

# SQLite
cp db.sqlite3 backup.sqlite3
```

## 📄 License

© 2025 Veridia. All rights reserved.

## 🤝 Contributing

This is a private project for Veridia. For questions or issues, please contact the development team.

---

**Built with ❤️ for Veridia**

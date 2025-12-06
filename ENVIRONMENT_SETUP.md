# Environment Variables Setup Guide

This guide explains all environment variables used in the Veridia platform and how to configure them.

## Backend Environment Variables

Create a `.env` file in the `backend/` directory. You can copy from `backend/env.example`:

```bash
cp backend/env.example backend/.env
```

### Required Variables

| Variable | Description | Example | Default |
|----------|-------------|----------|---------|
| `SECRET_KEY` | Django secret key (required for production) | `django-insecure-...` | Auto-generated (dev only) |
| `DEBUG` | Enable debug mode | `True` or `False` | `False` |
| `ALLOWED_HOSTS` | Comma-separated list of allowed hosts | `localhost,127.0.0.1,yourdomain.com` | `localhost,127.0.0.1` |

### Database Configuration

**Important**: If `DATABASE_URL` is not set or empty, the system will automatically use SQLite. If PostgreSQL connection fails, it will also fallback to SQLite.

| Variable | Description | Example | Default |
|----------|-------------|----------|---------|
| `DATABASE_URL` | Database connection string (leave empty for SQLite) | `postgresql://user:pass@host:5432/dbname` | Empty (uses SQLite) |

**Examples:**
- **SQLite (default for local dev)**: Leave `DATABASE_URL` empty or don't set it
- **PostgreSQL**: `postgresql://veridia:password123@localhost:5432/veridia`
- **PostgreSQL in Docker**: `postgresql://veridia:password123@db:5432/veridia`

### API Configuration

| Variable | Description | Example | Default |
|----------|-------------|----------|---------|
| `API_PAGE_SIZE` | Number of items per page in API responses | `10`, `20`, `50` | `10` |

### JWT Authentication

| Variable | Description | Example | Default |
|----------|-------------|----------|---------|
| `JWT_ACCESS_TOKEN_LIFETIME_HOURS` | Access token validity in hours | `1`, `24` | `1` |
| `JWT_REFRESH_TOKEN_LIFETIME_DAYS` | Refresh token validity in days | `7`, `30` | `7` |
| `JWT_ROTATE_REFRESH_TOKENS` | Rotate refresh tokens on use | `True`, `False` | `True` |
| `JWT_BLACKLIST_AFTER_ROTATION` | Blacklist old tokens after rotation | `True`, `False` | `True` |
| `JWT_AUTH_HEADER_TYPES` | Authorization header types | `Bearer` | `Bearer` |

### CORS Configuration

| Variable | Description | Example | Default |
|----------|-------------|----------|---------|
| `CORS_ALLOWED_ORIGINS` | Comma-separated allowed origins (production only) | `https://yourdomain.com,https://www.yourdomain.com` | `http://localhost:5173` |

**Note**: In development (`DEBUG=True`), all origins are allowed automatically.

### Email Configuration

| Variable | Description | Example | Default |
|----------|-------------|----------|---------|
| `EMAIL_BACKEND` | Email backend class | `django.core.mail.backends.smtp.EmailBackend` | `django.core.mail.backends.smtp.EmailBackend` |
| `EMAIL_HOST` | SMTP server hostname | `smtp.gmail.com`, `smtp.sendgrid.net` | `smtp.gmail.com` |
| `EMAIL_PORT` | SMTP server port | `587`, `465` | `587` |
| `EMAIL_USE_TLS` | Use TLS encryption | `True`, `False` | `True` |
| `EMAIL_HOST_USER` | SMTP username | `your-email@gmail.com` | Empty |
| `EMAIL_HOST_PASSWORD` | SMTP password/app password | `your-app-password` | Empty |
| `DEFAULT_FROM_EMAIL` | Default sender email | `noreply@veridia.com` | `noreply@veridia.com` |

### Localization

| Variable | Description | Example | Default |
|----------|-------------|----------|---------|
| `LANGUAGE_CODE` | Default language | `en-us`, `fr-fr`, `es-es` | `en-us` |
| `TIME_ZONE` | Default timezone | `UTC`, `America/New_York`, `Asia/Kolkata` | `UTC` |

### Security Settings (Production)

| Variable | Description | Example | Default |
|----------|-------------|----------|---------|
| `SECURE_SSL_REDIRECT` | Force HTTPS redirect | `True`, `False` | `False` |

## Frontend Environment Variables

Create a `.env` file in the `frontend/` directory. You can copy from `frontend/env.example`:

```bash
cp frontend/env.example frontend/.env
```

### Required Variables

| Variable | Description | Example | Default |
|----------|-------------|----------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:8000/api/v1` | `http://localhost:8000/api/v1` |

**Examples:**
- **Local development**: `http://localhost:8000/api/v1`
- **Production**: `https://api.yourdomain.com/api/v1`

## Quick Setup Examples

### Local Development (SQLite)

**backend/.env:**
```env
DEBUG=True
SECRET_KEY=your-secret-key-here
# Leave DATABASE_URL empty to use SQLite
DATABASE_URL=
CORS_ALLOWED_ORIGINS=http://localhost:5173
```

**frontend/.env:**
```env
VITE_API_URL=http://localhost:8000/api/v1
```

### Local Development (PostgreSQL)

**backend/.env:**
```env
DEBUG=True
SECRET_KEY=your-secret-key-here
DATABASE_URL=postgresql://veridia:password123@localhost:5432/veridia
CORS_ALLOWED_ORIGINS=http://localhost:5173
```

**frontend/.env:**
```env
VITE_API_URL=http://localhost:8000/api/v1
```

### Production

**backend/.env:**
```env
DEBUG=False
SECRET_KEY=your-very-strong-secret-key-here
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
DATABASE_URL=postgresql://user:strong-password@db-host:5432/veridia
CORS_ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
SECURE_SSL_REDIRECT=True
```

**frontend/.env:**
```env
VITE_API_URL=https://api.yourdomain.com/api/v1
```

## Database Fallback Behavior

The system automatically handles database fallback:

1. **If `DATABASE_URL` is not set or empty**: Uses SQLite automatically
2. **If `DATABASE_URL` is set but PostgreSQL is unavailable**: 
   - The application will show a connection error
   - To use SQLite instead, simply remove or comment out `DATABASE_URL` in `.env`
   - Restart the application

## Environment Variable Priority

1. Environment variables from `.env` file (loaded by docker-compose or python-decouple)
2. System environment variables
3. Default values in code

## Security Best Practices

1. **Never commit `.env` files** - They contain sensitive information
2. **Use strong SECRET_KEY** in production - Generate with:
   ```bash
   python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
   ```
3. **Use app passwords** for Gmail (not your regular password)
4. **Restrict ALLOWED_HOSTS** in production
5. **Use HTTPS** in production (`SECURE_SSL_REDIRECT=True`)

## Troubleshooting

### Database Connection Issues

If you see PostgreSQL connection errors:

1. **Check if PostgreSQL is running**:
   ```bash
   # Docker
   docker-compose ps db
   
   # Local
   sudo systemctl status postgresql
   ```

2. **Verify DATABASE_URL format**:
   ```
   postgresql://username:password@host:port/database
   ```

3. **Use SQLite instead**:
   - Remove or comment out `DATABASE_URL` in `.env`
   - Restart the application

### API Connection Issues

If frontend can't connect to backend:

1. **Check VITE_API_URL** matches your backend URL
2. **Check CORS settings** in backend
3. **Verify backend is running** on the specified port
4. **Check browser console** for CORS errors

### Email Not Sending

1. **Verify EMAIL_HOST_USER** and **EMAIL_HOST_PASSWORD** are set
2. **For Gmail**: Use App Password, not regular password
3. **Check EMAIL_HOST** and **EMAIL_PORT** are correct
4. **Test with console backend** (for development):
   ```env
   EMAIL_BACKEND=django.core.mail.backends.console.EmailBackend
   ```


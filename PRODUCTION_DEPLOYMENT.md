# Production Deployment Guide

This guide covers deploying the Veridia platform to production using Docker Compose.

## Prerequisites

- Docker and Docker Compose installed on production server
- Domain name configured (optional but recommended)
- SSL certificate (for HTTPS)
- Email service credentials (Gmail, SendGrid, etc.)

## Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] Strong SECRET_KEY generated
- [ ] DEBUG set to False
- [ ] Database credentials secured
- [ ] CORS origins configured correctly
- [ ] Email service configured
- [ ] SSL certificate obtained (for HTTPS)
- [ ] Domain DNS configured

## Step 1: Generate Secret Key

Generate a strong secret key for Django:

```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

Or use an online generator: https://djecrety.ir/

## Step 2: Configure Environment Variables

### Backend Environment (`backend/.env`)

```env
# Security
DEBUG=False
SECRET_KEY=your-strong-secret-key-from-step-1
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com

# Database (PostgreSQL)
DATABASE_URL=postgresql://veridia:strong-password@db:5432/veridia

# CORS
CORS_ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

# Email Configuration
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
DEFAULT_FROM_EMAIL=noreply@yourdomain.com

# Security Settings
SECURE_SSL_REDIRECT=True
```

### Frontend Environment (`frontend/.env`)

```env
VITE_API_URL=https://api.yourdomain.com/api/v1
```

**Note**: Update `docker-compose.prod.yml` if your API is on a different domain.

## Step 3: Update Docker Compose Production File

Edit `docker-compose.prod.yml` and update:

1. **Database credentials** in the `db` service
2. **Port mappings** if needed (default: 80 for frontend, 8000 for backend)
3. **Environment variables** if not using `.env` files

## Step 4: Build and Deploy

### Initial Deployment

```bash
# Build and start services
docker-compose -f docker-compose.prod.yml up -d --build

# Run migrations
docker-compose -f docker-compose.prod.yml exec backend python manage.py migrate

# Collect static files
docker-compose -f docker-compose.prod.yml exec backend python manage.py collectstatic --noinput

# Create superuser
docker-compose -f docker-compose.prod.yml exec backend python manage.py createsuperuser
```

### Verify Deployment

```bash
# Check container status
docker-compose -f docker-compose.prod.yml ps

# Check logs
docker-compose -f docker-compose.prod.yml logs -f

# Test backend
curl http://localhost:8000/api/v1/departments/

# Test frontend
curl http://localhost:80
```

## Step 5: Configure Reverse Proxy (Nginx)

If you need a reverse proxy in front of your containers:

### Nginx Configuration Example

```nginx
# /etc/nginx/sites-available/veridia
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    
    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;

    # Frontend
    location / {
        proxy_pass http://localhost:80;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Admin Panel
    location /admin/ {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## Step 6: Set Up SSL Certificate

### Using Let's Encrypt (Certbot)

```bash
# Install Certbot
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal (already configured by Certbot)
```

## Step 7: Database Backup

Set up automated backups:

```bash
# Create backup script
cat > /usr/local/bin/backup-veridia.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/backups/veridia"
DATE=$(date +%Y%m%d_%H%M%S)
mkdir -p $BACKUP_DIR
docker-compose -f /path/to/docker-compose.prod.yml exec -T db pg_dump -U veridia veridia > $BACKUP_DIR/backup_$DATE.sql
# Keep only last 7 days
find $BACKUP_DIR -name "backup_*.sql" -mtime +7 -delete
EOF

chmod +x /usr/local/bin/backup-veridia.sh

# Add to crontab (daily at 2 AM)
crontab -e
# Add: 0 2 * * * /usr/local/bin/backup-veridia.sh
```

## Step 8: Monitoring and Logs

### View Logs

```bash
# All services
docker-compose -f docker-compose.prod.yml logs -f

# Specific service
docker-compose -f docker-compose.prod.yml logs -f backend
docker-compose -f docker-compose.prod.yml logs -f frontend
docker-compose -f docker-compose.prod.yml logs -f db
```

### Health Checks

```bash
# Check container health
docker-compose -f docker-compose.prod.yml ps

# Test API endpoint
curl https://api.yourdomain.com/api/v1/departments/
```

## Step 9: Updates and Maintenance

### Updating the Application

```bash
# Pull latest code
git pull

# Rebuild and restart
docker-compose -f docker-compose.prod.yml up -d --build

# Run migrations if needed
docker-compose -f docker-compose.prod.yml exec backend python manage.py migrate

# Collect static files if needed
docker-compose -f docker-compose.prod.yml exec backend python manage.py collectstatic --noinput
```

### Rolling Back

```bash
# Stop services
docker-compose -f docker-compose.prod.yml down

# Checkout previous version
git checkout <previous-commit>

# Rebuild and start
docker-compose -f docker-compose.prod.yml up -d --build
```

## Security Best Practices

1. **Never commit `.env` files** - They contain sensitive information
2. **Use strong passwords** - For database, admin accounts, etc.
3. **Enable HTTPS** - Always use SSL/TLS in production
4. **Regular updates** - Keep Docker images and dependencies updated
5. **Firewall rules** - Only expose necessary ports
6. **Backup regularly** - Automated daily backups
7. **Monitor logs** - Set up log monitoring and alerts
8. **Rate limiting** - Consider adding rate limiting for API endpoints

## Performance Optimization

1. **Database indexing** - Ensure proper indexes on frequently queried fields
2. **Caching** - Use Redis for caching (already configured)
3. **Static files** - Served via WhiteNoise (already configured)
4. **Gunicorn workers** - Adjust worker count based on server resources
5. **CDN** - Consider using CDN for static assets

## Troubleshooting

### Services Won't Start

```bash
# Check logs
docker-compose -f docker-compose.prod.yml logs

# Check container status
docker-compose -f docker-compose.prod.yml ps

# Restart services
docker-compose -f docker-compose.prod.yml restart
```

### Database Connection Issues

```bash
# Check database is running
docker-compose -f docker-compose.prod.yml ps db

# Check database logs
docker-compose -f docker-compose.prod.yml logs db

# Test connection
docker-compose -f docker-compose.prod.yml exec backend python manage.py dbshell
```

### Static Files Not Loading

```bash
# Recollect static files
docker-compose -f docker-compose.prod.yml exec backend python manage.py collectstatic --noinput

# Check permissions
docker-compose -f docker-compose.prod.yml exec backend ls -la /code/staticfiles
```

## Support

For production issues, check:
1. Application logs
2. Docker logs
3. Server system logs
4. Database logs
5. Nginx/Reverse proxy logs

---

**Important**: Always test changes in a staging environment before deploying to production!


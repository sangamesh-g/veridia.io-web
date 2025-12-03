# Docker Troubleshooting Guide

## Common Issues and Solutions

### Issue: `invalid file request node_modules/.bin/acorn`

**Cause**: Docker is trying to copy `node_modules` which contains symlinks that can't be resolved on Windows.

**Solution**: 
1. ✅ Created `.dockerignore` files to exclude `node_modules`
2. The Dockerfile now uses `npm ci` which is faster and more reliable
3. Docker volumes handle `node_modules` separately

### Issue: Build context too large

**Solution**: The `.dockerignore` files exclude:
- `node_modules/`
- `dist/`
- `.git/`
- `*.log`
- Other unnecessary files

### Issue: Version warning in docker-compose.yml

**Solution**: Removed the `version` field as it's obsolete in newer Docker Compose versions.

## Rebuilding After Fixes

If you encounter build issues:

```bash
# Clean build (removes old images)
docker-compose build --no-cache

# Or rebuild specific service
docker-compose build --no-cache frontend
docker-compose build --no-cache backend

# Then start services
docker-compose up
```

## Volume Mounting

The docker-compose.yml uses volumes to mount local directories:
- `./frontend:/app` - Mounts frontend code
- `/app/node_modules` - Anonymous volume to preserve node_modules in container
- `./backend:/code` - Mounts backend code

This allows hot-reloading during development.

## If Build Still Fails

1. **Check .dockerignore exists**: Both `frontend/.dockerignore` and `backend/.dockerignore` should exist
2. **Clear Docker cache**: `docker system prune -a`
3. **Rebuild from scratch**: `docker-compose build --no-cache`
4. **Check disk space**: Docker builds require sufficient disk space

## Windows-Specific Notes

- Symlinks in `node_modules` can cause issues - `.dockerignore` handles this
- Use WSL2 if possible for better Docker performance
- Ensure Docker Desktop has enough resources allocated


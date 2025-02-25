#!/bin/bash
# Exit on error
set -e

echo "Starting direct deployment..."

# Setup application directory
APP_DIR="/var/www/vm202318.hosted-by-robovps.ru"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
RELEASE_DIR="$APP_DIR/releases/$TIMESTAMP" 

# Create required directories
if [ ! -d "$APP_DIR" ]; then
    sudo mkdir -p "$APP_DIR"
fi

if [ ! -d "$APP_DIR/releases" ]; then
    sudo mkdir -p "$APP_DIR/releases"
fi

# Set proper permissions
sudo chown -R www-data:www-data "$APP_DIR"
sudo chmod -R 755 "$APP_DIR"

# Create release directory
sudo mkdir -p "$RELEASE_DIR"
sudo chown -R $USER:$USER "$RELEASE_DIR"

# Copy application files to release directory
echo "Copying application files..."
sudo cp -r . "$RELEASE_DIR/"

# Install dependencies and build
cd "$RELEASE_DIR"
echo "Installing dependencies..."
npm install
npm install -g typescript
echo "Building application..."
npm run build

# Update symlinks
echo "Updating symlinks..."
sudo ln -sfn "$RELEASE_DIR" "$APP_DIR/current"
sudo ln -sfn "$APP_DIR/current/dist" "$APP_DIR/public"

# Configure Nginx
echo "Configuring Nginx..."
sudo cp nginx/digital-store.conf /etc/nginx/sites-available/vm202318.hosted-by-robovps.ru.conf
sudo ln -sf /etc/nginx/sites-available/vm202318.hosted-by-robovps.ru.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# Setup PM2
echo "Setting up PM2..."
cd $APP_DIR/current
pm2 delete digital-store 2>/dev/null || true
pm2 start server/index.js --name digital-store
pm2 save

# Cleanup old releases (keep last 5)
cd $APP_DIR/releases
ls -t | tail -n +6 | xargs -r rm -rf

echo "Deployment completed successfully!"
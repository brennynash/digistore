#!/bin/bash
# Exit on error
set -e

echo "Starting deployment..."

# Load environment variables
source .env

# Setup application directory with proper permissions
APP_DIR="/var/www/vm202318.hosted-by-robovps.ru/public_html"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
RELEASE_DIR="$APP_DIR/releases/$TIMESTAMP"

# Create required directories with proper permissions
sudo mkdir -p $APP_DIR/releases
sudo chown -R $USER:$USER $APP_DIR
sudo chmod -R 755 $APP_DIR
sudo mkdir -p $RELEASE_DIR

# Copy application files
echo "Copying application files..."
rsync -av --exclude={'.git','node_modules','dist'} . $RELEASE_DIR/

# Install dependencies and build
cd $RELEASE_DIR
echo "Installing dependencies..."
npm install --production
echo "Building application..."
npm run build

# Update symlinks
echo "Updating symlinks..."
ln -sfn $RELEASE_DIR $APP_DIR/current
ln -sfn $APP_DIR/current/dist/* $APP_DIR/public_html/

# Configure Nginx
echo "Configuring Nginx..."
sudo cp nginx/digital-store.conf /etc/nginx/sites-available/digital-store
sudo ln -sf /etc/nginx/sites-available/digital-store /etc/nginx/sites-enabled/
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
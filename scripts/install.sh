#!/bin/bash

# Update system packages
sudo apt-get update
sudo apt-get upgrade -y

# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 globally
sudo npm install -g pm2

# Create application directory
sudo mkdir -p /var/www/digital-store
sudo chown -R $USER:$USER /var/www/digital-store

# Copy application files
cp -r . /var/www/digital-store/

# Install dependencies and build
cd /var/www/digital-store
npm install
npm run build

# Setup PM2 process
pm2 start server/index.js --name "digital-store"
pm2 save
pm2 startup

# Print setup complete message
echo "Installation complete! The application is running on port 3000"
echo "To view logs: pm2 logs digital-store"
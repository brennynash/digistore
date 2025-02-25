#!/bin/bash
# Exit on error
set -e

echo "Setting up Ubuntu server for Digital Store..."

# Update system packages
sudo apt-get update
sudo apt-get upgrade -y

# Install required packages
sudo apt-get install -y nginx certbot python3-certbot-nginx

# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 globally
sudo npm install -g pm2

# Create application directory
sudo mkdir -p /var/www/digital-store
sudo chown -R $USER:$USER /var/www/digital-store

echo "Basic setup completed!"
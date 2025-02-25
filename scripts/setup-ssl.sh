#!/bin/bash
# Exit on error
set -e

# Install certbot if not already installed
if ! command -v certbot &> /dev/null; then
  sudo apt-get update
  sudo apt-get install -y certbot python3-certbot-nginx
fi

# Get SSL certificate
sudo certbot --nginx -d vm202318.hosted-by-robovps.ru --non-interactive --agree-tos --email admin@vm202318.hosted-by-robovps.ru

# Restart Nginx
sudo systemctl restart nginx

echo "SSL certificate installed successfully for vm202318.hosted-by-robovps.ru"
#!/bin/bash

# Exit on error
set -e

# Create backup directory
BACKUP_DIR="/var/backups/digital-store"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_PATH="$BACKUP_DIR/backup_$TIMESTAMP"

# Create backup directories
sudo mkdir -p $BACKUP_PATH

# Backup application files
echo "Backing up application files..."
sudo cp -r /var/www/digital-store $BACKUP_PATH/app

# Backup Nginx configuration
echo "Backing up Nginx configuration..."
sudo cp /etc/nginx/sites-available/digital-store $BACKUP_PATH/nginx.conf

# Create archive
cd $BACKUP_DIR
sudo tar -czf backup_$TIMESTAMP.tar.gz backup_$TIMESTAMP
sudo rm -rf backup_$TIMESTAMP

echo "Backup completed: $BACKUP_DIR/backup_$TIMESTAMP.tar.gz"
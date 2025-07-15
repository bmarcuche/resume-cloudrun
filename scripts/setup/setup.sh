#!/bin/bash

# Setup script for Resume on CloudRun
set -e

echo "🚀 Setting up Resume on CloudRun..."

# Check if .env exists
if [ -f .env ]; then
    echo "⚠️  .env file already exists. Do you want to overwrite it? (y/N)"
    read -r response
    if [[ ! "$response" =~ ^[Yy]$ ]]; then
        echo "Setup cancelled. Existing .env file preserved."
        exit 0
    fi
fi

# Copy .env.example to .env
if [ -f .env.example ]; then
    cp .env.example .env
    echo "✅ Created .env file from .env.example"
else
    echo "❌ Error: .env.example file not found"
    exit 1
fi

echo ""
echo "📝 Please edit the .env file with your configuration:"
echo "   - PROJECT_ID: Your Google Cloud Project ID"
echo "   - SERVICE_NAME: Your preferred Cloud Run service name"
echo "   - CUSTOM_DOMAIN: Your custom domain (e.g., resume.yourdomain.com)"
echo "   - DNS_ZONE: Your Google Cloud DNS zone name"
echo ""

# Prompt for basic configuration
echo "🔧 Quick Configuration (press Enter to skip and edit manually later):"

read -p "Google Cloud Project ID: " project_id
if [ ! -z "$project_id" ]; then
    sed -i "s/your-gcp-project-id/$project_id/g" .env
fi

read -p "Service Name (e.g., my-resume): " service_name
if [ ! -z "$service_name" ]; then
    sed -i "s/your-service-name/$service_name/g" .env
fi

read -p "Custom Domain (e.g., resume.mydomain.com): " custom_domain
if [ ! -z "$custom_domain" ]; then
    sed -i "s/your-domain.com/$custom_domain/g" .env
fi

read -p "DNS Zone Name: " dns_zone
if [ ! -z "$dns_zone" ]; then
    sed -i "s/your-dns-zone-name/$dns_zone/g" .env
fi

echo ""
echo "✅ Basic setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Review and edit .env file: nano .env"
echo "2. Install dependencies: npm install"
echo "3. Start development: npm run dev"
echo "4. Deploy to production: ./deploy-resume.sh"
echo ""
echo "📚 Documentation:"
echo "   - README.md: Complete setup guide"
echo "   - .env.example: All available configuration options"
echo ""
echo "🔒 Security Note: Never commit the .env file to version control!"

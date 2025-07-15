#!/bin/bash

# Complete domain mapping after verification
set -e

# Load environment variables
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
else
    echo "❌ Error: .env file not found. Please copy .env.example to .env and configure your values."
    exit 1
fi

# Validate required environment variables
required_vars=("PROJECT_ID" "SERVICE_NAME" "REGION" "CUSTOM_DOMAIN")
for var in "${required_vars[@]}"; do
    if [ -z "${!var}" ]; then
        echo "❌ Error: Required environment variable $var is not set in .env file"
        exit 1
    fi
done

echo "🔗 Creating domain mapping for ${CUSTOM_DOMAIN}..."

${GCLOUD_PATH:-gcloud} beta run domain-mappings create \
  --service=${SERVICE_NAME} \
  --domain=${CUSTOM_DOMAIN} \
  --region=${REGION} \
  --project=${PROJECT_ID}

echo "✅ Domain mapping created successfully!"
echo "🌐 Your resume will be available at: https://${CUSTOM_DOMAIN}"
echo "⏳ DNS propagation may take a few minutes to complete."

# Get DNS records that need to be configured
echo ""
echo "📋 DNS Records to configure:"
${GCLOUD_PATH:-gcloud} beta run domain-mappings describe ${CUSTOM_DOMAIN} \
  --region=${REGION} \
  --project=${PROJECT_ID} \
  --format="table(spec.routeName, status.resourceRecords[].name, status.resourceRecords[].rrdata)" || echo "Unable to retrieve DNS records - check Cloud Console"

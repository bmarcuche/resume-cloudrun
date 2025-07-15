#!/bin/bash

# Deployment script for mindtunnel.org (legacy)
set -e

# Load environment variables
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
else
    echo "❌ Error: .env file not found. Please copy .env.example to .env and configure your values."
    exit 1
fi

# Override for main domain deployment
MAIN_DOMAIN="mindtunnel.org"
MAIN_SERVICE="mindtunnel-site"

echo "🚀 Deploying ${MAIN_DOMAIN} to Google Cloud Run..."

# Build and push the Docker image
echo "📦 Building Docker image..."
docker build -t gcr.io/${PROJECT_ID}/${MAIN_SERVICE} .

echo "📤 Pushing image to Google Container Registry..."
docker push gcr.io/${PROJECT_ID}/${MAIN_SERVICE}

# Deploy to Cloud Run
echo "🌐 Deploying to Cloud Run..."
${GCLOUD_PATH:-gcloud} run deploy ${MAIN_SERVICE} \
  --image=gcr.io/${PROJECT_ID}/${MAIN_SERVICE} \
  --platform=managed \
  --region=${REGION} \
  --allow-unauthenticated \
  --port=${PORT:-3000} \
  --memory=${MEMORY:-512Mi} \
  --cpu=${CPU:-1} \
  --max-instances=${MAX_INSTANCES:-10} \
  --project=${PROJECT_ID}

# Get the service URL
SERVICE_URL=$(${GCLOUD_PATH:-gcloud} run services describe ${MAIN_SERVICE} --region=${REGION} --format="value(status.url)" --project=${PROJECT_ID})
echo "✅ Service deployed at: $SERVICE_URL"

# Map custom domain
echo "🔗 Mapping custom domain..."
${GCLOUD_PATH:-gcloud} beta run domain-mappings create \
  --service=${MAIN_SERVICE} \
  --domain=${MAIN_DOMAIN} \
  --region=${REGION} \
  --project=${PROJECT_ID} || echo "Domain mapping may already exist"

echo "🎉 Deployment complete!"
echo "Your site will be available at: https://${MAIN_DOMAIN}"
echo "Note: DNS propagation may take a few minutes to complete."

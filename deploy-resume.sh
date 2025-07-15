#!/bin/bash

# Deployment script for resume.mindtunnel.org
set -e

PROJECT_ID="secret-proton-465722-q0"
SERVICE_NAME="mindtunnel-resume"
REGION="us-central1"
IMAGE_NAME="gcr.io/$PROJECT_ID/$SERVICE_NAME"
GCLOUD_PATH="$HOME/google-cloud-sdk/bin/gcloud"

echo "🚀 Deploying resume.mindtunnel.org to Google Cloud Run..."

# Build and push the Docker image
echo "📦 Building Docker image..."
docker build -t $IMAGE_NAME .

echo "📤 Pushing image to Google Container Registry..."
docker push $IMAGE_NAME

# Deploy to Cloud Run
echo "🌐 Deploying to Cloud Run..."
$GCLOUD_PATH run deploy $SERVICE_NAME \
  --image=$IMAGE_NAME \
  --platform=managed \
  --region=$REGION \
  --allow-unauthenticated \
  --port=3000 \
  --memory=512Mi \
  --cpu=1 \
  --max-instances=10 \
  --project=$PROJECT_ID

# Get the service URL
SERVICE_URL=$($GCLOUD_PATH run services describe $SERVICE_NAME --region=$REGION --format="value(status.url)" --project=$PROJECT_ID)
echo "✅ Service deployed at: $SERVICE_URL"

# Map custom domain
echo "🔗 Mapping custom domain resume.mindtunnel.org..."
$GCLOUD_PATH run domain-mappings create \
  --service=$SERVICE_NAME \
  --domain=resume.mindtunnel.org \
  --region=$REGION \
  --project=$PROJECT_ID || echo "Domain mapping may already exist"

echo "🎉 Deployment complete!"
echo "Your resume site will be available at: https://resume.mindtunnel.org"
echo "Note: DNS propagation may take a few minutes to complete."
echo ""
echo "📋 Next steps:"
echo "1. Verify domain ownership in Google Cloud Console if not already done"
echo "2. Add DNS records for resume.mindtunnel.org:"
echo "   - Add CNAME record: resume.mindtunnel.org -> ghs.googlehosted.com"
echo "   - Or get the specific DNS records from the Cloud Console"

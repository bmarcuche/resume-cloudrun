#!/bin/bash

# Deployment script for resume.mindtunnel.org
set -e

# Load environment variables
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
else
    echo "❌ Error: .env file not found. Please copy .env.example to .env and configure your values."
    exit 1
fi

# Validate required environment variables
required_vars=("PROJECT_ID" "SERVICE_NAME" "REGION" "IMAGE_NAME" "CUSTOM_DOMAIN")
for var in "${required_vars[@]}"; do
    if [ -z "${!var}" ]; then
        echo "❌ Error: Required environment variable $var is not set in .env file"
        exit 1
    fi
done

echo "🚀 Deploying ${CUSTOM_DOMAIN} to Google Cloud Run..."
echo "📋 Configuration:"
echo "   Project ID: ${PROJECT_ID}"
echo "   Service: ${SERVICE_NAME}"
echo "   Region: ${REGION}"
echo "   Domain: ${CUSTOM_DOMAIN}"
echo ""

# Build and push the Docker image
echo "📦 Building Docker image..."
docker build -t ${IMAGE_NAME} .

echo "📤 Pushing image to Google Container Registry..."
docker push ${IMAGE_NAME}

# Deploy to Cloud Run
echo "🌐 Deploying to Cloud Run..."
${GCLOUD_PATH:-gcloud} run deploy ${SERVICE_NAME} \
  --image=${IMAGE_NAME} \
  --platform=managed \
  --region=${REGION} \
  --allow-unauthenticated \
  --port=${PORT:-3000} \
  --memory=${MEMORY:-512Mi} \
  --cpu=${CPU:-1} \
  --max-instances=${MAX_INSTANCES:-10} \
  --project=${PROJECT_ID}

# Get the service URL
SERVICE_URL=$(${GCLOUD_PATH:-gcloud} run services describe ${SERVICE_NAME} --region=${REGION} --format="value(status.url)" --project=${PROJECT_ID})
echo "✅ Service deployed at: $SERVICE_URL"

# Map custom domain
echo "🔗 Mapping custom domain ${CUSTOM_DOMAIN}..."
${GCLOUD_PATH:-gcloud} beta run domain-mappings create \
  --service=${SERVICE_NAME} \
  --domain=${CUSTOM_DOMAIN} \
  --region=${REGION} \
  --project=${PROJECT_ID} || echo "Domain mapping may already exist"

echo "🎉 Deployment complete!"
echo "Your resume site will be available at: https://${CUSTOM_DOMAIN}"
echo "Note: DNS propagation may take a few minutes to complete."
echo ""
echo "📋 Next steps:"
echo "1. Verify domain ownership in Google Cloud Console if not already done"
echo "2. Add DNS records for ${CUSTOM_DOMAIN}:"
echo "   - Add CNAME record: $(echo ${CUSTOM_DOMAIN} | cut -d'.' -f1) -> ghs.googlehosted.com"
echo "   - Or get the specific DNS records from the Cloud Console"

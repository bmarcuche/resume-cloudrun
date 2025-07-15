#!/bin/bash

# Complete domain mapping after verification
set -e

PROJECT_ID="secret-proton-465722-q0"
SERVICE_NAME="mindtunnel-resume"
REGION="us-central1"

echo "🔗 Creating domain mapping for resume.mindtunnel.org..."

gcloud beta run domain-mappings create \
  --service=$SERVICE_NAME \
  --domain=resume.mindtunnel.org \
  --region=$REGION \
  --project=$PROJECT_ID

echo "✅ Domain mapping created successfully!"
echo "🌐 Your resume will be available at: https://resume.mindtunnel.org"
echo "⏳ DNS propagation may take a few minutes to complete."

# Get DNS records that need to be configured
echo ""
echo "📋 DNS Records to configure:"
gcloud beta run domain-mappings describe resume.mindtunnel.org \
  --region=$REGION \
  --project=$PROJECT_ID \
  --format="table(spec.routeName, status.resourceRecords[].name, status.resourceRecords[].rrdata)"

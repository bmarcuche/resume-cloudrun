# CI/CD Pipeline Setup Guide

## 🎯 Overview

This document provides a comprehensive guide for setting up and maintaining the production-ready CI/CD pipeline for the resume.mindtunnel.org application.

## 🏗️ Architecture

### Pipeline Stages

1. **Validation & Testing** - Code quality, security, and functionality validation
2. **Security Scanning** - Vulnerability assessment and dependency auditing
3. **Container Build** - Docker image creation and optimization
4. **Deployment** - Cloud Run service deployment with health checks
5. **Post-Deployment Monitoring** - Service validation and performance monitoring
6. **Rollback Capability** - Automated rollback on deployment failures

### Technology Stack

- **CI/CD Platform**: GitHub Actions
- **Container Registry**: Google Container Registry (GCR)
- **Deployment Target**: Google Cloud Run
- **Domain Management**: Google Cloud DNS
- **Monitoring**: Google Cloud Monitoring
- **Security Scanning**: Snyk, npm audit

## 🔧 Setup Instructions

### 1. GitHub Repository Secrets

Configure the following secrets in your GitHub repository settings:

```bash
# Required Secrets
GCP_SA_KEY              # Google Cloud Service Account JSON key
GCP_PROJECT_ID          # Your Google Cloud Project ID
GCP_REGION              # Deployment region (e.g., us-central1)
CLOUD_RUN_SERVICE       # Cloud Run service name
SNYK_TOKEN              # Snyk security scanning token (optional)
```

### 2. Service Account Setup

Create a Google Cloud Service Account with the following roles:

```bash
# Create service account
gcloud iam service-accounts create resume-cicd \
  --display-name="Resume CI/CD Service Account" \
  --description="Service account for automated deployments"

# Assign required roles
gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
  --member="serviceAccount:resume-cicd@YOUR_PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/run.admin"

gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
  --member="serviceAccount:resume-cicd@YOUR_PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/storage.admin"

gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
  --member="serviceAccount:resume-cicd@YOUR_PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/iam.serviceAccountUser"

# Generate and download key
gcloud iam service-accounts keys create resume-cicd-key.json \
  --iam-account=resume-cicd@YOUR_PROJECT_ID.iam.gserviceaccount.com
```

### 3. Domain Configuration

Ensure your custom domain is properly configured:

```bash
# Verify domain ownership (one-time setup)
gcloud domains verify resume.mindtunnel.org

# Create domain mapping
gcloud run domain-mappings create \
  --service=YOUR_SERVICE_NAME \
  --domain=resume.mindtunnel.org \
  --region=us-central1
```

### 4. Environment Configuration

Update your repository with the following configuration files:

- `.env.example` - Environment variable template
- `next.config.js` - Next.js production configuration
- `Dockerfile` - Optimized container configuration

## 🚀 Pipeline Workflow

### Trigger Conditions

- **Push to main**: Full deployment pipeline
- **Pull Request**: Validation and security scanning only
- **Manual Dispatch**: On-demand deployment with environment selection

### Stage Details

#### 1. Validation Stage
- **Code Quality**: ESLint, TypeScript checking
- **Testing**: Jest unit tests with coverage reporting
- **Build Verification**: Next.js build validation
- **Artifact Storage**: Build artifacts stored for deployment

#### 2. Security Stage
- **Dependency Audit**: npm audit for known vulnerabilities
- **Code Scanning**: Snyk security analysis
- **Container Scanning**: Docker image vulnerability assessment

#### 3. Build Stage
- **Multi-stage Docker Build**: Optimized container creation
- **Image Tagging**: Semantic versioning and SHA-based tags
- **Registry Push**: Secure image storage in GCR
- **Build Caching**: Layer caching for faster builds

#### 4. Deployment Stage
- **Health Checks**: Pre-deployment service validation
- **Rolling Deployment**: Zero-downtime deployment strategy
- **Domain Verification**: Custom domain mapping validation
- **Performance Testing**: Response time and availability checks

#### 5. Monitoring Stage
- **Service Health**: Continuous health monitoring
- **Performance Metrics**: Response time and error rate tracking
- **Alerting**: Automated notifications for issues

#### 6. Rollback Stage
- **Failure Detection**: Automatic failure detection
- **Previous Version Identification**: Last known good revision
- **Automated Rollback**: Instant rollback to stable version

## 📊 Monitoring & Observability

### Health Endpoints

- `/api/health` - Service health status
- `/api/ready` - Readiness probe for load balancers

### Key Metrics

- **Response Time**: < 2 seconds target
- **Availability**: 99.9% uptime target
- **Error Rate**: < 1% error threshold
- **Memory Usage**: < 80% of allocated memory
- **CPU Usage**: < 80% of allocated CPU

### Alerting

Configure alerts for:
- Service downtime
- High response times (> 3 seconds)
- Error rate spikes (> 5%)
- SSL certificate expiration (< 30 days)

## 🔒 Security Considerations

### Container Security
- Non-root user execution
- Minimal base image (Alpine Linux)
- No sensitive data in images
- Regular base image updates

### Network Security
- HTTPS enforcement
- Security headers implementation
- CORS configuration
- Rate limiting (if needed)

### Access Control
- Service account with minimal permissions
- Secret management through GitHub Secrets
- Environment-specific configurations

## 🛠️ Maintenance

### Regular Tasks

1. **Weekly**:
   - Review security scan results
   - Check performance metrics
   - Validate backup procedures

2. **Monthly**:
   - Update dependencies
   - Review and rotate secrets
   - Performance optimization review

3. **Quarterly**:
   - Security audit
   - Disaster recovery testing
   - Pipeline optimization review

### Troubleshooting

#### Common Issues

1. **Deployment Failures**:
   ```bash
   # Check Cloud Run logs
   gcloud logs read --service=YOUR_SERVICE_NAME --region=us-central1
   
   # Validate service account permissions
   gcloud projects get-iam-policy YOUR_PROJECT_ID
   ```

2. **Domain Issues**:
   ```bash
   # Check domain mapping status
   gcloud run domain-mappings describe resume.mindtunnel.org --region=us-central1
   
   # Verify DNS configuration
   nslookup resume.mindtunnel.org
   ```

3. **Performance Issues**:
   ```bash
   # Run deployment validation
   ./scripts/validate-deployment.sh
   
   # Check resource utilization
   gcloud run services describe YOUR_SERVICE_NAME --region=us-central1
   ```

## 📈 Performance Optimization

### Build Optimization
- Multi-stage Docker builds
- Layer caching strategies
- Dependency optimization
- Static asset optimization

### Runtime Optimization
- Next.js standalone output
- Image optimization
- Compression enabled
- CDN integration (if needed)

### Monitoring Optimization
- Structured logging
- Metrics collection
- Performance profiling
- Resource utilization tracking

## 🔄 Rollback Procedures

### Automatic Rollback
The pipeline includes automatic rollback on deployment failures:
- Health check failures trigger rollback
- Performance degradation triggers rollback
- Error rate spikes trigger rollback

### Manual Rollback
```bash
# List recent revisions
gcloud run revisions list --service=YOUR_SERVICE_NAME --region=us-central1

# Rollback to specific revision
gcloud run services update-traffic YOUR_SERVICE_NAME \
  --to-revisions=REVISION_NAME=100 \
  --region=us-central1
```

## 📚 Additional Resources

- [Google Cloud Run Documentation](https://cloud.google.com/run/docs)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)

## 🆘 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review GitHub Actions logs
3. Check Google Cloud Console logs
4. Create an issue in the repository

---

**Last Updated**: $(date)  
**Version**: 1.0.0  
**Maintainer**: Bruno Marcuche

# 🔍 CI/CD Pipeline Monitoring Guide

## 📊 Current Test Status

**Test Initiated**: $(date)  
**Repository**: bmarcuche/resume-cloudrun  
**Domain**: https://resume.mindtunnel.org  
**Current Status**: Pipeline testing in progress

## 🔗 Monitoring URLs

### GitHub Actions (Primary Monitoring)
**Main Actions Page**: https://github.com/bmarcuche/resume-cloudrun/actions

**Latest Workflow Run**: Look for "🧪 Test production CI/CD pipeline" workflow

### Google Cloud Console
**Cloud Run Service**: https://console.cloud.google.com/run/detail/us-central1/mindtunnel-resume/metrics?project=secret-proton-465722-q0

**Container Registry**: https://console.cloud.google.com/gcr/images/secret-proton-465722-q0?project=secret-proton-465722-q0

## 🧪 Test Validation Commands

### 1. Check Site Availability
```bash
curl -I https://resume.mindtunnel.org
```

### 2. Test Health Endpoint (Available after deployment)
```bash
curl https://resume.mindtunnel.org/api/health
```

### 3. Test Readiness Endpoint (Available after deployment)
```bash
curl https://resume.mindtunnel.org/api/ready
```

### 4. Check Security Headers
```bash
curl -I https://resume.mindtunnel.org | grep -E "(X-Frame-Options|X-Content-Type-Options|Strict-Transport-Security)"
```

### 5. Performance Test
```bash
curl -o /dev/null -s -w 'Response Time: %{time_total}s\n' https://resume.mindtunnel.org
```

## 📋 Pipeline Stages to Monitor

### Stage 1: Validation (2-3 minutes)
- ✅ Code quality checks
- ✅ TypeScript validation  
- ✅ Linting
- ✅ Build verification

### Stage 2: Security (1-2 minutes)
- ✅ Dependency scanning
- ✅ Vulnerability assessment
- ✅ Snyk security analysis

### Stage 3: Build (2-3 minutes)
- ✅ Docker image creation
- ✅ Multi-stage optimization
- ✅ Registry push

### Stage 4: Deploy (1-2 minutes)
- ✅ Cloud Run deployment
- ✅ Zero-downtime update
- ✅ Domain mapping verification

### Stage 5: Monitor (1 minute)
- ✅ Health checks
- ✅ Performance validation
- ✅ Service verification

### Stage 6: Rollback (If needed)
- ✅ Automatic failure detection
- ✅ Previous version restoration

## 🎯 Expected Results After Deployment

### New Endpoints Available
- **Health Check**: https://resume.mindtunnel.org/api/health
- **Readiness Check**: https://resume.mindtunnel.org/api/ready

### Security Headers Implemented
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Strict-Transport-Security: max-age=31536000; includeSubDomains`
- `X-XSS-Protection: 1; mode=block`

### Performance Improvements
- Response time < 2 seconds
- Optimized Docker images
- Enhanced caching

## 🚨 Troubleshooting

### If Pipeline Doesn't Start
1. **Check GitHub Secret**: Ensure `GCP_SA_KEY` is added correctly
2. **Verify Permissions**: Service account has required roles
3. **Check Workflow File**: `.github/workflows/deploy.yml` exists

### If Pipeline Fails
1. **Check GitHub Actions Logs**: Click on failed workflow run
2. **Review Error Messages**: Look for specific failure reasons
3. **Check Google Cloud Logs**: Cloud Run service logs

### If Health Endpoints Don't Work
1. **Verify Deployment**: Check if new revision is deployed
2. **Check Route Configuration**: Ensure API routes are correct
3. **Review Build Logs**: Verify application built successfully

## 📞 Support Commands

### Check Current Cloud Run Revision
```bash
gcloud run services describe mindtunnel-resume --region=us-central1 --format="value(status.latestReadyRevisionName)"
```

### View Recent Deployments
```bash
gcloud run revisions list --service=mindtunnel-resume --region=us-central1 --limit=5
```

### Check Service Logs
```bash
gcloud logs read --service=mindtunnel-resume --region=us-central1 --limit=50
```

## 🎉 Success Indicators

### ✅ Pipeline Completed Successfully
- All GitHub Actions stages show green checkmarks
- New Cloud Run revision deployed
- Health endpoints respond with 200 status
- Security headers are present
- Performance meets targets (< 2s response time)

### ✅ Monitoring Active
- Health endpoint returns service status
- Readiness endpoint confirms service ready
- Performance metrics within targets
- Security headers implemented

---

**Last Updated**: $(date)  
**Status**: Testing in progress  
**Next Check**: Monitor GitHub Actions for completion

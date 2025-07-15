# Resume CloudRun

[![Deploy to Google Cloud Run](https://github.com/bmarcuche/resume-cloudrun/actions/workflows/deploy.yml/badge.svg)](https://github.com/bmarcuche/resume-cloudrun/actions/workflows/deploy.yml)
[![Security Scan](https://img.shields.io/badge/security-scanned-green.svg)](https://github.com/bmarcuche/resume-cloudrun/security)
[![Uptime](https://img.shields.io/badge/uptime-99.9%25-brightgreen.svg)](https://resume.mindtunnel.org)

Professional resume application deployed on Google Cloud Run with enterprise-grade CI/CD pipeline.

🌐 **Live Site**: [resume.mindtunnel.org](https://resume.mindtunnel.org)

## Overview

A production-ready Next.js resume application featuring automated CI/CD, zero-downtime deployments, comprehensive security scanning, and performance monitoring.

## Features

- **Next.js 14** with TypeScript and Tailwind CSS
- **Automated CI/CD** with GitHub Actions
- **Zero-downtime deployments** to Google Cloud Run
- **Security scanning** and vulnerability monitoring
- **Custom domain** with managed SSL certificates
- **Health monitoring** and automated rollback
- **Performance optimization** and caching

## Architecture

```
GitHub → GitHub Actions → Google Cloud Run → Custom Domain
   ↓           ↓              ↓               ↓
Source      Build/Test    Container       SSL/HTTPS
Code        Security      Deployment      Monitoring
```

## Quick Start

### Prerequisites

- Google Cloud Platform account
- GitHub repository with Actions enabled
- Node.js 18+ for local development

### Local Development

```bash
# Clone and install
git clone https://github.com/bmarcuche/resume-cloudrun.git
cd resume-cloudrun
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Deployment Setup

1. **Create Google Cloud service account**:
```bash
gcloud iam service-accounts create resume-cicd
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="serviceAccount:resume-cicd@PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/run.admin"
```

2. **Add GitHub Secret**:
   - Generate service account key
   - Add as `GCP_SA_KEY` secret in GitHub repository settings

3. **Deploy**:
   - Push to `main` branch triggers automatic deployment
   - Monitor progress in GitHub Actions tab

## Health Endpoints

- **Health Check**: `/api/health` - Service status and dependencies
- **Readiness Check**: `/api/ready` - Service readiness for traffic

## Technology Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Infrastructure**: Google Cloud Run, Container Registry
- **CI/CD**: GitHub Actions
- **Security**: Snyk scanning, ESLint, security headers
- **Monitoring**: Health checks, performance metrics

## Security

- HTTPS enforcement with managed SSL certificates
- Comprehensive security headers (HSTS, CSP, X-Frame-Options)
- Container security with non-root execution
- Automated vulnerability scanning
- IAM-based access control

## Performance

- Response time target: < 2 seconds
- 99.9% uptime SLA
- Optimized Docker images with multi-stage builds
- Next.js standalone output for minimal footprint
- Image optimization (WebP/AVIF) and compression

## Monitoring

Access monitoring in Google Cloud Console:
- Cloud Run service metrics
- Container logs and performance
- Health check status
- Error rates and latency

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Ensure tests pass
5. Submit a pull request

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Support

- **Issues**: [GitHub Issues](https://github.com/bmarcuche/resume-cloudrun/issues)
- **Email**: bruno.marcuche@gmail.com

---

**Built with ❤️ by Bruno Marcuche**

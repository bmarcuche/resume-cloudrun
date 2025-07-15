# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-07-15

### Added
- Initial release of Bruno Marcuche's resume on CloudRun
- Next.js 14 application with TypeScript support
- Responsive design using Tailwind CSS 3.3.0
- PDF resume viewer with react-pdf integration
- Heroicons for consistent iconography
- Docker containerization with multi-stage build
- Google Cloud Run deployment configuration
- Custom domain mapping for resume.mindtunnel.org
- Automated deployment script (deploy-resume.sh)
- Google Cloud DNS integration
- SSL certificate auto-provisioning
- Production-ready Dockerfile with security best practices
- Comprehensive README with setup and deployment instructions
- Professional project structure following Next.js 14 app directory pattern

### Technical Details
- **Framework**: Next.js 14.0.0 with App Router
- **Language**: TypeScript 5.2.2
- **Styling**: Tailwind CSS 3.3.0
- **Icons**: Heroicons 2.0.18
- **PDF Handling**: react-pdf 7.5.1
- **Container**: Docker with Node.js 18 Alpine base
- **Deployment**: Google Cloud Run
- **Domain**: Custom domain with Google Cloud DNS
- **SSL**: Automatic certificate provisioning

### Infrastructure
- Google Cloud Run service: `mindtunnel-resume`
- Container Registry: `gcr.io/secret-proton-465722-q0/mindtunnel-resume`
- Region: us-central1
- Memory: 512Mi
- CPU: 1 vCPU
- Max instances: 10
- Port: 3000

### Security
- Non-root container user (nextjs:nodejs)
- Minimal Alpine Linux base image
- HTTPS-only with automatic SSL certificates
- TypeScript for type safety
- Input validation and sanitization

### Performance
- Static generation with Next.js
- Optimized Docker multi-stage build
- CDN distribution via Google Cloud
- Lighthouse score: 95+ across all metrics
- Core Web Vitals optimized

### Domain Configuration
- Primary domain: https://resume.mindtunnel.org
- DNS: Google Cloud DNS managed zone
- CNAME record: resume -> ghs.googlehosted.com
- TXT record: Google domain verification
- TTL: 300 seconds

### Deployment
- Automated deployment via deploy-resume.sh script
- Docker image build and push to GCR
- Cloud Run service deployment
- Domain mapping configuration
- Health check validation

## [Unreleased]

### Planned
- Comprehensive testing suite (unit, integration, e2e)
- Performance monitoring and alerting
- Analytics integration
- Contact form functionality
- Blog section
- Project portfolio gallery
- CI/CD pipeline with GitHub Actions
- Automated security scanning
- Performance budgets and monitoring
- A/B testing capabilities

---

## Release Notes

### Version 1.0.0 - Initial Production Release

This marks the first production-ready release of Bruno Marcuche's resume on CloudRun. The application is fully containerized, deployed on Google Cloud Run, and accessible via a custom domain with SSL encryption.

**Key Achievements:**
- ✅ Production deployment completed
- ✅ Custom domain configured and verified
- ✅ SSL certificate provisioned
- ✅ Performance optimized (95+ Lighthouse score)
- ✅ Security hardened container
- ✅ Comprehensive documentation

**Live URLs:**
- Production: https://resume.mindtunnel.org
- Cloud Run: https://mindtunnel-resume-peee2jf2ua-uc.a.run.app

**Next Steps:**
- Implement monitoring and alerting
- Add comprehensive test coverage
- Set up CI/CD pipeline
- Enhance with additional features

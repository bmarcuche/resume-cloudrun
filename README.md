# Bruno Marcuche - Professional Resume Website

A modern, responsive resume website built with Next.js and deployed on Google Cloud Run.

## 🌐 Live Site

- **Production**: [https://resume.mindtunnel.org](https://resume.mindtunnel.org)
- **Cloud Run**: [https://mindtunnel-resume-peee2jf2ua-uc.a.run.app](https://mindtunnel-resume-peee2jf2ua-uc.a.run.app)

## 🚀 Project Overview

This is a production-ready, containerized resume website showcasing professional experience, skills, and projects. Built with modern web technologies and deployed using Google Cloud Platform services.

### Key Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Performance Optimized**: Next.js with static generation
- **Containerized**: Docker-ready for consistent deployments
- **Cloud Native**: Deployed on Google Cloud Run with custom domain
- **SEO Optimized**: Meta tags and structured data
- **Accessibility**: WCAG compliant design

## 🛠 Technology Stack

- **Framework**: Next.js 14.0.0
- **Language**: TypeScript 5.2.2
- **Styling**: Tailwind CSS 3.3.0
- **Icons**: Heroicons 2.0.18
- **PDF Generation**: React-PDF 7.5.1
- **Container**: Docker with Alpine Linux
- **Deployment**: Google Cloud Run
- **DNS**: Google Cloud DNS

## 📋 Prerequisites

- Node.js 18+ 
- Docker
- Google Cloud SDK (for deployment)
- Git

## 🔧 Local Development

### Installation

```bash
# Clone the repository
git clone git@github.com:bmarcuche/resume-website.git
cd resume-website

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🐳 Docker Development

```bash
# Build Docker image
docker build -t resume-website .

# Run container
docker run -p 3000:3000 resume-website
```

## 🚀 Deployment

### Automated Deployment

Use the provided deployment script:

```bash
# Deploy to Cloud Run with custom domain
./deploy-resume.sh
```

### Manual Deployment

```bash
# Build and push Docker image
docker build -t gcr.io/secret-proton-465722-q0/mindtunnel-resume .
docker push gcr.io/secret-proton-465722-q0/mindtunnel-resume

# Deploy to Cloud Run
gcloud run deploy mindtunnel-resume \
  --image=gcr.io/secret-proton-465722-q0/mindtunnel-resume \
  --platform=managed \
  --region=us-central1 \
  --allow-unauthenticated \
  --port=3000 \
  --memory=512Mi \
  --cpu=1 \
  --max-instances=10
```

## 🏗 Architecture

### Project Structure

```
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
├── public/               # Static assets
├── Dockerfile           # Container configuration
├── deploy-resume.sh     # Deployment script
├── next.config.js       # Next.js configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── tsconfig.json        # TypeScript configuration
```

### Design Decisions

- **Next.js App Router**: Modern routing with server components
- **Tailwind CSS**: Utility-first CSS for rapid development
- **Docker Multi-stage**: Optimized container size and security
- **Cloud Run**: Serverless container platform for scalability
- **Custom Domain**: Professional branding with SSL

## 🔒 Security

- **Container Security**: Non-root user, minimal base image
- **HTTPS**: Automatic SSL certificate provisioning
- **Input Validation**: TypeScript type safety
- **Dependencies**: Regular security audits with `npm audit`

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for user experience
- **Bundle Size**: Minimized with Next.js optimization
- **CDN**: Global content delivery via Google Cloud

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Run linting
npm run lint
```

## 📈 Monitoring

- **Cloud Run Metrics**: Request latency, error rates
- **DNS Monitoring**: Domain resolution health
- **SSL Certificate**: Automatic renewal tracking

## 🔄 CI/CD Pipeline

The deployment process includes:

1. **Build Verification**: Docker image creation
2. **Container Registry**: Image storage in GCR
3. **Cloud Run Deployment**: Automated service updates
4. **Domain Mapping**: Custom domain configuration
5. **Health Checks**: Service availability validation

## 🌍 DNS Configuration

Current DNS records for `resume.mindtunnel.org`:

```
Type: CNAME
Name: resume
Value: ghs.googlehosted.com
TTL: 300
```

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment | `production` |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is private and proprietary.

## 🆘 Troubleshooting

### Common Issues

**Build Failures**
- Ensure Node.js 18+ is installed
- Clear `node_modules` and reinstall dependencies

**Docker Issues**
- Verify Docker daemon is running
- Check available disk space

**Deployment Problems**
- Verify Google Cloud authentication
- Check project permissions
- Validate DNS configuration

### Support

For issues or questions, please create an issue in this repository.

## 📊 Project Status

- ✅ **Development**: Complete
- ✅ **Containerization**: Complete  
- ✅ **Cloud Deployment**: Complete
- ✅ **Custom Domain**: Complete
- ✅ **SSL Certificate**: Complete
- 🔄 **Monitoring**: In Progress
- 📋 **Testing Suite**: Planned

## 🗺 Roadmap

- [ ] Implement comprehensive testing suite
- [ ] Add performance monitoring
- [ ] Integrate analytics
- [ ] Add contact form functionality
- [ ] Implement blog section
- [ ] Add project portfolio gallery

---

**Last Updated**: July 2025  
**Version**: 1.0.0  
**Maintainer**: Bruno Marcuche (bruno@theneoft.io)

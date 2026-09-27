# Scripts Directory

This directory contains automation scripts organized by purpose.

## Directory Structure

- `deployment/` - Deployment and infrastructure scripts
- `setup/` - Initial setup and configuration scripts  
- `monitoring/` - Monitoring and validation scripts
- `validate-deployment.sh` - Main deployment validation script

## Usage

All scripts are executable and should be run from the project root directory.

### Deployment Scripts
- `deployment/deploy.sh` - Main deployment script
- `deployment/deploy-resume.sh` - Resume-specific deployment
- `deployment/complete-domain-mapping.sh` - Domain configuration

### Setup Scripts  
- `setup/setup.sh` - Initial project setup
- `setup/setup-github.sh` - GitHub configuration

### Monitoring Scripts
- `monitoring/test-pipeline.sh` - CI/CD pipeline testing
- `monitoring/cloud-run-monitoring.yaml` - Monitoring configuration
- `validate-deployment.sh` - Deployment health checks

## regenerate-pdf.sh

Rebuilds `public/resume/bruno_marcuche_resume.pdf` from the site's print stylesheet.
Requires a production build (`npm run build`), no dev server, headless Chromium
(Playwright's `chromium_headless_shell` is auto-detected, or set `CHROME`), and
poppler (`pdfinfo`, `pdftotext`). The script fails if a banned disclosure string
appears in the output.

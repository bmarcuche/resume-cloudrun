#!/bin/bash

# GitHub Repository Setup Script
# This script helps set up the GitHub repository for the resume website

set -e

REPO_NAME="resume-website"
GITHUB_USERNAME="bmarcuche"
REPO_URL="git@github.com:${GITHUB_USERNAME}/${REPO_NAME}.git"

echo "🚀 Setting up GitHub repository for resume website..."

echo "📋 Manual steps required:"
echo "1. Go to https://github.com/new"
echo "2. Repository name: ${REPO_NAME}"
echo "3. Description: Professional resume website built with Next.js and deployed on Google Cloud Run"
echo "4. Set to Public (or Private if preferred)"
echo "5. DO NOT initialize with README, .gitignore, or license (we already have these)"
echo "6. Click 'Create repository'"
echo ""

read -p "Press Enter after creating the repository on GitHub..."

echo "🔗 Adding remote origin..."
git remote -v | grep origin && git remote remove origin
git remote add origin $REPO_URL

echo "📤 Pushing code to GitHub..."
git push -u origin main

echo "✅ Repository setup complete!"
echo "🌐 Your repository is now available at: https://github.com/${GITHUB_USERNAME}/${REPO_NAME}"
echo ""
echo "📊 Repository features:"
echo "- ✅ Production-ready Next.js application"
echo "- ✅ Docker containerization"
echo "- ✅ Google Cloud Run deployment"
echo "- ✅ Custom domain configuration"
echo "- ✅ Comprehensive documentation"
echo "- ✅ Version control with semantic commits"
echo ""
echo "🔄 Next steps:"
echo "1. Set up GitHub Actions for CI/CD (optional)"
echo "2. Configure branch protection rules"
echo "3. Add collaborators if needed"
echo "4. Set up issue templates"

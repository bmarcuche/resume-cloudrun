# Create GitHub Repository

## Quick Steps:

1. **Go to GitHub**: https://github.com/new

2. **Repository Settings**:
   - Repository name: `resume-website`
   - Description: `Professional resume website built with Next.js and deployed on Google Cloud Run`
   - Public or Private (your choice)
   - **DO NOT** check "Add a README file" (we already have one)
   - **DO NOT** check "Add .gitignore" (we already have one)
   - **DO NOT** choose a license (can add later if needed)

3. **Click "Create repository"**

4. **Push your code** (run this after creating the repo):
   ```bash
   git push -u origin main
   ```

That's it! Your repository will be live at: https://github.com/bmarcuche/resume-website

## Alternative: Command Line Creation

If you want to use command line, you can install GitHub CLI:
```bash
# Install gh CLI (if not already installed)
sudo apt update && sudo apt install gh

# Authenticate
gh auth login

# Create repository
gh repo create resume-website --public --description "Professional resume website built with Next.js and deployed on Google Cloud Run"

# Push code
git push -u origin main
```

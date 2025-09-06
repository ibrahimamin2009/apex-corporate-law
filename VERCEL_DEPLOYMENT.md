# Vercel Deployment Guide for Apex Corporate Law

## 🚀 Quick Deployment Steps

### 1. Install Vercel CLI
```bash
npm install -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Deploy from your project directory
```bash
cd "/Users/user/Desktop/Apex Corporate Law"
vercel
```

### 4. Follow the prompts:
- **Set up and deploy?** → Yes
- **Which scope?** → Your account
- **Link to existing project?** → No
- **What's your project's name?** → apex-corporate-law
- **In which directory is your code located?** → ./

## 🔧 Environment Variables Setup

After deployment, set up your environment variables in Vercel dashboard:

1. Go to your project dashboard on Vercel
2. Click on **Settings** → **Environment Variables**
3. Add these variables:

```
EMAIL_USER = ibrahimamin9621@gmail.com
EMAIL_PASS = your_app_password_here
```

## 📁 Files Added for Vercel

- `vercel.json` - Vercel configuration
- `wsgi.py` - WSGI entry point
- `VERCEL_DEPLOYMENT.md` - This guide

## 🌐 Your Live Website

After deployment, you'll get a URL like:
`https://apex-corporate-law-xxx.vercel.app`

## 🔄 Updating Your Site

To update your deployed site:
```bash
vercel --prod
```

## 📋 Requirements

Make sure your `requirements.txt` includes:
- Flask
- email-validator

## ⚠️ Important Notes

1. **Email Setup**: Configure your Gmail App Password as described in `EMAIL_SETUP.md`
2. **Environment Variables**: Set them in Vercel dashboard, not in code
3. **Static Files**: Vercel automatically serves static files from the `static/` folder
4. **Custom Domain**: You can add a custom domain in Vercel settings

## 🆘 Troubleshooting

- If deployment fails, check the Vercel logs
- Ensure all dependencies are in `requirements.txt`
- Verify environment variables are set correctly
- Check that `wsgi.py` is properly configured

# Firebase Hosting Deployment Guide

This document outlines the steps required to deploy the Bharat OneStop AI React frontend to Firebase Hosting.

## Prerequisites
- Node.js installed
- Firebase CLI installed globally (`npm install -g firebase-tools`)
- Google account authenticated in Firebase CLI

## Deployment Steps

### 1. Authenticate with Firebase
Log in to your Google Account.
```bash
firebase login
```

### 2. Build the Production Bundle
Compile the React application using Vite.
```bash
cd frontend
npm run build
```
*Note: This will output the optimized build into the `dist/` directory.*

### 3. Initialize Firebase Hosting
Run this command from inside the `frontend/` directory.
```bash
firebase init hosting
```

**During initialization, select the following options:**
- **What do you want to use as your public directory?** Type `dist`
- **Configure as a single-page app (rewrite all urls to /index.html)?** Type `Yes` (Crucial for React Router)
- **Set up automatic builds and deploys with GitHub?** Type `No`
- **File dist/index.html already exists. Overwrite?** Type `No`

### 4. Deploy to Production
Execute the deploy command.
```bash
firebase deploy --only hosting
```

You will receive a "Hosting URL" in your terminal where the application is live!

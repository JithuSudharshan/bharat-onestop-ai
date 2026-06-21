# Google Cloud Run Deployment Guide

This guide outlines the production deployment strategy for the Bharat OneStop Node.js API.

## Prerequisites
- Google Cloud SDK (`gcloud`) installed locally.
- A Google Cloud Platform (GCP) project with billing enabled.

## Complete Deployment Steps

### 1. Authenticate
Authenticate your `gcloud` CLI tool with your Google account:
```bash
gcloud auth login
```

### 2. Set Project
Set the active project (replace `PROJECT_ID` with your actual Google Cloud Project ID):
```bash
gcloud config set project PROJECT_ID
```

### 3. Enable Required Google Cloud APIs
Run the following commands to enable necessary services in your project:
```bash
gcloud services enable run.googleapis.com
gcloud services enable cloudbuild.googleapis.com
gcloud services enable artifactregistry.googleapis.com
gcloud services enable secretmanager.googleapis.com
gcloud services enable aiplatform.googleapis.com
gcloud services enable storage.googleapis.com
```

### 4. Deploy Application
Run the deployment command from the `backend/` directory where the `Dockerfile` is located. This uses Cloud Build to containerize the app and deploys it to Cloud Run.

```bash
cd backend
gcloud run deploy bharat-backend \
  --source . \
  --region asia-south1 \
  --platform managed \
  --allow-unauthenticated \
  --port 8080
```

### 5. Configure Environment Variables
After the initial deployment, securely bind your production variables using Secret Manager and Cloud Run environment variables.

To set standard variables:
```bash
gcloud run services update bharat-backend \
  --region asia-south1 \
  --set-env-vars="NODE_ENV=production,CLIENT_ORIGIN=https://your-firebase-app.web.app,GCS_BUCKET_NAME=your-bucket-name"
```

To bind secrets (MONGODB_URI, JWT_SECRET, GEMINI_API_KEY):
Navigate to **Cloud Console > Secret Manager**, create your secrets, and bind them to the Cloud Run service via the **Edit & Deploy New Revision > Variables & Secrets** tab.

Your backend is now live and scalable!

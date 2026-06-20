# Google Cloud Deployment Guide

This guide explains how to deploy the Bharat OneStop AI Citizen Copilot backend to Google Cloud Run, utilizing Cloud Storage for documents, Firestore (if applicable) for sync, and Vertex AI/Gemini for intelligence.

## 1. Prerequisites
- Google Cloud CLI (`gcloud`) installed and authenticated.
- Docker installed locally.
- A Google Cloud Project with billing enabled.

## 2. Enable Required Google Cloud APIs
Run the following commands to enable the necessary APIs for the project:
```bash
gcloud services enable run.googleapis.com \
    cloudbuild.googleapis.com \
    secretmanager.googleapis.com \
    storage.googleapis.com \
    firestore.googleapis.com \
    aiplatform.googleapis.com
```

## 3. Configure Google Cloud Storage (GCS)
The `DocumentAgent` needs a place to securely store uploaded citizen documents before AI processing.
```bash
# Create a secure bucket
gsutil mb -l asia-south1 gs://bharat-onestop-documents

# Configure CORS if the frontend uploads directly (optional, backend uploads recommended)
gsutil cors set cors.json gs://bharat-onestop-documents
```

## 4. Setup Secret Manager
Create secrets for your sensitive keys:
```bash
echo -n "mongodb+srv://..." | gcloud secrets create mongodb-uri --data-file=-
echo -n "AIzaSy..." | gcloud secrets create gemini-api-key --data-file=-
echo -n "your_jwt_secret" | gcloud secrets create jwt-secret --data-file=-
```

Grant the default compute service account access to read these secrets:
```bash
PROJECT_NUMBER=$(gcloud projects describe YOUR_PROJECT_ID --format="value(projectNumber)")
gcloud secrets add-iam-policy-binding mongodb-uri \
    --member="serviceAccount:${PROJECT_NUMBER}-compute@developer.gserviceaccount.com" \
    --role="roles/secretmanager.secretAccessor"
# Repeat for other secrets...
```

## 5. Build and Deploy
You can deploy directly using Cloud Build and Cloud Run.

From the `backend/` directory:
```bash
# Submit the build to Google Container Registry or Artifact Registry
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/bharat-onestop-backend

# Deploy to Cloud Run using the provided yaml
gcloud run services replace ../deployment/cloudrun.yaml
```

## 6. Production Logging & Error Monitoring
- Cloud Run automatically integrates with **Cloud Logging**.
- Standard `console.log()` and `console.error()` outputs are automatically captured and categorized by severity in the GCP Logs Explorer.
- Ensure your Express `errorHandler.js` logs the full `error.stack` only when `NODE_ENV !== 'production'`. In production, it should log the error internally to GCP but return a sanitized message to the client.

## 7. Next Steps (Vertex AI Migration)
For enterprise-grade SLAs, consider migrating from the public Gemini API key to Google Cloud **Vertex AI**. You can use the `@google/generative-ai` SDK's Vertex wrapper and authenticate automatically via the Cloud Run Service Account without managing API keys.

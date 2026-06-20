# Production Environment Configuration

For the Google Cloud production environment, you must set the following environment variables. Do NOT hardcode these in your source code. Use **Google Cloud Secret Manager** to inject sensitive keys into Cloud Run.

## Application Settings
- `NODE_ENV`: Must be set to `production` to enable production logging, disable stack traces, and optimize Express.
- `PORT`: Set to `8080` (Cloud Run default).

## Google Cloud Specific
- `GCP_PROJECT_ID`: Your Google Cloud Project ID.
- `GCP_STORAGE_BUCKET`: The name of the GCS bucket used for storing citizen documents (e.g., `bharat-onestop-documents-prod`).
- `GOOGLE_APPLICATION_CREDENTIALS`: Path to the service account JSON file (required if testing locally against GCP resources). Cloud Run uses its attached Service Account automatically.

## AI Configuration (Vertex AI / Gemini API)
- `GEMINI_MODEL`: `gemini-2.5-flash` (or your Vertex AI endpoint if migrating fully to Vertex API).
- `GEMINI_API_KEY`: The API key (Secret Manager).

## Database & Authentication
- `MONGODB_URI`: Production MongoDB Atlas connection string (Secret Manager).
- `FIREBASE_PROJECT_ID`: Used for Firestore synchronization or Firebase Auth if applicable.
- `JWT_SECRET`: High-entropy secret for signing JWTs (Secret Manager).

## Example Local `.env.production` for Testing
```env
NODE_ENV=production
PORT=8080
GCP_PROJECT_ID=my-gcp-project-123
GCP_STORAGE_BUCKET=my-gcp-project-123-docs
MONGODB_URI=mongodb+srv://admin:pass@cluster.mongodb.net/bharat
GEMINI_API_KEY=AIzaSy...
JWT_SECRET=super_secure_random_string_here
```

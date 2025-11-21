# Supabase Storage Setup

The `reports` storage bucket needs to be created manually in the Supabase dashboard.

## Steps:

1. Go to your Supabase project dashboard
2. Navigate to Storage
3. Click "New bucket"
4. Name: `reports`
5. Public bucket: **No** (unchecked)
6. File size limit: 10MB (or as needed)
7. Allowed MIME types: `application/pdf`, `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`, `application/vnd.ms-excel`

## Storage Policies:

After creating the bucket, set up RLS policies:

1. **Policy for INSERT (upload):**
   - Policy name: "Users can upload their own files"
   - Allowed operation: INSERT
   - Target roles: authenticated
   - USING expression: `bucket_id = 'reports' AND (storage.foldername(name))[1] = auth.uid()::text`

2. **Policy for SELECT (download):**
   - Policy name: "Users can download their own files"
   - Allowed operation: SELECT
   - Target roles: authenticated
   - USING expression: `bucket_id = 'reports' AND (storage.foldername(name))[1] = auth.uid()::text`

These policies ensure users can only upload and download files in their own folder structure: `reports/{userId}/{reportId}/{filename}`



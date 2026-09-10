import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import path from "path";

/**
 * ============================================================================
 * 🎓 LESSON 1: WHAT IS THE AWS S3 CLIENT (`S3Client`)?
 * ============================================================================
 * The `S3Client` object acts as the official bridge / connector between your Node.js
 * Express server and Amazon's S3 Cloud Data Center.
 * 
 * It reads 3 vital configuration parameters from your environment (`.env`):
 * 1. `region`: The physical geographic location of Amazon's datacenter (e.g. 'eu-north-1' for Stockholm).
 * 2. `accessKeyId`: Your unique AWS account username ID.
 * 3. `secretAccessKey`: Your private password key used to sign & authorize API requests.
 */
let s3Client = null;

// Only initialize AWS S3 if credentials are provided in `.env`
if (
  process.env.AWS_ACCESS_KEY_ID &&
  process.env.AWS_ACCESS_KEY_ID !== "your_access_key_id_here" &&
  process.env.AWS_SECRET_ACCESS_KEY &&
  process.env.AWS_SECRET_ACCESS_KEY !== "your_secret_access_key_here"
) {
  s3Client = new S3Client({
    region: process.env.AWS_REGION || "eu-north-1",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });
  console.log("☁️ AWS S3 Client Initialized successfully for bucket:", process.env.AWS_S3_BUCKET_NAME);
} else {
  console.log("ℹ️ AWS S3 credentials not set in .env — Server will fall back to local disk storage.");
}

/**
 * ============================================================================
 * 🎓 LESSON 2: HOW DOES FILE UPLOADING TO AWS WORK?
 * ============================================================================
 * To upload a file (image, video, document) to AWS S3:
 * 1. We construct a `PutObjectCommand` containing the upload instructions:
 *    - `Bucket`: Target bucket name on AWS (e.g. 'portfolio-pharsh9').
 *    - `Key`: Destination file path inside the cloud (e.g. 'projects/17415283_photo.png').
 *    - `Body`: Binary file data buffer read from memory/disk.
 *    - `ContentType`: File MIME type (e.g. 'image/png' or 'image/jpeg').
 * 2. We send the command to AWS via `s3Client.send(command)`.
 * 3. Once Amazon acknowledges receipt, we construct the public HTTPS URL:
 *    https://<bucket-name>.s3.<region>.amazonaws.com/<key>
 * ============================================================================
 */

/**
 * Uploads a file to AWS S3 Cloud Storage (or falls back to local disk if AWS keys are not set).
 * 
 * @param {Object} fileObject - Express Multer file object (containing buffer or path)
 * @param {String} folderPrefix - Subfolder inside the bucket (e.g. 'projects' or 'company')
 * @returns {Promise<String>} Public HTTPS URL of the uploaded image
 */
export async function uploadImageToCloud(fileObject, folderPrefix = "projects") {
  if (!fileObject) {
    throw new Error("No file object provided for upload.");
  }

  // Generate a clean, unique file name to prevent accidental file overwriting
  const cleanFileName = fileObject.originalname
    ? fileObject.originalname.replace(/[^a-zA-Z0-9.-]/g, "_")
    : "file.png";
  const uniqueKey = `${folderPrefix}/${Date.now()}_${cleanFileName}`;

  // ==========================================================================
  // 🎓 LESSON 3: AWS CLOUD UPLOAD vs LOCAL FALLBACK
  // ==========================================================================
  if (s3Client) {
    try {
      // Read binary data buffer from file object
      const fileBuffer = fileObject.buffer || fs.readFileSync(fileObject.path);

      // Create the AWS S3 upload command payload
      const command = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME || "portfolio-pharsh9",
        Key: uniqueKey,
        Body: fileBuffer,
        ContentType: fileObject.mimetype || "image/png",
      });

      // Transmit the command package to AWS S3 Servers
      await s3Client.send(command);

      // Construct and return the public HTTPS S3 Cloud URL
      const cloudUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uniqueKey}`;
      console.log("✅ AWS S3 Upload Success! Cloud URL:", cloudUrl);

      // Clean up temporary local file if it exists
      if (fileObject.path && fs.existsSync(fileObject.path)) {
        fs.unlinkSync(fileObject.path);
      }

      return cloudUrl;
    } catch (error) {
      console.error("❌ AWS S3 Upload Error:", error.message);
      console.log("⚠️ Falling back to local disk storage URL...");
    }
  }

  // Fallback to local server storage if S3 client is unavailable or failed
  if (fileObject.filename) {
    return `/uploads/${folderPrefix}/${fileObject.filename}`;
  }
  return `/uploads/projects/${cleanFileName}`;
}

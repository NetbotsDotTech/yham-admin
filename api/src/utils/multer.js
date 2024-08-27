import { S3Client } from '@aws-sdk/client-s3';
import multer from 'multer';
import multerS3 from 'multer-s3';

import dotenv from 'dotenv';


dotenv.config();

// Initialize AWS S3 client
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

console.log('S3 Bucket Name in Multer Files:',  process.env.S3_BUCKET_NAME);

// Helper function to format file names with artifact name and timestamp
const generateFileName = (prefix, artifactName, originalName) => {
  const timestamp = Date.now();
  const formattedName = `${artifactName.replace(/\s+/g, '_').toLowerCase()}_${timestamp}-${originalName}`;
  return `${prefix}/${formattedName}`;
};

// Multer configuration
const multerConfig = {
  images: multerS3({
    s3,
    bucket:  process.env.S3_BUCKET_NAME,
    acl: 'public-read',
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      const artifactName = req.body.name || 'artifact';
      const fileName = generateFileName('images', artifactName, file.originalname);
      cb(null, fileName);
    },
  }),
  audio: multerS3({
    s3,
    bucket:  process.env.S3_BUCKET_NAME,
    acl: 'public-read',
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      const artifactName = req.body.name || 'artifact';
      const fileName = generateFileName('audio', artifactName, file.originalname);
      cb(null, fileName);
    },
  }),
};

// Multer upload middleware
const upload = multer({
  storage: multer.memoryStorage(),
});

export { multerConfig, upload };

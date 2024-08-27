import { S3Client } from '@aws-sdk/client-s3';
import multer from 'multer';
import multerS3 from 'multer-s3';
import dotenv from 'dotenv';

dotenv.config();

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const generateFileName = (prefix, artifactName, originalName) => {
  const timestamp = Date.now();
  const formattedName = `${artifactName.replace(/\s+/g, '_').toLowerCase()}_${timestamp}-${originalName}`;
  return `${prefix}/${formattedName}`;
};


const uploadImages = multer({
  storage: multerS3({
    s3,
    bucket: process.env.S3_BUCKET_NAME,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      const artifactName = req.body.name || 'artifact';
      const fileName = generateFileName('images', artifactName, file.originalname);
      cb(null, fileName);
    },
  }),
}).array('images', 3); 

const uploadAudio = multer({
  storage: multerS3({
    s3,
    bucket: process.env.S3_BUCKET_NAME,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      const artifactName = req.body.name || 'artifact';
      const fileName = generateFileName('audio', artifactName, file.originalname);
      cb(null, fileName);
    },
  }),
}).single('audio'); 

const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.S3_BUCKET_NAME,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      const artifactName = req.body.name || 'artifact';
      const prefix = file.fieldname === 'images' ? 'images' : 'audio';
      const fileName = generateFileName(prefix, artifactName, file.originalname);
      cb(null, fileName);
    },
  }),
}).fields([
  { name: 'audio', maxCount: 1 },

  { name: 'images', maxCount: 3 }
]);


export { uploadImages, uploadAudio , upload};

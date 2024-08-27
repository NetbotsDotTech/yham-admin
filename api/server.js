import express from 'express';
import dotenv from 'dotenv';
import artifactRoutes from './src/routes/artifactRoutes.js';
import { errorHandler } from './src/middlewares/errorHandler.js';
import connectDB  from './db.js';

dotenv.config();

// console.log('Configuration Values:');
// console.log('MongoDB URI:', process.env.MONGO_URI );
// console.log('Port:', process.env.PORT );
// console.log('Node Environment:', process.env.NODE_ENV );
// console.log('AWS Access Key ID:', process.env.AWS_ACCESS_KEY_ID );
// console.log('AWS Secret Access Key:', process.env.AWS_SECRET_ACCESS_KEY );
// console.log('AWS Region:', process.env.AWS_REGION );
// console.log('S3 Bucket Name:', process.env.S3_BUCKET_NAME );

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware for parsing JSON
app.use(express.json());

// Routes
// app.use('/api/artifacts', artifactRoutes);

// Error Handling Middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});




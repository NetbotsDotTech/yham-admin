import express from 'express';
import dotenv from 'dotenv';
import artifactRoutes from './src/routes/artifactRoutes.js';
import { errorHandler } from './src/middlewares/errorHandler.js';
import connectDB  from './db.js';

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;

connectDB();
app.use(express.json());
app.use('/api/artifacts', artifactRoutes);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});




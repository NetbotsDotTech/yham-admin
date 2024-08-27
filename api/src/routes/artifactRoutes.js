import express from 'express';
import {
  createArtifact,
  getArtifacts,
  getArtifactById,
  updateArtifact,
  deleteArtifact
} from '../controllers/artifactController.js';
import { upload } from '../utils/multer.js';

const router = express.Router();

// Multer upload fields configuration
router.post('/' , upload,  createArtifact);
router.get('/', getArtifacts);
router.get('/:id', getArtifactById);
router.put('/:id', updateArtifact);
router.delete('/:id', deleteArtifact);

export default router;

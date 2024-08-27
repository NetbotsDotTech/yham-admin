import express from 'express';
import {
  createArtifact,
  getArtifacts,
  getArtifactById,
  updateArtifact,
  deleteArtifact
} from '../controllers/artifactController.js';
import { multerConfig, upload } from '../utils/multer.js';
import validateArtifact  from "../validators/artifactValidator.js"

const router = express.Router();

// Multer upload fields configuration
const uploadFields = upload.fields([{ name: 'images', maxCount: 3 }, { name: 'audio' }]);

router.post('/', uploadFields, validateArtifact , createArtifact);
router.get('/', getArtifacts);
router.get('/:id', getArtifactById);
router.put('/:id', uploadFields, updateArtifact);
router.delete('/:id', deleteArtifact);

export default router;

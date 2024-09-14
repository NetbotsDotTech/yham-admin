import express from 'express';
import {
  getWeekTimeTable,
  createWeekTimeTable,
  updateWeekTimeTable,
  deleteWeekTimeTable,
} from '../controllers/timeTableController.js';
import { protect, authorizeRoles } from '../middlewares/auth.js'; 
const router = express.Router();

router.route('/')
  .get(getWeekTimeTable) 
  .post(protect, authorizeRoles('admin', 'staff'), createWeekTimeTable)
  .put(protect, authorizeRoles('admin', 'staff'), updateWeekTimeTable) 
  .delete(protect, authorizeRoles('admin', 'staff'), deleteWeekTimeTable); 

export default router;

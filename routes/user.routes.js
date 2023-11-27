import express from "express";
import { createApplicationController, editApplicationByUserController, getAllApplicationsForUserController, getApplicationByIdForUserController } from "../controllers/user/user.controller.js";


const router = express.Router();

// Route for creating an application
router.post('/applications', createApplicationController);

// Route for getting all applications for a user
router.get('/:username/applications', getAllApplicationsForUserController);

// Route for getting one application by ID for a user
router.get('/:username/applications/:id', getApplicationByIdForUserController);

// Route for editing an application by a user
router.put('/:username/applications/:id', editApplicationByUserController);


export default router;
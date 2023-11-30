import express from "express";
import {
    createApplicationController,
    getAllApplicationsController,
    getApplicationsByIdController,
    updateApplicationController
} from "../controllers/user/user.controller.js";


const router = express.Router();

// Route for creating an application
router.post('/applications', createApplicationController);

// Route for getting all applications for a user
router.get('/applications', getAllApplicationsController);

// Route for getting one application by ID
router.get('/applications/:id', getApplicationsByIdController);

// Route for editing an application by a user
router.put('/applications/:applicationId', updateApplicationController);


export default router;
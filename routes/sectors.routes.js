import express from "express";
import { getAllSectorsController } from "../controllers/sectors/sectors.controller.js";


const router = express.Router();

// Get Sectors
router.get('/get-sectors', getAllSectorsController)

// Get Sector by ID


export default router;
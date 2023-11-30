import express from "express";
import { getAllSectorsController, getSectorByIdController } from "../controllers/sectors/sectors.controller.js";


const router = express.Router();

// Get Sectors
router.get('/get-sectors', getAllSectorsController)

// Get Sector by ID
router.get('/get-sector/:sectorId', getSectorByIdController)


export default router;
import express from 'express';
import authRoutes from './auth.routes.js';
import sectorsRoutes from './sectors.routes.js';
import userRoutes from './user.routes.js';


const router = express.Router();

// Guest Routes
router.get('/', (req, res) => {
    return res.status(200).json('My api/v1');
});

// Authentication Routes
router.use('/auth', authRoutes)

// Sectors Routes
router.use('/sectors', sectorsRoutes)

// User Routes
router.use('/user', userRoutes)

export default router;
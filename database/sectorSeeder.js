import mongoose from 'mongoose';
import Sector from '../models/Sectors.model.js';
import { sectorsData } from './sectorsData.js'
import dotenv from 'dotenv';

dotenv.config();

async function seedDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');

        await Sector.create(sectorsData);
        console.log('Data seeded successfully into MongoDB');
    } catch (error) {
        console.error('Error seeding data:', error);
    } finally {
        mongoose.disconnect();
        console.log('MongoDB connection closed');
    }
}

seedDatabase();
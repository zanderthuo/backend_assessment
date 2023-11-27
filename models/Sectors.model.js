import mongoose from 'mongoose';

const SubcategorySchema = new mongoose.Schema({
    name: {
        type: String,
    }
});

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
    },
    subcategories: [SubcategorySchema]
});

const SectorSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    categories: [CategorySchema]
}, { timestamps: true });

export default mongoose.model('Sector', SectorSchema);
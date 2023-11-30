import mongoose from 'mongoose';

const SubSubSubCategorySchema = new mongoose.Schema({
    name: {
        type: String,
    }
});

const SubSubCategorySchema = new mongoose.Schema({
    name: {
        type: String,
    },
    subsubsubcategories: [SubSubSubCategorySchema]
});

const SubcategorySchema = new mongoose.Schema({
    name: {
        type: String,
    },
    subsubcategories: [SubSubCategorySchema]
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
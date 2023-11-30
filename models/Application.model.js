import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    sectors: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Sector',
        },
        name: {
            type: String,
            required: true
        }
    },
    termsOfService: {
        type: Boolean,
        required: true
    },
}, { timestamps: true });

export default mongoose.model('Application', ApplicationSchema);
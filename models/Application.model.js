import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    sectors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sector',
        required: true
    }],
    termsOfService: {
        type: Boolean,
        required: true
    },
    username: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, { timestamps: true });

export default mongoose.model('Application', ApplicationSchema);
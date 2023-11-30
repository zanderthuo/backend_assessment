import mongoose from 'mongoose';
import Application from './Application.model.js'

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String
    },
}, { timestamps: true });


export default mongoose.model('User', UserSchema)
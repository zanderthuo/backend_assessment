import mongoose from 'mongoose';

// Connection to MongoDB
const connectDB = async() => {
    try {
        mongoose.set('strictQuery', false);
        const conn = await mongoose.connect(process.env.MONGODB_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
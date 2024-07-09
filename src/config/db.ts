import mongoose from 'mongoose';
import env from './env';

const connectDatabase = async () => {
    try {
        await mongoose.connect(env.DATABASE_URI);
        console.info('☘️ Database connected successfully.');
    } catch (error) {
        if (error instanceof Error) {
            console.error('MongoDb connection error:', error);
        }

        process.exit(1);
    }
};

export default connectDatabase;

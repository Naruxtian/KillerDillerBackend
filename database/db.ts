import mongoose from 'mongoose';

// 0 = disconnected
// 1 = connected
// 2 = connecting
// 3 = disconnecting
const mongoConnection = {
    isConnected: 0
};

export const connect = async () => {
    if (mongoConnection.isConnected) {
        console.log("Connected to db");
        return;
    }

    await mongoose.connect(process.env.MONGO_URL || '');
    mongoose.set('strictQuery', false);
    mongoConnection.isConnected = 1;
    console.log("Connected to MongoDB: ", process.env.MONGO_URL);
}

export const disconnect = async () => {
    //* For development, uncomment this if
    // if (process.env.NODE_ENV === 'development') {
    //     return;
    // }

    //* For development, comment this if
    if (process.env.NODE_ENV === 'production') {
        return;
    }

    if (mongoConnection.isConnected === 0) {
        return;
    }

    await mongoose.disconnect();
    mongoConnection.isConnected = 0;
    console.log("Disconnected from MongoDB");
}
import mongoose, { Schema, Model, model } from 'mongoose';
import { IEvent } from '../interfaces';

const eventSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Event: Model<IEvent> = mongoose.models.Event || model('Event', eventSchema);

export default Event;
import mongoose, { Schema, Model, model } from 'mongoose';
import { IInformation } from '../interfaces';

const informationSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Information: Model<IInformation> = mongoose.models.Information || model('Information', informationSchema);

export default Information;
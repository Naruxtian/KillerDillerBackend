import mongoose, { Schema, Model, model } from 'mongoose';
import { IColor } from '../interfaces';

const colorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    hex: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Color: Model<IColor> = mongoose.models.Color || model('Color', colorSchema);

export default Color;
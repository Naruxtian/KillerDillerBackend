import mongoose, { Schema, Model, model } from 'mongoose';
import { IBrand } from '../interfaces';

const brandSchema = new Schema({
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Brand: Model<IBrand> = mongoose.models.Brand || model('Brand', brandSchema);

export default Brand;
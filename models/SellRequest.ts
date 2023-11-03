import mongoose, { Schema, Model, model } from 'mongoose';
import { ISellRequest } from '../interfaces';

const sellRequestSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    products: [{
        category: {
            type: String,
            enum: {
                values: ['playeras', 'pantalones', 'gorros', 'zapatos', 'tops', 'vestidos', 'sudaderas', 'chamarras', 'abrigos', 'conjuntos', 'accesorios', 'otro'],
                message: '{VALUE} is not a valid category'
            },
            required: true
        },
        description: {
            type: String,
            required: true
        },
        size: {
            type: String,
            enum: {
                values: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'unitalla'],
                message: '{VALUE} is not a valid size'
            },
            required: false
        },
        images: [{
            type: String,
            required: true,
        }]
    }]
}, {
    timestamps: true
});

const SellRequest: Model<ISellRequest> = mongoose.models.SellRequest || model('SellRequest', sellRequestSchema, 'sell-requests');

export default SellRequest;
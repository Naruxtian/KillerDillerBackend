import mongoose, { Schema, Model, model } from 'mongoose';
import { IProduct } from '../interfaces';

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    information: [{
        type: Schema.Types.ObjectId,
        ref: 'Information',
        required: true
    }],
    category: {
        type: String,
        enum: {
            values: [
                'playeras', 'pantalones', 'tops', 'vestidos', 'conjuntos', 'sudaderas', 'chamarras', 'abrigos', 'gorros', 'zapatos', 'accesorios', 'otros'
            ],
            message: '{VALUE} is not a valid category'
        },
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true,
        default: 0
    },
    images: [{
        type: String,
        required: true,
        default: 'https://image.flaticon.com/icons/svg/145/145867.svg'
    }],
    brand: {
        type: Schema.Types.ObjectId,
        ref: 'Brand',
        required: true
    },
    colors: [{
        type: Schema.Types.ObjectId,
        ref: 'Color',
        required: true
    }],
    gender: {
        type: String,
        enum: {
            values: ['hombres', 'mujeres', 'niños', 'unisex'],
            message: '{VALUE} is not a valid gender'
        },
        required: true,
        default: 'unisex'
    },
    size: {
        type: String,
        enum: {
            values: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'unitalla'],
            message: '{VALUE} is not a valid size'
        },
        required: false
    },
    fit: {
        type: String,
        enum: {
            values: ['skinny', 'slim', 'regular', 'loose', 'oversize'],
            message: '{VALUE} is not a valid fit'
        },
        required: false
    },
    internalCondition: {
        type: Number,
        required: true
    },
    externalCondition: {
        type: Number,
        required: true
    },
    tags: [{
        type: String,
        required: true,
        default: []
    }],
    isSold: {
        type: Boolean,
        default: false,
        required: true
    },
}, {
    timestamps: true
});

productSchema.index({ title: 'text', tags: 'text' });
productSchema.index({ 'createdAt': 1 }, { expireAfterSeconds: 2592000 });

const Product: Model<IProduct> = mongoose.models.Product || model('Product', productSchema);

export default Product;
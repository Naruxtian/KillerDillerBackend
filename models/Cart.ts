import mongoose, { Schema, Model, model } from 'mongoose';
import { ICart } from '../interfaces';

const cartSchema = new Schema({
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
        default: []
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false
    }
}, {
    timestamps: true
});

const Cart: Model<ICart> = mongoose.models.Cart || model('Cart', cartSchema);

export default Cart;
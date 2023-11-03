import mongoose, { Schema, Model, model } from 'mongoose';
import { IUser } from '../interfaces';

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: {
            values: ['client', 'admin'],
            message: '{VALUE} is not a valid role',
            default: 'client',
            required: true
        }
    },
    isConfirmed: {
        type: Boolean,
        default: false,
        required: true
    },
    tags: [{
        type: String,
        required: true,
        default: []
    }],
    cart: [{
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }],
    wishlist: [{
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }],
    address: {
        firstName: {
            type: String,
            required: false,
            default: ''
        },
        lastName: {
            type: String,
            required: false,
            default: ''
        },
        address: {
            type: String,
            required: false,
            default: ''
        },
        address2: {
            type: String
        },
        zipCode: {
            type: String,
            required: false,
            default: ''
        },
        city: {
            type: String,
            required: false,
            default: ''
         },
        country: {
            type: String,
            required: false,
            default: ''
        },
        phone: {
            type: String,
            required: false,
            default: ''
        }
    }
}, {
    timestamps: true
});

const User: Model<IUser> = mongoose.models.User || model('User', userSchema);

export default User;
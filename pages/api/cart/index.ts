import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import { db } from '../../../database';
import { ICart } from '../../../interfaces';
import { Cart } from '../../../models';

type Data = 
| { message: string }
| { message: string, cart: ICart }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'POST':
            return createCart(req, res);
    
        default:
            res.status(400).json({ message: 'Bad Request.' });
    }
}

const createCart = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { products } = req.body;
    const productIds = products.map((product: string) => new mongoose.Types.ObjectId(product));
    
    try {
        await db.connect();

        // Check if there's an existing cart with the user's id
        // const cart = await Cart.findOne({ user: userId });
        // if (cart) {
        //     console.log('Cart found');
        //     let updatedCart = await Cart.findByIdAndUpdate(cart._id, { products: productIds }, { new: true });
        //     console.log(updatedCart);
        //     updatedCart = updatedCart!

        //     await db.disconnect();

        //     return res.status(200).json({ message: 'Cart updated.', cart: updatedCart });
        // }

        // Create a new cart
        const newCart = await Cart.create(req.body);

        await db.disconnect();

        return res.status(200).json({ message: 'Cart created.', cart: newCart });
    } catch (error: any) {
        await db.disconnect();

        console.log(error);
        return res.status(400).json({ message: error.message || "Check server logs." });
    }
}
import type { NextApiRequest, NextApiResponse } from 'next';
import { buffer } from 'micro';
import { db } from '../../../database';
import { Order, Product } from '../../../models';
import { date } from '../../../utils';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY!);

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'POST':
            return setOrderDetails(req, res);
    
        default:
            res.status(400).json({ message: 'Bad request.' });
    }
}

const setOrderDetails = async (req: NextApiRequest, res: NextApiResponse) => {
    await db.connect();

    const endpointSecret = 'whsec_129769180f8f40d908dd95a4f46a1301efa24e72b32b0860b2a1181efcc0a93f';
    const payload = await buffer(req);
    const signature = req.headers['stripe-signature'];

    const event = stripe.webhooks.constructEvent(payload, signature, endpointSecret);
    if (event?.type === 'checkout.session.completed') {
        const { 
            orderId, userId, numberOfItems, orderItems, shippingAddress, subtotal, discount, total 
        } = event.data?.object?.metadata;
        const paymentStatus = event.data?.object?.payment_status;
        const paymentIntent = event.data?.object?.payment_intent;

        if (orderId) {
            // Set order as paid in database
            const order = new Order({ 
                _id: orderId,
                user: userId,
                orderItems: JSON.parse(orderItems),
                shippingAddress: JSON.parse(shippingAddress),
                numberOfItems,
                subtotal,
                discount,
                total,
                isPaid: false,
                paidAt: null,
                transactionId: null
            });
            
            if (paymentStatus === 'paid') {
                order.isPaid = true;
                order.transactionId = paymentIntent;
                order.paidAt = date.getFormattedDate();

                // Set order products as sold in database
                const products = await Product.find({ _id: { $in: order.orderItems.map(item => item._id) } });
                products.forEach(product => {
                    product.isSold = true;
                    product.save();
                });

                order.save();

                return res.status(200).json({ message: 'Order paid successfully.' });
                
            }

            return res.status(400).json({ message: 'Order not paid.' });
        }

        return res.status(400).json({ message: 'Order not found.' });
    }

    return res.status(400).json({ message: 'Order could not be completed.' });
}

export const config = {
    api: {
        bodyParser: false
    }
};

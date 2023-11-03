import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { db } from '../../../database';
import { IOrder } from '../../../interfaces';
import { Order, Product } from '../../../models';

type Data = 
| { message: string }
| IOrder
| { url: string }
| { url: string, newOrder: IOrder }
| { orders: IOrder[] };

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY!);

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'POST':
            return createOrder(req, res);
        case 'GET':
            return getOrders(req, res);
    
        default:
            res.status(400).json({ message: 'Bad request.' });
    }
}

const getOrders = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const orders = await Order.find({}).sort({ createdAt: -1 });

    res.status(200).json({ orders });
}

const createOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { orderItems, total, discount } = req.body as IOrder;

    // Check user's session
    const session: any = await getSession({ req });

    if (!session) {
        return res.status(401).json({ message: "Tienes que inciar sesión para continuar con la compra." });
    }

    // If there's a session, extract user's credentials
    const { _id: userId, email } = session.user;

    // Create an array with the order products
    const productIds = orderItems.map(product => product._id);

    await db.connect();

    const dbProducts = await Product.find({ _id: { $in: productIds } });
    
    try {
        // Last validation of products availability
        const unavailableProducts = dbProducts.filter(product => product.isSold);
        if (unavailableProducts && unavailableProducts.length > 0) {
            throw new Error("Alguno de los productos que intentas comprar ya no está disponible.");
        }

        // Validate order products exist and calculate price and discount
        const subtotal = orderItems.reduce((previous, current) => {
            const currentPrice = dbProducts.find(prod => prod.id === current._id)?.price;
            if (!currentPrice) {
                throw new Error("El subtotal de tu pedido no coincide con los precios listados.")
            }

            return current.price + previous
        }, 0);

        // Get order items discount
        const orderDiscount = orderItems.reduce((previous, current) => {
            return current.discount + previous;
        }, 0);

        if (orderDiscount != discount) {
            throw new Error("El descuento de tu pedido no coincide con el de los precios listados.");
        }

        // Validate order amounts match in client and server
        const backendTotal = subtotal - discount;

        if (total !== backendTotal) {
            throw new Error('El total de tu pedido no coincide con los valores esperados.');
        }

        const newOrder = new Order({ ...req.body, isPaid: false, user: userId }).toObject();
        newOrder.total = Math.round(newOrder.total * 100) / 100;

        await db.disconnect();

        // Format items to Stripe format
        let line_items = [];
        for (let productId of productIds) {
            const quantity = productIds.filter(id => id === productId).length;
            const product = dbProducts.find(product => product._id.toString() === productId);

            line_items.push({
                quantity,
                price_data: {
                    currency: 'MXN',
                    product_data: {
                        name: product!.title
                    },
                    unit_amount: (product!.price - product!.discount) * 100,
                }
            });
        }

        // Pay order
        const session = await stripe.checkout.sessions.create({
            line_items,
            payment_method_types: ['card'],
            mode: 'payment',
            customer_email: email,
            success_url: `${process.env.HOST_NAME}/orders/${newOrder._id.toString()}?isNew=true`,
            cancel_url: `${process.env.HOST_NAME}`,
            locale: 'es',
            metadata: { 
                orderId: newOrder._id.toString(),
                userId,
                numberOfItems: newOrder.numberOfItems,
                orderItems: JSON.stringify(newOrder.orderItems),
                shippingAddress: JSON.stringify(newOrder.shippingAddress),
                subtotal: newOrder.subtotal,
                discount: newOrder.discount,
                total: newOrder.total
            }
        });

        return res.status(201).json({ url: session.url, newOrder });
    } catch (error: any) {
        await db.disconnect();

        console.log(error);
        return res.status(400).json({ message: error.message || "Check server logs." });
    }
}

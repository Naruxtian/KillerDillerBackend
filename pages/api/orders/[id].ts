import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { IProduct } from '../../../interfaces';
import { Order, Product } from '../../../models';

type Data = 
| { message: string }
| IProduct

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'PUT':
            return updateOrder(req, res)

        default:
            return res.status(400).json({ message: 'Inexistent endpoint.' });
    }
}

const updateOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id } = req.query;
    const {
        status,
    } = req.body;

    await db.connect();
    const order = await Order.updateOne({
        _id: id
    }, {
        status
    })

    await db.disconnect();

    if (!order) {
        return res.status(404).json({ message: 'Order not found.' });
    } else {
        return res.status(200).json({ message: 'Order updated.' });
    }

}

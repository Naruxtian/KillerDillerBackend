import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { IProduct } from '../../../interfaces';
import { Product } from '../../../models';

type Data = 
| {message: string}
| IProduct[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'GET':
            return searchProducts(req, res);

        default:
            return res.status(400).json({ message: 'Unexistant endpoint.' });
    }
}

const searchProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    let { q = '' } = req.query;

    if (q.length === 0) {
        return res.status(400).json({ message: "You must specify a search query" });
    }

    q = q.toString().toLowerCase();

    await db.connect();

    const products = await Product.find({ $text: { $search: q } }).select(
        '_id title size gender images price discount isSold slug description category colors brand'
    ).lean().populate('brand').populate('colors');

    await db.disconnect();

    return res.status(200).json(products);
}
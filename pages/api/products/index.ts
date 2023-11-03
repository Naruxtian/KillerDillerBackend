import type { NextApiRequest, NextApiResponse } from 'next'
import { db, SHOP_CONSTANTS } from '../../../database';
import { IProduct } from '../../../interfaces';
import { Product } from '../../../models';

type Data = 
| { message: string }
| IProduct[];

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'GET':
            return getProducts(req, res)
        case 'POST':
            return addProduct(req, res)

        default:
            return res.status(400).json({ message: 'Inexistent endpoint.' });
    }
}

const addProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const {
        title,
        description,
        information,
        category,
        price,
        discount,
        images,
        brand,
        colors,
        gender,
        size,
        fit,
        internalCondition,
        externalCondition,
        tags
    } = req.body;

    await db.connect();
    await Product.create({
        title,
        description,
        information,
        category,
        slug: `${title.replace(/\s+/g, '_').toLowerCase()}`,
        price,
        discount,
        images,
        brand,
        colors,
        gender,
        size,
        fit,
        internalCondition,
        externalCondition,
        tags,
        isSold: false
    });

    await db.disconnect();

    return res.status(200).json({ message: 'Product added successfully.' });

}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { gender = 'all' } = req.query;

    let condition = {};

    if (gender !== 'all' && SHOP_CONSTANTS.validGenders.includes(`${gender}`)) {
        condition = { gender };
    }

    await db.connect();
    const products = await Product.find(condition).select(
        '_id title size gender images price discount isSold slug description category colors brand tags updatedAt'
    ).lean().populate('brand').populate('colors');
    await db.disconnect();

    return res.status(200).json(products);
}

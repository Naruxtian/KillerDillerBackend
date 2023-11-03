import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { IProduct } from '../../../interfaces';
import { Product } from '../../../models';

type Data = 
| { message: string }
| IProduct

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'GET':
            return getProductById(req, res)
        case 'PUT':
            return updateProduct(req, res)
        case 'DELETE':
            return deleteProduct(req, res)

        default:
            return res.status(400).json({ message: 'Inexistent endpoint.' });
    }
}

const deleteProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id } = req.query;

    await db.connect();
    const product = await Product.deleteOne({
        _id: id
    });

    await db.disconnect();

    if (!product) {
        return res.status(404).json({ message: 'Product not found.' });
    } else {
        return res.status(200).json({ message: 'Product deleted.' });
    }

}

const updateProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id } = req.query;
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
        tags,
        isSold
    } = req.body;

    await db.connect();

    const product = await Product.updateOne({ _id: id }, {
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
        isSold
    });

    await db.disconnect();

    if (!product) {
        return res.status(404).json({ message: 'Product not found.' });
    } else {
        return res.status(200).json({ message: 'Product updated.' });
    }
}

const getProductById = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id } = req.query;

    await db.connect();
    const product = await Product.findById(id).select('_id title slug images price discount size gender tags isSold').lean()
    await db.disconnect();

    if (!product) {
        return res.status(404).json({ message: 'Product not found.' });
    }

    return res.status(200).json(product);
}

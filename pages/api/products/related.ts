import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { IProduct } from "../../../interfaces";
import { Product } from "../../../models";

type Data = 
| { message: string }
| IProduct[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'GET':
            return getRelatedProducts(req, res);

        default:
            return res.status(400).json({ message: 'Inexistent endpoint.' });
    }
}

const getRelatedProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { tags } = req.query as { tags: string };
    const tagsArray = Array.from(tags.split(','));

    await db.connect();
    const products = await Product.find({ tags: { $in: tagsArray } });
    await db.disconnect();

    return res.status(200).json(products);
}
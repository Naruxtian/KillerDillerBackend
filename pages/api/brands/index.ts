import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { IBrand } from '../../../interfaces';
import { Brand, Color } from '../../../models';

type Data = 
| { message: string }
| { brands: IBrand[] }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'GET':
            return getBrands(req, res)
        case 'POST':
            return addBrand(req, res)

        default:
            return res.status(400).json({ message: 'Inexistent endpoint.' });
    }
}

const addBrand = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const {
        name
    } = req.body;

    await db.connect();
    const brand = await Brand.create({
        name,
    })

    await db.disconnect();

    if (!brand) {
        return res.status(404).json({ message: 'Brand not found.' });
    } else {
        return res.status(200).json({ message: 'Brand added.' });
    }

}

const getBrands = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    try {
        await db.connect();
        const brands = await Brand.find();
        await db.disconnect();

        return res.status(200).json({ brands });
    } catch (error: any) {
        await db.disconnect();

        console.log(error);
        return res.status(400).json({ message: error.message || "Check server logs." });
    }
}

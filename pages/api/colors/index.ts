import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { IColor } from '../../../interfaces';
import { Color } from '../../../models';

type Data = 
| { message: string }
| { colors: IColor[] }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'GET':
            return getColors(req, res)
        case 'POST':
            return addColor(req, res)

        default:
            return res.status(400).json({ message: 'Inexistent endpoint.' });
    }
}

const addColor = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const {
        name,
        hex,
    } = req.body;

    await db.connect();
    const color = await Color.create({
        name,
        hex,
    })

    await db.disconnect();

    if (!color) {
        return res.status(404).json({ message: 'Color not found.' });
    } else {
        return res.status(200).json({ message: 'Color added.' });
    }

}

const getColors = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    try {
        await db.connect();
        const colors = await Color.find();
        await db.disconnect();

        return res.status(200).json({ colors });
    } catch (error: any) {
        await db.disconnect();

        console.log(error);
        return res.status(400).json({ message: error.message || "Check server logs." });
    }
}

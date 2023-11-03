import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { ISellRequest } from "../../../interfaces";
import { SellRequest } from "../../../models";

type Data = 
| { message: string }
| { message: string, sellRequest: ISellRequest };

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'POST':
            return createSellRequest(req, res);
    
        default:
            res.status(400).json({ message: 'Bad request.' });
    }
}

const createSellRequest = async (req: NextApiRequest, res: NextApiResponse) => {
    const data = req.body;

    try {
        await db.connect();
        const sellRequest = await SellRequest.create(data);
        await db.disconnect();

        return res.status(201).json({ message: 'Sell request created successfully.', sellRequest });
    } catch (error: any) {
        await db.disconnect();

        console.log(error);
        return res.status(400).json({ message: error.message || "Check server logs." });
    }
}
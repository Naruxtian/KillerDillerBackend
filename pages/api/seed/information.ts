import type { NextApiRequest, NextApiResponse } from 'next';
import { db, seedData } from '../../../database';
import { Information } from '../../../models';

type Data = {
    message: string;
}

export default async  function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
    if (process.env.NODE_ENV === 'production') {
        return res.status(401).json({ message: "You have no access to this service." })
    }

    await db.connect();

    await Information.deleteMany();
    await Information.insertMany(seedData.initialData.information);

    await db.disconnect();

    res.status(200).json({ message: 'Process done successfully.' });
}
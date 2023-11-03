import type { NextApiRequest, NextApiResponse } from 'next';
import { db, seedData } from '../../../database';
import { Event } from '../../../models';

type Data = {
    message: string;
}

export default async  function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
    if (process.env.NODE_ENV === 'production') {
        return res.status(401).json({ message: "You have no access to this service." })
    }

    await db.connect();

    await Event.deleteMany();
    await Event.insertMany(seedData.initialData.events);

    await db.disconnect();

    res.status(200).json({ message: 'Process done successfully.' });
}
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { IEvent } from '../../../interfaces';
import { Event } from '../../../models';

type Data = 
| { message: string }
| { events: IEvent[] }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'GET':
            return getEvents(req, res)
        case "PUT":
            return updateEvent(req, res)

        default:
            return res.status(400).json({ message: 'Inexistent endpoint.' });
    }
}

const updateEvent = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const {
        title,
        description,
        date,
        image,
        id
    } = req.body;

    await db.connect();
    const event = await Event.updateOne({
        _id: id
    }, {
        title,
        description,
        date,
        location,
        image
    })

    await db.disconnect();

    if (!event) {
        return res.status(404).json({ message: 'Event not found.' });
    } else {
        return res.status(200).json({ message: 'Event updated.' });
    }

}

const getEvents = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    try {
        await db.connect();
        const events = await Event.find();
        await db.disconnect();

        return res.status(200).json({ events });
    } catch (error: any) {
        await db.disconnect();

        console.log(error);
        return res.status(400).json({ message: error.message || "Check server logs." });
    }
}

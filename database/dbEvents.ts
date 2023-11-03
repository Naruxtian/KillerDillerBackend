import { db } from "./";
import { Event } from '../models/'

export const getEvents = async () => {
    await db.connect();
    const events = await Event.find().lean();
    await db.disconnect();

    return JSON.parse(JSON.stringify(events));
}
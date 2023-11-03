import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { IUser } from "../../../interfaces";
import { User } from "../../../models";

type Data = 
| { users: IUser[] }
| { message: string };

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'GET':
            return getUsers(req, res);
    
        default:
            res.status(400).json({ message: 'Bad request.' });
    }
}

const getUsers = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await db.connect();
        const users = await User.find();
        await db.disconnect();

        return res.status(200).json({ users });
    } catch (error: any) {
        await db.disconnect();

        console.log(error);
        return res.status(400).json({ message: error.message || "Check server logs." });
    }
}

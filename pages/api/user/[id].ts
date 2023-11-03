import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { db } from '../../../database';
import { User } from '../../../models';
import { jwt } from '../../../utils';

type Data = 
| { message: string }
| {
    token: string,
    user: {
        name: string,
        email: string,
        role: string
    }
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'GET':
            return getUserById(req, res);

        case 'PUT':
            return updateUser(req, res);
    
        default:
            res.status(400).json({ message: 'Bad Request.' });
    }
}

const getUserById = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id } = req.query;

    await db.connect();
    const user = await User.findById(id);
    await db.disconnect();

    if (!user) {
        return res.status(404).json({ message: 'User not found.' });
    }

    return res.status(200).json({ message: 'User found.', user });
}

const updateUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id } = req.query;
    const data = req.body;
    const { password } = req.body;

    if (password) {
        data.password = bcrypt.hashSync(password);
    }
    
    await db.connect();
    const user = await User.findByIdAndUpdate(id, data, { new: true });
    await db.disconnect();
    
    if (!user) {
        return res.status(404).json({ message: 'User not found.' });
    }

    return res.status(200).json({ message: 'User updated.', user });
};
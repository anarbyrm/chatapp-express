import { Request, Response } from 'express';
import { validationResult, matchedData } from 'express-validator';
import bcrypt from 'bcrypt';

import { User } from '../models/user';

export const createUser = async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            status: 'fail',
            data: errors.array()
        })
    }

    const data = matchedData(req);

    try {
        const userExists = await User.findOne({
            email: data.email
        })

        if (userExists) {
            return res.status(400).json({
                status: 'fail',
                data: 'user with specified email is already exists'
            })
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);
        data.password = hashedPassword;

        const newUser = await User.create({ ...data });
        return res.status(201).json({
            status: 'success',
            data: {
                email: newUser.email,
                createdAt: newUser.createdAt,
                updatedAt: newUser.updatedAt
            }
        })
    } catch (err: any) {
        return res.status(400).json({
            status: 'error',
            message: err.message
        })
    }
}
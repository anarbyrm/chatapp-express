import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.find({}, '_id email createdAt updatedAt');
        return res.status(200).json({
            status: 'success',
            data: users
        })
    } catch (err) {
        next(err);
    }
}
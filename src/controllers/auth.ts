import { NextFunction, Request, Response } from 'express';
import { validationResult, matchedData } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User } from '../models/user';

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
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

    } catch (err) {
        next(err);
    }
}

export const getToken = async (req: Request, res: Response, next: NextFunction) => {
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

        if (!userExists) {
            return res.status(404).json({
                status: 'fail',
                data: 'Email or password is invalid'
            })
        }

        const passVerified = await bcrypt.compare(data.password, userExists.password);
        
        if (!passVerified) {
            return res.status(404).json({
                status: 'fail',
                data: 'Email or password is invalid'
            })
        }

        const JWT_SECRET_KEY = String(process.env.JWT_SECRET_KEY);

        jwt.sign({ email: userExists.email }, JWT_SECRET_KEY, (err: Error | null, token: string | undefined) => {
            if (err) {
                return next(err);
            }

            return res.status(200).json({
                status: 'success',
                data: {token}
            })
        })

    } catch (err) {
        next(err);
    }
}
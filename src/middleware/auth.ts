import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { IUser, User } from '../models/user';

dotenv.config();

export interface CustomRequest extends Request {
    user?: IUser
}

export const verifyToken = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const tokenData: string | unknown = req.headers.authorization;

    if (typeof tokenData !== "string") {
        return res.status(401).json({
            status: 'fail',
            data: "Not authenticated"
        })
    }

    const [prefix, token] = tokenData.split(" ");

    if (prefix !== 'Bearer') {
        return res.status(401).json({
            status: 'fail',
            data: "Not authenticated"
        })
    }
    const JWT_SECRET_KEY = String(process.env.JWT_SECRET_KEY)

    jwt.verify(token, JWT_SECRET_KEY, async (err, decoded) => {
        if (err) {
            return next(err);
        }

        if (typeof decoded === 'object'){
            if (decoded.email) {
                const user = await User.findOne({ email: decoded.email });
                if (user) {
                    req.user = user;
                    next();
                }
            }

        } else {
            const err = Error('decoded value does not exist')
            next(err);
        }
    })
}

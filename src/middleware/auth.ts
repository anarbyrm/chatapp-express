import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const tokenData: string = req.body.authorization;
    const [prefix, token] = tokenData.split(" ");

    if (prefix !== 'Bearer') {
        return res.status(401).json({
            status: 'fail',
            data: "Not authenticated"
        })
    }
    const JWT_SECRET_KEY = String(process.env.JWT_SECRET_KEY)

    jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return next(err);
        }
        
        if (typeof decoded === 'string'){
            const data: { email: string } = JSON.parse(decoded)

            if (data.email) {
                next();
            }
        } else {
            const err = Error('decoded value does not exist')
            next(err);
        }
    })
}

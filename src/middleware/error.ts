import { NextFunction, Request, Response } from "express";

export const serverErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    return res.status(500).json({
        status: 'error',
        message: err.message
    })
}
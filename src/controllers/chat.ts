import { Response, NextFunction } from 'express';
import { matchedData, validationResult } from 'express-validator';

import { CustomRequest } from '../middleware/auth';
import { User } from '../models/user';
import { Message, Chat } from '../models/chat';

export const sendMessage = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            status: 'fail',
            data: errors.array()
        })
    }
    
    const data = matchedData(req);

    try {
        const sender = req.user;

        if (!sender) {
            return res.status(401).json({
                status: 'fail',
                data: 'Not authorized'
            })
        }

        const { userId } = req.params;

        const receiver = await User.findOne({ _id: userId });

        if (!receiver) {
            return res.status(404).json({
                status: 'fail',
                data: 'user does not exist'
            })
        }

        let chat = await Chat.findOne({
            participants: { $all: [ receiver._id, sender._id] }
        });

        if (!chat) {
            chat = await Chat.create({
                participants: [sender._id, receiver._id]
            });
        }
        const newMessage = await Message.create({
            sender: sender._id,
            receiver: receiver._id,
            body: data.body
        })

        if (!newMessage) {
            throw Error('Message can be created')
        }

        chat.messages.push(newMessage._id);
        await chat.save();

        return res.status(201).json({
            status: 'success',
            data: newMessage
        })

    } catch (err) {
        next(err);
    }
};

export const getChat = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const sender = req.user;

        if (!sender) {
            return res.status(401).json({
                status: 'fail',
                data: 'Not authorized'
            })
        }

        const { userId } = req.params;

        const receiver = await User.findOne({ _id: userId });

        if (!receiver) {
            return res.status(404).json({
                status: 'fail',
                data: 'user does not exist'
            })
        }

        const chat = await Chat.findOne({
            participants: { $all: [ receiver._id, sender._id] }
        }).populate("messages");

        return res.status(200).json({
            status: 'success',
            data: chat
        })
    } catch (err) {
        next(err);
    }
};
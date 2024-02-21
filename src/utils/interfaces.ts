import { Document } from 'mongoose';

export interface UserInt extends Document {
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string
}

export interface MessageInt extends Document {
    sender: string;
    receiver: string;
    body: string;
    createdAt: string;
    updatedAt: string
}

export interface ChatInt extends Document {
    participants: string[];
    messages: string[];
    createdAt: string;
    updatedAt: string
}

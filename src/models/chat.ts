import { model, Schema, Document } from 'mongoose'

export interface IMessage extends Document {
    sender: string;
    receiver: string;
    body: string;
}

export interface IChat extends Document {
    participants: string[];
    messages: string[];
}

const MessageSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    body: {
        type: String,
        required: true
    }
}, { timestamps: true })

const ChatSchema = new Schema({
    participants: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'Message',
        default: []
    }]
})

export const Message = model<IMessage>('Message', MessageSchema);
export const Chat = model<IChat>('Chat', ChatSchema);

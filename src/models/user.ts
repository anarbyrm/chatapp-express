import { Schema, Document, model } from "mongoose";

import { UserInt } from '../utils/interfaces';

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true
    },
    password: String
}, { timestamps: true })


export const User = model<UserInt>("User", UserSchema);

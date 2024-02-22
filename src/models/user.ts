import { Schema, model, Document } from "mongoose";
export interface IUser extends Document {
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
}

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true
    },
    password: String
}, { timestamps: true })

export const User = model<IUser>("User", UserSchema);

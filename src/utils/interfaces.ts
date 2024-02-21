export interface UserInt {
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string
}

export interface MessageInt {
    sender: string;
    receiver: string;
    body: string;
    createdAt: string;
    updatedAt: string
}

export interface ChatInt{
    participants: string[];
    messages: string[];
    createdAt: string;
    updatedAt: string
}

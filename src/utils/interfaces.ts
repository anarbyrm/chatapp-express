export interface UserInt {
    email: string;
    password: string;
}

export interface MessageInt {
    sender: string;
    receiver: string;
    body: string;
}

export interface ChatInt{
    participants: string[];
    messages: string[];
}

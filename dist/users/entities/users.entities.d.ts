import { ObjectId } from "mongodb";
export declare class Users {
    _id: ObjectId;
    email: string;
    password: string;
    token: string;
    role: string;
}

import {IUser} from "../model/user";
import * as uuid from "uuid"

const users: IUser[] = [
    {
        id: 'e1bd85f6-94f3-424d-a734-b3a1bd76d83c',
        username: 'Boot',
        age: 12,
        hobbies: ['cooking']
    }
];

export const getAllUsers = async (): Promise<IUser[]> => Object.values(users);

export const addUser = async (data: string): Promise<IUser> => {
    let user: IUser = JSON.parse(data);
    user.id = uuid.v4().toString();
    users.push(user);

    return user;
};
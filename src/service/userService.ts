import {IUser} from "../model/user";
import * as uuid from "uuid"

const users: IUser[] = [];

export const getAllUsers = async (): Promise<IUser[]> => Object.values(users);

export const getUser = async (id: string | undefined): Promise<IUser | undefined> => {
    return users.find(us => id === us.id);
};

export const addUser = async (user: IUser): Promise<IUser> => {
    user.id = uuid.v4().toString();
    users.push(user);

    return user;
};

export const updateUser = async (id: string | undefined, user: IUser): Promise<IUser | undefined> => {
    let existsUser: IUser | undefined = users.find(us => id === us.id);
    if (existsUser !== undefined) {
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === id) {
                users[i] = user;
                users[i].id = id;
            }
        }
    }

    return users.find(us => id === us.id);
};

export const deleteUser = async (id: string | undefined): Promise<IUser | undefined> => {
    let existsUser: IUser | undefined = users.find(us => id === us.id);
    if (existsUser !== undefined) {
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === id) {
                users.splice(i, 1);
            }
        }
    }

    return existsUser;
};
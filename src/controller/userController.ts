import { ServerResponse, IncomingMessage } from "node:http"
import { IUser } from "../model/user";
import * as userService from "../service/userService";

export const getUsers = async (req: IncomingMessage, res: ServerResponse) => {
    const users: IUser[] = await userService.getAllUsers()
    res.end(JSON.stringify({users}));
};

export const addUser = async (req: IncomingMessage, res: ServerResponse) => {
    let data = "";
    req.on('data', chunk => {
        data += chunk;
    });

    req.on("end", async () => {
        const user: IUser = await userService.addUser(data);
        res.end(JSON.stringify({user}));
    })
  };
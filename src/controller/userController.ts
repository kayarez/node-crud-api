import { ServerResponse, IncomingMessage } from "node:http"
import { IUser } from "../model/user";
import * as httpHelper from "../util/httpHelper";
import * as validator from "../util/validator";
import * as userService from "../service/userService";
import * as messages from "../enum/enum";


export const getUsers = async (req: IncomingMessage, res: ServerResponse) => {
    const users: IUser[] = await userService.getAllUsers()
    httpHelper.writeSuccessEnd(res, 200, users);
};

export const getUser = async (req: IncomingMessage, res: ServerResponse) => {
    let pathArray = req.url?.split('/');
    if (pathArray) {
        let userId = pathArray.pop();
        let error = validator.validateUUID(userId)
        if (error !== "") {
            httpHelper.writeErrorEnd(res, 400, error);
            return;
        }

        const user: IUser | undefined = await userService.getUser(userId);
        if (user !== undefined) {
            httpHelper.writeSuccessEnd(res, 200, user);
        } else {
            httpHelper.writeErrorEnd(res, 404, messages.Errors.USER_NOT_FOUND);
        }
    } else {
        httpHelper.writeErrorEnd(res, 400, messages.Errors.BODY_NOT_FOUND)
    }
}

export const addUser = async (req: IncomingMessage, res: ServerResponse) => {
    let data = "";
    req.on('data', chunk => {
        data += chunk;
    });

    req.on("end", async () => {
        if (data !== "") {
            let user: IUser = JSON.parse(data);

            let error = validator.validateRequiredUsersField(user);
            if (error !== "") {
                httpHelper.writeErrorEnd(res, 400, error);
                return;
            }

            const newUser: IUser = await userService.addUser(user);
            httpHelper.writeSuccessEnd(res, 201, newUser);
        } else {
            httpHelper.writeErrorEnd(res, 400, messages.Errors.BODY_NOT_FOUND)
        }
    })
};

export const updateUser = async (req: IncomingMessage, res: ServerResponse) => {
    let pathArray = req.url?.split('/');
    if (pathArray) {
        let userId = pathArray.pop();
        let error = validator.validateUUID(userId)
        if (error !== "") {
            httpHelper.writeErrorEnd(res, 400, error);
            return;
        }

        let data = "";
        req.on('data', chunk => {
            data += chunk;
        });

        req.on("end", async () => {
            if (data !== "") {
                let user: IUser = JSON.parse(data);

                let error = validator.validateRequiredUsersField(user);
                if (error !== "") {
                    httpHelper.writeErrorEnd(res, 400, error);
                    return;
                }

                const newUser: IUser | undefined = await userService.updateUser(userId, user);
                if (newUser === undefined) {
                    httpHelper.writeErrorEnd(res, 404, messages.Errors.USER_NOT_FOUND);
                } else {
                    httpHelper.writeSuccessEnd(res, 200, newUser);
                }
            } else {
                httpHelper.writeErrorEnd(res, 400, messages.Errors.BODY_NOT_FOUND)
            }
        })
    }
};

export const deleteUser = async (req: IncomingMessage, res: ServerResponse) => {
    let pathArray = req.url?.split('/');
    if (pathArray) {
        let userId = pathArray.pop();
        let error = validator.validateUUID(userId)
        if (error !== "") {
            httpHelper.writeErrorEnd(res, 400, error);
            return;
        }

        const user: IUser | undefined = await userService.deleteUser(userId);
        if (user !== undefined) {
            httpHelper.writeSuccessEnd(res, 204, "Ok");
        } else {
            httpHelper.writeErrorEnd(res, 404, messages.Errors.USER_NOT_FOUND);
        }
    } else {
        httpHelper.writeErrorEnd(res, 400, messages.Errors.BODY_NOT_FOUND)
    }
}
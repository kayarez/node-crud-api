import {IUser} from "../model/user";
import * as messages from "../enum/enum";
import * as uuid from "uuid"

export function validateRequiredUsersField(user: IUser) {
    if (user.username === undefined || user.username.trim() === "") {
        return messages.Errors.USERNAME_NOT_FOUND;
    } else if (user.age === undefined) {
        return messages.Errors.AGE_NOT_FOUND;
    } else if (user.hobbies === undefined) {
        return messages.Errors.HOBBIES_NOT_FOUND;
    } else {
        return "";
    }
}

export function validateUUID(id?: string) {
    if (id === undefined || id.trim() === "") {
        return messages.Errors.USER_ID_NOT_FOUND;
    } else if (!uuid.validate(id)) {
        return messages.Errors.UUID_NOT_VALID;
    }

    return "";
}

//import * as uuid from "uuid"

import { ServerResponse, IncomingMessage } from "node:http"

import { IUser} from "./dbUser"

/*function buildUser (userId: string, userName: string, userAge: number, userHobbies: string[]): IUser {
    return { id: userId, username: userName, age: userAge, hobbies: userHobbies};
}*/

let users: IUser[] = [{
    id: 'qwert',
    username:'aaa',
    age: 12,
    hobbies: ['ss']

}];


export const getUsers = (req: IncomingMessage, res: ServerResponse) => {

    try {

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(users);
        
    } catch (error) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(
              JSON.stringify({
                success: false,
                error: error,
              })
            );
            
          }
        };

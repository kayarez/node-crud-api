import * as http from "http"
import * as dotenv from "dotenv"
import * as url from 'url';
import * as userContoller from "./controller/userController";
import {OutgoingMessage} from "http";
import {IncomingMessage, ServerResponse} from "node:http";

dotenv.config({path: './config.env'});


let GET_handler = async (req: IncomingMessage, res: ServerResponse) => {
    res.writeHead(200, {'Content-Type': 'application/json'});
    switch (url.parse(<string>req.url).pathname) {
        case '/api/users/':
            await userContoller.getUsers(req, res);
            break;
        default:
            write_error_400(res, 'Invalid URL');
            break;
    }
};

let POST_handler = async (req: IncomingMessage, res: ServerResponse) => {
    res.writeHead(200, {'Content-Type': 'application/json'});
    switch (url.parse(<string>req.url).pathname) {
        case '/api/users/':
            await userContoller.addUser(req, res);
            break;
        default:
            write_error_400(res, 'Invalid URL');
            break;
    }
};

let http_handler = async (req: IncomingMessage, res: ServerResponse) => {
    console.log(req.method);
    switch (req.method) {
        case 'GET':
            await GET_handler(req, res);
            break;
        case 'POST':
            await POST_handler(req, res);
            break;
        // case 'PUT':
        //     PUT_handler(req, res);
        //     break;
        // case 'DELETE':
        //     DELETE_handler(req, res);
        //     break;
        default:
            write_error_400(res, 'Invalid Method');
            break;
    }
}

function write_error_400(res: ServerResponse, error: string) {
    res.statusCode = 400;
    res.statusMessage = 'Invalid method';
    let htmlText = '<h1>Error 400</h1> </br> <h3>' + error + '</h3>';
    res.end(htmlText);
}

let server = http.createServer();
server.listen(3000, () => {
    console.log('server.listen(3000)')
}).on('request', http_handler);
import {ServerResponse} from "node:http";

export function writeErrorEnd(res: ServerResponse, statusCode: number, error: string) {
    res.writeHead(statusCode, {'Content-Type': 'application/json'});
    res.end(error);
}

export function writeSuccessEnd(res: ServerResponse, statusCode: number, object: Object) {
    res.writeHead(statusCode, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(object));
}
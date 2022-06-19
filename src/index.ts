import * as http from "http"
import * as dotenv from "dotenv"
import * as url from 'url';
import {IncomingMessage, ServerResponse} from "node:http";
import cluster from 'cluster';
import { cpus } from 'os';
import * as process from 'process';

import * as userContoller from "./controller/userController";
import * as httpHelper from "./util/httpHelper";
import * as messages from "./enum/enum";

dotenv.config({path: './config.env'});

let getHandler = async (req: IncomingMessage, res: ServerResponse) => {
  try{
    let pathArray = req.url?.split('/');
    if (pathArray) {
        switch ("/" + pathArray[1] + "/" + pathArray[2]) {
            case '/api/users':
                pathArray[3] ? await userContoller.getUser(req, res) : await userContoller.getUsers(req, res);
                break;
            default:
                httpHelper.writeErrorEnd(res, 404, messages.Errors.INVALID_URL);
                break;
        }
    }}

    catch(error)
    {
      res.writeHead(500, { "Content-Type": "application/json" });
         res.end(
           JSON.stringify({
             success: false,
             error: error,
           })
         );
    }

};

let postHandler = async (req: IncomingMessage, res: ServerResponse) => {
  try{
    switch (url.parse(<string>req.url).pathname) {
        case '/api/users/':
            await userContoller.addUser(req, res);
            break;
        default:
            httpHelper.writeErrorEnd(res, 404, messages.Errors.INVALID_URL);
            break;
    }}

    catch(error)
    {
      res.writeHead(500, { "Content-Type": "application/json" });
         res.end(
           JSON.stringify({
             success: false,
             error: error,
           })
         );
    }
};

let putHandler = async (req: IncomingMessage, res: ServerResponse) => {
  try{
    let pathArray = req.url?.split('/');
    if (pathArray) {
        switch ("/" + pathArray[1] + "/" + pathArray[2]) {
            case '/api/users':
                await userContoller.updateUser(req, res);
                break;
            default:
                httpHelper.writeErrorEnd(res, 404, messages.Errors.INVALID_URL);
                break;
        }
    }
  }

  catch(error)
  {
    res.writeHead(500, { "Content-Type": "application/json" });
       res.end(
         JSON.stringify({
           success: false,
           error: error,
         })
       );
  }
    
};

let deleteHandler = async (req: IncomingMessage, res: ServerResponse) => {

  try{
  let pathArray = req.url?.split('/');
  if (pathArray) {
      switch ("/" + pathArray[1] + "/" + pathArray[2]) {
          case '/api/users':
              await userContoller.deleteUser(req, res);
              break;
          default:
              httpHelper.writeErrorEnd(res, 404, messages.Errors.INVALID_URL);
              break;
      }
  }

}

catch(error)
{
  res.writeHead(500, { "Content-Type": "application/json" });
     res.end(
       JSON.stringify({
         success: false,
         error: error,
       })
     );
}
};

let httpHandler = async (req: IncomingMessage, res: ServerResponse) => {
  try{
    switch (req.method) {
        case 'GET':
            await getHandler(req, res);
            break;
        case 'POST':
            await postHandler(req, res);
            break;
        case 'PUT':
            await putHandler(req, res);
            break;
        case 'DELETE':
            await deleteHandler(req, res);
            break;
        default:
            httpHelper.writeErrorEnd(res, 400, messages.Errors.INVALID_HTTP_METHOD);
            break;
    }
  }
  catch(error)
{
  res.writeHead(500, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      success: false,
      error: error,
    })
  );
}
}

const PORT = process.env.PORT || 5000;


  let server = http.createServer();
  server.listen(PORT, () => {
    console.log('server.listen(' + PORT + ")")
}).on('request', httpHandler);


import * as http from "http"
import * as dotenv from "dotenv"
import {getUsers} from "./controller";

dotenv.config({path: './config.env'});

const myServer = http.createServer((req, res) => {

    if (req.method == "GET" && req.url == "/api/users") {
        return getUsers(req, res);
      }
}
);

const PORT = process.env.PORT || 5000;

myServer.listen(PORT, () => {
    console.log ('Server listen')
});


"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var http = require("http");
var dotenv = require("dotenv");
var url = require("url");
var userContoller = require("./controller/userController");
dotenv.config({ path: './config.env' });
// const server = http.createServer((req, res) => {
//     if (req.method == "GET" && req.url == "/api/users") {
//         return getUsers(req, res);
//     }
// });
//
// const PORT = process.env.PORT || 5000;
//
// server.listen(PORT, () => {
//     console.log('Server listen')
// });
var GET_handler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                res.writeHead(200, { 'Content-Type': 'application/json' });
                _a = url.parse(req.url).pathname;
                switch (_a) {
                    case '/api/users/': return [3 /*break*/, 1];
                }
                return [3 /*break*/, 3];
            case 1: return [4 /*yield*/, userContoller.getUsers(req, res)];
            case 2:
                _b.sent();
                return [3 /*break*/, 4];
            case 3:
                write_error_400(res, 'Invalid URL');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var POST_handler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                res.writeHead(200, { 'Content-Type': 'application/json' });
                _a = url.parse(req.url).pathname;
                switch (_a) {
                    case '/api/users/': return [3 /*break*/, 1];
                }
                return [3 /*break*/, 3];
            case 1: return [4 /*yield*/, userContoller.addUser(req, res)];
            case 2:
                _b.sent();
                return [3 /*break*/, 4];
            case 3:
                write_error_400(res, 'Invalid URL');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var http_handler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                console.log(req.method);
                _a = req.method;
                switch (_a) {
                    case 'GET': return [3 /*break*/, 1];
                    case 'POST': return [3 /*break*/, 3];
                }
                return [3 /*break*/, 5];
            case 1: return [4 /*yield*/, GET_handler(req, res)];
            case 2:
                _b.sent();
                return [3 /*break*/, 6];
            case 3: return [4 /*yield*/, POST_handler(req, res)];
            case 4:
                _b.sent();
                return [3 /*break*/, 6];
            case 5:
                write_error_400(res, 'Invalid Method');
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
function write_error_400(res, error) {
    res.statusCode = 400;
    res.statusMessage = 'Invalid method';
    var htmlText = '<h1>Error 400</h1> </br> <h3>' + error + '</h3>';
    res.end(htmlText);
}
var server = http.createServer();
server.listen(3000, function () {
    console.log('server.listen(3000)');
}).on('request', http_handler);

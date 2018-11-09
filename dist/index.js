"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server/server"));
const indexApi_1 = __importDefault(require("./api/indexApi"));
require('./hbs/helpers');
const server = server_1.default.init(Number(3000));
server.app.use(indexApi_1.default);
//process.env.PORT
server.start(() => {
    console.log(`Servidor corriendo en el puerto 3000`);
});

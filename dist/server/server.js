"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const hbs = require('hbs');
const cookieParser = require('cookie-parser');
const session = require('express-session');
class Server {
    constructor(port) {
        this.port = port;
        this.app = express();
        this.config();
    }
    config() {
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        this.app.use(cookieParser());
        this.app.use(session({
            secret: 'cot1zac10n35',
            resave: false,
            saveUninitialized: true,
            cookie: { maxAge: 1800000 }
        }));
    }
    static init(port) {
        return new Server(port);
    }
    publicFolder() {
        const publicPath = path.resolve(__dirname, '../public');
        this.app.use(express.static(publicPath));
        this.app.set('views', publicPath);
        hbs.registerPartials(path.join(publicPath, '/partials'));
        this.app.set('view engine', 'hbs');
    }
    start(callback) {
        this.app.listen(this.port, callback);
        this.publicFolder();
    }
}
exports.default = Server;

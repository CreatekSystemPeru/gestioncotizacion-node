import express = require('express');
import path = require('path');
import bodyParser = require('body-parser');
const hbs = require('hbs');
const cookieParser = require('cookie-parser');
const session = require('express-session');

export default class Server {
    public app: express.Application;
    public port: number;

    constructor(port: number) {
        this.port = port;
        this.app = express();
        this.config();
    }

    private config() {
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

    static init (port: number) {
        return new Server(port);
    }

    private publicFolder() {
        const publicPath = path.resolve(__dirname, '../public');        
        this.app.use(express.static(publicPath));
        this.app.set('views', publicPath);
        hbs.registerPartials(path.join(publicPath, '/partials'));
        this.app.set('view engine', 'hbs');        
    }

    start(callback: Function) {        
        this.app.listen(this.port, callback);        
        this.publicFolder();        
    }
}
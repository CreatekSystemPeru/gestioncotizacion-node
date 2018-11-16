import express = require('express');
import path = require('path');
import bodyParser = require('body-parser');
const hbs = require('hbs');
const cookieParser = require('cookie-parser');
const session = require('express-session');

var blocks : any = {};

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

        hbs.registerHelper('extend', function(name: any, context: any) {
            var block = blocks[name];
            if (!block) {
                block = blocks[name] = [];
            }
            block.push(context.fn());
            //block.push(context.fn(this));
        });
        
        hbs.registerHelper('block', function(name: any) {
            var val = (blocks[name] || []).join('\n');        
            // clear the block
            blocks[name] = [];
            return val;
        });

        hbs.registerHelper('raw-helper', function(options: any) {
            return options.fn();
        });
    }

    start(callback: Function) {
        this.publicFolder();

        this.app.use(function(req, res, next){
            res.status(404).send('404_error_template');
        });

        this.app.listen(this.port, callback);
    }
}
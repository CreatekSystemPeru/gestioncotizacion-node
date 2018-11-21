import mysql = require('mysql');

export default class MySQL {
    // private static _instance: MySQL;

    // cnx: mysql.Connection;
    // conectado: boolean = false;

    private static cnx: mysql.Connection;

    constructor() {
        // this.conectarDB();
    }

    // public static get instance() {
    //     return this._instance || (this._instance = new this());
    // }

    // static ejecutarQuery(query: string, callback: Function) {
        // this.instance.cnx.query(query, (err, results: Object[], fields) => {
        //     if (err) {
        //         console.log('Error en ejecutarQuery(): ', err);
        //         return callback(err);
        //     }

        //     callback(null, results);
        // });
    // }

    // private conectarDB() {
    //     this.cnx.connect((err: mysql.MysqlError) => {
    //         if (err) {
    //             console.log('Error in conectarDB(): ', err.message);                
    //             return;
    //         }

    //         this.conectado = true;
    //         console.log('Base de datos online');
    //     });
    // }

    public static ejecutarQuery(query: string, callback: Function) {
        this.conectarDB();
        this.cnx.query(query, (err, results: Object[], fields) => {
            if (err) {
                console.log('Error en query(): ', err);
                return callback(err);
            }

            console.log('> Instrucción ejecutada');
            callback(null, results);

            this.desconectarDB();
        });
    }

    public static ejecutarQueryAndValues(query: string, values: any, callback: Function) {
        this.conectarDB();
        this.cnx.query(query, values, (err, results: Object[], fields) => {
            if (err) {
                console.log('Error en query(): ', err);
                return callback(err);
            }

            console.log('> Instrucción ejecutada');
            callback(null, results);
        });

        this.desconectarDB();
    }

    static inicializarDB() {
        console.log('> Clase inicializada');
        this.cnx = mysql.createConnection({
            host: 'mi3-wts6.a2hosting.com',
            user: 'amini_root',
            password: 'Createk.2018',
            database: 'aminias1_bdcotizacion'
        });
    }

    static conectarDB() {
        this.inicializarDB();        
        this.cnx.connect((err: mysql.MysqlError) => {
            if (err) {
                console.log('> Error en connect(): ', err.message);
                return;
            }

            console.log('> Conectado a Base de datos');
        });
    }

    static desconectarDB() {
        this.cnx.end((err: mysql.MysqlError) => {
            if (err) {
                console.log('> Error in end(): ', err.message);
            }            
            console.log('> Desconectado de Base de datos');
            this.inicializarDB();
        });
    }
}
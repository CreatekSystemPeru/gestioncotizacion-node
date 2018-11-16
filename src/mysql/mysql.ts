import mysql = require('mysql');

export default class MySQL {
    private static _instance: MySQL;

    cnx: mysql.Connection;
    conectado: boolean = false;

    constructor() {
        console.log('Clase inicializada');
        this.cnx = mysql.createConnection({
            host: 'mi3-wts6.a2hosting.com',
            user: 'amini_sa',
            password: 'Createk.2018',
            database: 'aminias1_bdcotizacion'
        });
        this.conectarDB();
        this.errorConexionDB();
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    static ejecutarQuery(query: string, callback: Function) {
        this.instance.cnx.query(query, (err, results: Object[], fields) => {
            if (err) {
                console.log('Error en query: ', err);
                return callback(err);
            }

            if (results.length === 0) {
                callback('El registro solicitado no existe');
            } else {
                callback(null, results);
            }
        });
    }

    private inicializar() {
        console.log('Clase inicializada');
        this.cnx = mysql.createConnection({
            host: 'mi3-wts6.a2hosting.com',
            user: 'amini_sa',
            password: 'Createk.2018',
            database: 'aminias1_bdcotizacion'
        });
    }

    private conectarDB() {
        this.cnx.connect((err: mysql.MysqlError) => {
            if (err) {
                console.log('Error in conectarDB(): ', err.message);                
                return;
            }

            this.conectado = true;
            console.log('Base de datos online');
        });
    }

    private errorConexionDB() {
        this.cnx.on('error', (err) => {            
            if (err.code == 'PROTOCOL_CONNECTION_LOST') {
                console.log('Conexión finalizada. Reiniciando...');
                this.inicializar();
                this.conectarDB();
                this.errorConexionDB();
                return;
            }

            console.log('Error en errorConexionDB(): ', err);
        });
    }
}
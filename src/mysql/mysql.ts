import mysql = require('mysql');

export default class MySQL {
    private static _instance: MySQL;

    cnx: mysql.Connection;

    constructor() {
        console.log('> Clase inicializada *');
        this.cnx = mysql.createConnection({
            host: 'mi3-wts6.a2hosting.com',
            user: 'amini_root',
            password: 'Createk.2018',
            database: 'aminias1_bdcotizacion'
        });
    }

    public static get instance() {
        return (this._instance = new this());
    }

    static conexionDB(query: string, values: any, callback: Function) {
        console.log('**************** Iniciando conexión ****************');        
        let conn = this.instance;
        conn.cnx.connect((err: mysql.MysqlError) => {
            if (err) {
                console.log('> Error en connect(): ', err.message);
                return callback(err);
            }

            console.log('> Conectado a Base de datos');
            conn.cnx.query(query, values, (err, results: Object[], fields) => {
                if (err) {
                    console.log('Error en query(): ', err.message);
                    return callback(err);
                }
                
                console.log('> Instrucción ejecutada: ', (query.includes('Autentication') ? 'CALL Usuario_Autenticaction(*,*,*)' : query));
                conn.cnx.end((err: mysql.MysqlError) => {
                    if (err) {
                        console.log('> Error in end(): ', err.message);
                        return callback(err);
                    }

                    console.log('> Desconectado de Base de datos');
                    console.log('**************** Fin de la conexión ****************');
                    return callback(null, results);
                });
            });
        });
    }

    public static ejecutarQuery(query: string, values: any, callback: Function) {
        this.conexionDB(query, values, (err: any, results: any) => {
            if (err) {
                return callback(err);    
            }

            callback(null, results);
        });
    }
}
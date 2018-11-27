import mysql = require('mysql');

export default class MySQL {
    cnx: mysql.Connection;

    constructor() {
        console.log('> Clase inicializada *');
        this.cnx = mysql.createConnection({
            host: '192.168.1.12',
            user: 'sa',
            password: '12345678',
            database: 'bdcotizacion'
        });
    }

    static conexionDB(query: string, values: any, callback: Function) {
        console.log('**************** Iniciando conexión ****************');
        const conn = new this();
        conn.cnx.connect((err: mysql.MysqlError) => {
            if (err) {
                console.log('> Error en connect(): ', err.message);
                return callback(err);
            }

            console.log('> Conectado a Base de datos');
            conn.cnx.query(query, values, (err, results: Object[], fields) => {
                if (err) {
                    console.log('Error en query(): ', err.message);
                    console.log('> Desconectado de Base de datos');
                    console.log('**************** Fin de la conexión ****************');
                    conn.cnx.destroy();
                    return callback(err);
                }
                
                console.log('> Instrucción ejecutada: ', (query.includes('Autentication') ? 'CALL Usuario_Autenticaction(*,*,*)' : query));
                
                console.log('> Desconectado de Base de datos');
                console.log('**************** Fin de la conexión ****************');
                conn.cnx.destroy();

                return callback(null, results);
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
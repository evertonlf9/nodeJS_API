/**
 * Created by everton.ferreira on 20/10/2017.
 */
const mysql = require('mysql');
let conn = null;

class mysqlConnection{

    constructor(){}

    static connect(config){
        conn =  mysql.createConnection(config);
        conn.connect((err) => {
            if (err) {
                console.error('error connecting: ' + err.stack);
                return;
            }
            console.log('connected mysql as id ' + conn.threadId);
        });
    }

    static query(sql, args){
        return new Promise( ( resolve, reject ) => {
            conn.query( sql, args, ( err, rows ) => {
                if ( err )
                    return reject( err );
                resolve( rows );
            } );
        } );
    }

    static close() {
        return new Promise( ( resolve, reject ) => {
            conn.end( err => {
                if ( err )
                    return reject( err );
                resolve();
            } );
        } );
    }

    static getConn(){
        return conn;
    }
}

module.exports = mysqlConnection;
/**
 * Created by everton.ferreira on 27/09/2017.
 * sql server configuration manager: HABILITAR TCP/IP
 * Painel de controle - ferramentas administrativas - serviços e habilitar: SQL Server Browser
 */

'use strict';
const sql = require('mssql');
var connection = null;

const dbConfigSqlServer = {

    user: 'evertonlf',
    password: '123456789',

    //user: 'MSTECH\\everton.ferreira',
    //password: '',
    //domain:'mstech',
    server: 'MS-D2222\\SQLEXPRESS',
    database: 'DEV_SeloEstacionamento',
    options: {
        instanceName: 'SQLEXPRESS',
        trustedConnection: true,
        encrypt: false // Use this if you're on Windows Azure
    }
};

class sqlServerConnect {

    contructor() {}

    static connect() {
        connection = new sql.ConnectionPool(dbConfigSqlServer);
        sql.on('error', this.Error);
    }

    Error(err) {
        console.log('error', err.message);
    }

    static getConn (){
        return  connection
    }
}
module.exports = sqlServerConnect;
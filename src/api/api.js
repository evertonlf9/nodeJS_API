/**
 * Created by everton on 21/05/2018.
 */

const mongoAPI = require('./mongo.routes.js');
const mysqlAPI = require('./mysql/mysql.routes.js');
const sqlServerAPI = require('./sqlServer.routes.js');

class api{
    contructor(){}

    static createAPI(app, cors, corsOptions, logger, dataBaseMySql, conn2){
        
        mongoAPI.apis(app, cors, corsOptions, logger);
        mysqlAPI.apis(app, cors, corsOptions, logger, dataBaseMySql);
        sqlServerAPI.apis(app, cors, corsOptions, logger, conn2);

        //app.get('/', cors(corsOptions), (req, res) => {
        //    res.send('Hello World!');
        //});

        //app.get('/help', cors(corsOptions), (req, res) => {
        //    res.send('Hello World!');
        //});
    }
}
module.exports = api;
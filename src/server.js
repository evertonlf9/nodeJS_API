/**
 * Created by everton.ferreira on 21/05/2018.
 */
//import modulos
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const morgan = require('morgan');
const winston = require('winston');
const authenticateRoutes = require('./api/authenticate.routes');

//import conexão com os bancos de dados
const sqlServer  = require('./connection/sqlServerConnect');
const mongo = require('./connection/mongoConnnect');
const mysql = require('./connection/mysqlConnect');

const api = require('./api/api');

const app = express();
const apiRoutes = express.Router(); // Obter uma instância do roteador para rotas api

const port = process.env.PORT || 3000; //configura a porta do servidor
const corsList = ['http://localhost:63342', 'http://localhost:4200', 'http://localhost:8000', 'http://localhost:8001']; // lista de exeção do cors
const secret = 'teste1';

const http = require('http');
const server = http.Server(app);

const socketIO = require('socket.io');
const io = socketIO(server);

const configConnMysql = {
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'dev_test'
};

const corsOptions = {
    origin: (origin, callback) => {
        if (corsList.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback('error')
        }
    }
};

/**************************Connection DataBases***************************/
// mongo.connect();
mysql.connect(configConnMysql);
// sqlServer.connect();

/**************************Configuration***************************/

app.set('superSecret', secret);
// Use analisador corpo para que possamos obter informações de POST e / ou parâmetros de URL
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Utilizar morgan a pedidos para o console log
app.use(morgan('dev'));

// get all data/stuff of the body (POST) parameters
// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

/**************************CREATE LOGS ERRORS***************************/

const logger = new (winston.Logger)({
    transports: [
        new (winston.transports.File)({
            name: 'info-file',
            filename: 'server-info.log',
            level: 'info'
        }),
        new (winston.transports.File)({
            name: 'error-file',
            filename: 'server-error.log',
            level: 'error'
        })
    ]
});

//Examples
// logger.log('info', 'Hello distributed log files!'); || logger.info('Hello again distributed logs');
// logger.log('error', 'Hello distributed log files!'); || logger.error('Hello again distributed logs');

/**************************SOCKET.IO***************************/

io.on('connection', (socket) => {
    console.log('user connected');
});

/**************************AUTHENTICATE E ROUTERS***************************/
authenticateRoutes.authenticate(app, cors, corsOptions, apiRoutes, secret, logger, mysql);

app.use(cors());
// app.use(fileUpload());
app.use('/api', apiRoutes);  // Aplicar as rotas para a nossa aplicação com o prefixo / api

api.createAPI(app, cors, corsOptions, logger, mysql, sqlServer.getConn());

app.listen(port, () => {
    console.log('app listening on port ' + port);
});
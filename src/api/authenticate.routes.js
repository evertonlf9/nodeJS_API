/**
 * Created by everton.ferreira on 21/05/2018.
 */
const Users = require('../models/user.models');
const jwt = require('../services/token');
const errorHandling = require('../services/errorhandling');

class authenticateRoutes{

	contructor(){}

	static mongoAuthenticate(req, res, app, logger, secret){
		const self = this;
		Users.findOne({ email: req.body.email }, (err, user) => {
			if (err){
				errorHandling.error(res, 401, logger, err);
				throw err;
			}
			self.resultAuthenticate(req, res, user, app, secret, logger);
		});
	}

	static resultAuthenticate(req, res, result ){
		if(result && result.password == req.body.password && result.login == req.body.email){
			res.json({key: jwt.generateToken(req, result, this.app, this.secret ), user: result});
		}else{
			if (!result) {
				errorHandling.error(res, 500, this.logger);
			}else{
				errorHandling.error(res, 401, this.logger);
			}
		}
	}

	static mysqlAuthenticate(req, res){

		const sql = "SELECT * FROM `usuarios` WHERE login = '" + req.body.email.toString() + "' AND active = 1";
		const self = this;

		this.dataBase.query(sql).then(rows => {
			let result = rows[0];
			self.resultAuthenticate(req, res, result);
		}).catch( err => {
			errorHandling.error(res, 401, self.logger, err);
		});
	}
	
	static authenticate(_app, cors, corsOptions, apiRoutes, _secret, _logger, _dataBase){

		this.app = _app;
		this.secret = _secret;
		this.logger = _logger;
		this.dataBase = _dataBase;

		apiRoutes.post('/authenticate', cors(corsOptions), (req, res) => {
			// find the user
			// this.mongoAuthenticate(req, res, app, logger, secret);
			this.mysqlAuthenticate(req, res);
		});


		apiRoutes.post('/accesses', cors(corsOptions), (req, res) => {
			// Verificar os parâmetros de cabeçalho ou URL ou parâmetros post para token de
			var token = req.headers.token || req.body.token || req.query.token || req.headers['x-access-token'];
			jwt.checkAuth(token, _app, (err, decoded) =>{
				if (err) {
					errorHandling.error(res, 401, _logger, err);
				} else {
					res.json({message: 'Authenticate token!'});
				}
			});
		});

		// Rota middleware para verificar um token
		apiRoutes.use((req, res, next) => {
			// Verificar os parâmetros de cabeçalho ou URL ou parâmetros post para token de
			var token = req.headers.token || req.body.token || req.query.token || req.headers['x-access-token'];

			if (token) {
				// Verifica secreto e verificações para autenticar símbolo
				jwt.checkAuth(token, _app, (err, decoded) =>{
					if (err) {
						errorHandling.error(res, 401, _logger, err);
					} else {
						req.decoded = decoded;
						next();
					}
				});
			} else {
				errorHandling.error(res, 500, _logger);
			}//else
		});
	}
}
module.exports = authenticateRoutes;
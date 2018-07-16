/**
 * Created by everton.ferreira on 21/05/2018.
 */
const routerUser = require('./mysql.user.route.js');
const routerPreferences = require('./mysql.preferences.route');
class mysqlAPI{

    constructor(){}

    static apis(app, cors, corsOptions, logger, dataBase){

        app.param('login', function(req, res, next, active) {
            req.login = login;
            next();
        });

        app.get("/api/user/findOne",cors(corsOptions), (req,res) => {
            const sql = "SELECT * FROM `usuarios` WHERE active = 1 and "+ req.params.login;
            routerUser.findOne(res, logger, sql, dataBase, req.body);
        });

        app.param('active', function(req, res, next, active) {
            req.active = active;
            next();
        });
        
        app.get("/api/user/getAll/:active",cors(corsOptions), (req,res) => {
            const sql = "SELECT * FROM `usuarios`  WHERE " + req.params.active;
            routerUser.getAll(res, logger, sql, dataBase);
        });

        app.post("/api/user/update",cors(corsOptions), (req,res) => {
            const sql = "UPDATE usuarios set name = '"+ req.body.name +"', email = '"+ req.body.email +"', password = '"+ req.body.password +"', isAdmin = '"+ req.body.isAdmin +"', active = '"+ req.body.active +"' WHERE login = '"+ req.body.login +"'";
            routerUser.execute(res, logger, dataBase, sql, "Dados do usuário atualizado com sucesso");
        });

        app.post("/api/user/create",cors(corsOptions), (req,res) => {
            routerUser.create(req, res, logger, dataBase);
        });

        app.post("/api/user/delete",cors(corsOptions), (req,res) => {
            const sql = "UPDATE usuarios set active = '"+ 0 +"' WHERE login = '"+ req.body.login +"'";
            routerUser.execute(res, logger, dataBase, sql, "Usuário deletado com sucesso!");
        });

        app.post("/api/user/exclude",cors(corsOptions), (req,res) => {
            const sql = "UPDATE usuarios set active = '"+ 0 +"' WHERE login = '"+ req.body.login +"'";
            routerUser.execute(res, logger, dataBase, sql, "Usuário deletado com sucesso!");
        });

        app.post("/api/preferences/update",cors(corsOptions), (req,res) => {
            const sql = "UPDATE usuarios set uiTema = '"+ req.body.uiTema +"', locale = '"+ req.body.locale +"' WHERE login = '"+ req.body.login +"'";
            routerPreferences.execute(res, logger, dataBase, sql, "Dados do sistema alterado com sucesso!");
        });
    }

    // static getCountRegisters(req, res, sql, sqlCount){
    //     let header = req.headers;
    //     let paginate = ' LIMIT '+ header.currentpage +',' + header.pagesize;
    //
    //     // sql += paginate;
    //     let msg = '';
    //     this.countQuery(res, sqlCount, sql, msg);
    // }

//     app.get("/api/filmes",cors(corsOptions), function(req,res) {
//     let sql = 'SELECT * FROM filmes'; //+ paginate;
//     let sqlCount = 'SELECT count(*) FROM filmes';
//     this.getCountRegisters(req, res, sql, sqlCount);
//     // locale = '"+ req.body.locale +"', uiTema = '"+ req.body.uiTema +"'
// });

}
module.exports = mysqlAPI;
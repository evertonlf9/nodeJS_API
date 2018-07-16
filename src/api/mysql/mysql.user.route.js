/**
 * Created by everton on 14/06/2018.
 */
const errorHandling = require('../../services/errorhandling');
class User {

    constructor() {}

    static update(res, logger, sql, dataBase){
        dataBase.query(sql).then(rows => {
            res.json(rows);
        }).catch( err => {
            errorHandling.error(res, 401, logger, err);
        });
    }

    static findOne(res, logger, sql, dataBase, param){
        dataBase.query(sql).then(rows => {
            let result = row[0];
            if(result && result.login == param){
                res.json(result);
            }else{
                this.handlerError(result, res, logger);
            }
        }).catch( err => {
            errorHandling.error(res, 401, logger, err);
        });
    }

    static getAll(res, logger, sql, dataBase){
        dataBase.query(sql).then(rows => {
            if(rows){
                res.json(rows);
            }else{
                this.handlerError(rows, res, logger);
            }
        }).catch( err => {
            errorHandling.error(res, 401, logger, err);
        });
    }

    static create(res, logger, dataBase, params){
        let sql = "SELECT * FROM `usuarios` WHERE active = 1 and login = '" + params.login.toString() + "'";

        this.find(res, sql, dataBase, (result)=>{
            if(result){
                res.status(401).send({message: "Esse login já esta sendo usado"});
                return;
            }
            sql = "INSERT INTO usuarios (name, email, login, password, active, locale, uiTema, isAdmin) VALUES ('"+ params.name +"', '"+ params.email +"', '"+ params.login +"', '"+ params.password +"', '"+ 1 +"', '"+ params.locale +"', '"+ params.uiTema +"', '"+ params.isAdmin +"')";
            dataBase.query(sql).then(rows => {
                res.json(rows);
            }).catch( err => {
                errorHandling.error(res, 401, logger, err);
            });
        });
    }

    static execute(res, logger, dataBase, sql, _menssage = ""){
        console.log(sql);
        dataBase.query(sql).then(rows => {
            res.json({menssage: _menssage});
        }).catch( err => {
            errorHandling.error(res, 401, logger, err);
        });
    }

    static find(res, sql, mysql, callback){
        mysql.query(sql).then(rows => {
            if(rows.length > 0){
                callback(true);
            }else{
                callback(false);
            }
        }).catch( err => {
            errorHandling.error(res, 401, logger, err);
        });
    }

    static handlerError(result, res, logger){
        if (!result) {
            errorHandling.error(res, 500, logger);
        }else{
            errorHandling.error(res, 401, logger);
        }
    }
}
module.exports = User;
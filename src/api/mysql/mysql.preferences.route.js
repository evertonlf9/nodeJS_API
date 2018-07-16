/**
 * Created by everton on 14/06/2018.
 */
const errorHandling = require('../../services/errorhandling');
class Preferences {

    constructor() {}

    static execute(res, logger, dataBase, sql, _message = null){
        dataBase.query(sql).then(rows => {
            res.json({message: _message});
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
module.exports = Preferences;
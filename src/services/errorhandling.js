/**
 * Created by everton on 21/05/2018.
 */
class errorHandling{

    contructor(){}

    static error (res, numError, logger, error = ''){
        let message = {error: ''};
        switch (numError){
            case 301:
                message = { error: 'Moved Permanently!' };
            break;
            case 401:
                message = { error: 'Authentication failed. Wrong password!' };
            break;
            case 403:
                message = { error: 'Forbidden: “Você não tem autorização para visualizar este arquivo”!' };
            break;
            case 404:
                message = { error: 'Not Found!' };
            break;
            case 500:
                message = {error: 'Authentication failed. User account has been deleted!'};
            break;
            default:
                
            break;
        }
        logger.error('Code:' + numError + ' - ' + message.error + error);
        res.status(numError).send(message);
    }
}
module.exports = errorHandling;
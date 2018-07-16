/**
 * Created by everton.ferreira on 27/09/2017.
 */
const jwtoken = require('jsonwebtoken'); // used to create, sign, and verify tokens

'use strict';
class jwt{

    contructor(){}

    /**
     *
     * @param req
     * @param user
     * @param app
     * @param superSecret
     * @returns {*}
     */
    static generateToken (req, user, app){
        return  jwtoken.sign({
            auth:  user,
            agent: req.headers['user-agent'],
            exp:   Math.floor(new Date().getTime()/1000) + 7*24*60*60 // Note: in seconds!
        }, app.get('superSecret'));  // secret is defined in the environment variable JWT_SECRET
    }

    /**
     *
     * @param req
     * @param res
     * @param user
     * @param app
     * @param superSecret
     * @returns {*}
     */
    static validate(req, res, user, app) {

        var token = req.headers.authorization;
        try {
            var decoded = jwtoken.verify(token, app.get('superSecret'));
        } catch (e) {
            return authFail(res);
        }
        if(!decoded || decoded.auth !== user) {
            return authFail(res);
        } else {
            return privado(res, token);
        }
    }

    /**
     *
     * @param user
     * @param app
     * @param time
     * @param superSecret
     * @returns {*}
     */
    static saveUserToken (user, app,  time){
        // create a token e salva o usuário dentro do token
        return jwtoken.sign(user, app.get('superSecret'), {
            expiresInMinutes: time // expires in 30 min
        });
    }

    static checkAuth(token, app, callback) {
        jwtoken.verify(token, app.get('superSecret'), callback);
    }
}

module.exports = jwt;
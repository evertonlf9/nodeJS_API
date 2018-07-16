/**
 * Created by everton.ferreira on 21/05/2018.
 */
'use strict';
const mongoose = require('mongoose');
const urlMongoDB = 'mongodb://localhost:27017/dev_v1';

class connectionMondoDB{

    contructor(){ }

    static connect (){
        const db = mongoose.connection;
        mongoose.connect(urlMongoDB, { useMongoClient: true });

        db.on('error', console.error);
        db.on('open', function() {
            console.log("conectado ao banco de dados mongoDB");
        });
    }
}

module.exports = connectionMondoDB;
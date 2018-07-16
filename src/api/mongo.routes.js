/**
 * Created by everton.ferreira on 21/05/2018.
 */
const Users = require('../models/user.models');

class mongoAPI{
    
    constructor(){}

    configPaginate(req){
        this.limit = parseInt(req.headers['pagesize']);
        this.page = parseInt(req.headers['currentpage']);
        this.count = null;
    }

    static apis(app, cors, corsOptions, logger){

        app.get('/api/users', cors(corsOptions), (req, res) => {

            this.configPaginate(req);

            Users.find().count(function(err, _count) {
                this.count = _count;
                Users.find(function(err, result) {
                    if (err) res.send(err);
                    res.setHeader('X-RecordsCount', this.count);
                    res.json({ success: true, message:"", response: result});
                }).sort({ point: -1 }).limit(this.limit).skip( this.page * this.limit);

            });
        });
    }
}
module.exports = mongoAPI;
/**
 * Created by everton.ferreira on 21/05/2018.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const usersSchema   = new Schema({
    name:  String,
    curso:  String,
    point: Number,
    admin: Boolean,
    email: String,
    password: String
});
module.exports = mongoose.model('users', usersSchema);
"use strict";

const jwt = require('jwt-simple');
const bcrypt = require('bcrypt');

const db = require('./db');
const users = db.sublevel('users');

const tokenSecret = 'SHHH!';

exports.login = (username, password, callback) => {
    console.log(`receive username: ${username}, password: ${password}`);
    users.get(username, (err, user) => {
        if(err) return callback(err);

        return bcrypt.compare(password, user.hash, (err, res) => {
            if(err) return callback(err);
            if(!res) return callback(new Error('Invalid password'));

            let token = jwt.encode({
                username: username,
                expire: Date.now() + (1000 * 60 * 60) //1 hour
            }, tokenSecret);

            return callback(null, token);
        });
    });
};

exports.checkToken = (token, callback) => {
    console.log(`receive token: ${token}`);
    let userData;
    try {
        //jwt.decode will throw if the token is invalid
        userData = jwt.decode(token, tokenSecret);
        if (userData.expire <= Date.now()) {
            throw new Error('Token expired');
        }
    } catch(err) {
        return process.nextTick(callback.bind(null, err));
    }

    return users.get(userData.username, (err, user) => {
        if (err) return callback(err);
        return callback(null, {username: userData.username});
    });
};

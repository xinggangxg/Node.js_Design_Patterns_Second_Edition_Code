"use strict";

const authService = require('./authService');

exports.login = (req, res, next) => {
    console.log(`receive req body: ${JSON.stringify(req.body)}`);
    authService.login(req.body.username, req.body.password, (err, result) => {
        if (err) {
            return res.status(401).send({
                ok: false,
                error: 'Invalid username/password'
            });
        }
        res.status(200).send({ok: true, token: result});
    });
};

exports.checkToken = (req, res, next) => {
    console.log(`receive req: ${req}`);
    authService.checkToken(req.query.token, (err, result) => {
        if (err) {
            return res.status(401).send({
                ok: false,
                error: 'Token is invalid or expired'
            });
        }
        res.status(200).send({ok: 'true', user: result});
    });
};

exports.test = (req, res, next) => {
    console.log(`test: receive req: ${req}`);
    res.status(200).send({ok: 'true'});
};

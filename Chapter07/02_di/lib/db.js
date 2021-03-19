"use strict";

const level = require('level');
const sublevel = require('level-sublevel');

module.exports = function(dbName) {
    console.log(`init db instance`);
    return sublevel(
        level(dbName, {valueEncoding: 'json'})
    );
};

"use strict";

const level = require('level');
const sublevel = require('level-sublevel');

module.exports = (dbName) => {
  console.log(`factory return instance of db`);
  return sublevel(
    level(dbName, {valueEncoding: 'json'})
  );
};

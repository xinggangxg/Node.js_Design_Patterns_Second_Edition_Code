"use strict";

const level = require('level');
const sublevel = require('level-sublevel');

module.exports = (serviceLocator) => {
  const dbName = serviceLocator.get('dbName');

  console.log(`return instance of db`);
  return sublevel(
    level(dbName, {valueEncoding: 'json'})
  );
};

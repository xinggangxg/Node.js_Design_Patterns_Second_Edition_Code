"use strict";

const fnArgs = require('parse-fn-args');

module.exports = () => {
    const dependencies = {};
    const factories = {};
    const diContainer = {};

    diContainer.factory = (name, factory) => {
        factories[name] = factory;
    };

    diContainer.register = (name, dep) => {
        dependencies[name] = dep;
    };

    diContainer.get = (name) => {
        console.log(`di: trying to get deps: ${name}`);
        if (!dependencies[name]) {
            console.log(`di: not found`);
            const factory = factories[name];
            console.log(`di: got factory of ${name}`);
            dependencies[name] = factory &&
                diContainer.inject(factory);
            if (!dependencies[name]) {
                throw new Error('Cannot find module: ' + name);
            }
        }
        console.log(`di: returns deps: ${name}`);
        return dependencies[name];
    };

    diContainer.inject = (factory) => {
        const args = fnArgs(factory)
              .map(function(dependency) {
                  console.log(`di inject: parsed dep: ${dependency}`);
                  return diContainer.get(dependency);
              });
        return factory.apply(null, args);
    };

    return diContainer;
};

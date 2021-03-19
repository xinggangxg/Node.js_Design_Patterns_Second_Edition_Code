"use strict";

module.exports = () => {
    const dependencies = {};
    const factories = {};
    const serviceLocator = {};

    serviceLocator.factory = (name, factory) => {
        console.log(`locator adds factory of ${name}`);
        factories[name] = factory;
    };

    serviceLocator.register = (name, instance) => {
        console.log(`locator adds directly deps of ${name}`);
        dependencies[name] = instance;
    };

    serviceLocator.get = (name) => {
        console.log(`locator is trying to get deps: ${name}`);
        if (!dependencies[name]) {
            console.log(`no deps found`);
            const factory = factories[name];
            console.log(`locator adding deps of ${name}`);
            dependencies[name] = factory && factory(serviceLocator);
            console.log(`locator added deps of ${name}`);
            if (!dependencies[name]) {
                throw new Error('Cannot find module: ' + name);
            }
        }
        console.log(`locator returns deps: ${name}`);
        return dependencies[name];
    };

    return serviceLocator;
};

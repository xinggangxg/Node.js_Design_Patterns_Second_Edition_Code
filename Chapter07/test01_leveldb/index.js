"use strict";

const level = require('level');
const sublevel = require('level-sublevel');

// 1) Create our database, supply location and options.
//    This will create or open the underlying store.
// var db = level('my-db');
var db = sublevel(level('my-db', {valueEncoding: 'json'}));
var sub = db.sublevel('stuff');

// 2) Put a key & value
db.put('name', 'Level', function (err) {
    if (err) return console.log('Ooops!', err); // some kind of I/O error

    // 3) Fetch by key
    db.get('name', function (err, value) {
        if (err) return console.log('Ooops!', err); // likely the key was not found

        // Ta da!
        console.log('name=' + value);
    })
})

sub.put('name', 'subLevel', function (err) {
    if (err) return console.log('Ooops!', err); // some kind of I/O error

    // 3) Fetch by key
    sub.get('name', function (err, value) {
        if (err) return console.log('Ooops!', err); // likely the key was not found

        // Ta da!
        console.log('name=' + value);
    })
})

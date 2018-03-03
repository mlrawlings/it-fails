const mocha = require('mocha');
const it = mocha.it;

it.fails = function() {
    let test = it.apply(this, arguments);
    test.shouldFail = true;
    return test;
}

require('./patch-runner');
require('./patch-base-reporter');
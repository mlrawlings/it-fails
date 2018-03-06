"use strict";

const mocha = require('mocha');
const it = mocha.it;
const suite = it('').parent; 
suite.tests.splice(0, 1);

suite.on('pre-require', (context) => {
    patchIt(context.it);
});

const patchIt = (it) => it.fails = function() {
    let test = it.apply(this, arguments);
    test.shouldFail = true;
    return test;
}

patchIt(it);

require('./patch-runner');
require('./patch-base-reporter');
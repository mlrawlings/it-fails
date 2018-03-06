const path = require('path');
const expect = require('chai').expect;
const run = require('node-run-cmd').run;
const fixture = (name) => path.join(__dirname, 'fixtures', name);
const mocha = path.join(__dirname, '..', 'node_modules', '.bin', 'mocha');
const test = async (name) => {
    let stdout = '';
    let codes = await run(`${mocha} ${fixture(name)}`, { onData:(d) => { stdout+=d } });
    return { stdout, code:codes[0] };
}

it('all', async () => {
    let { stdout, code } = await test('all.js');
    expect(code).to.equal(2);
    expect(stdout).to.contain('1 passing');
    expect(stdout).to.contain('1 skipped');
    expect(stdout).to.contain('just a demo');
    expect(stdout).to.contain('1 failing as expected');
    expect(stdout).to.contain('issue #765');
    expect(stdout).to.contain('Error: Expected');
    expect(stdout).to.contain('1 unexpectedly passing');
    expect(stdout).to.contain('issue #666');
    expect(stdout).to.contain('1 unexpectedly failing');
    expect(stdout).to.contain('Error: Unexpected');
    console.log(stdout);
});

it('expected-fail', async () => {
    let { stdout, code } = await test('expected-fail.js');
    expect(code).to.equal(0);
    expect(stdout).to.contain('0 passing');
    expect(stdout).to.contain('1 failing as expected');
    console.log(stdout);
});

it('unexpected-pass', async () => {
    let { stdout, code } = await test('unexpected-pass.js');
    expect(code).to.equal(1);
    expect(stdout).to.contain('0 passing');
    expect(stdout).to.contain('1 unexpectedly passing');
    console.log(stdout);
});

it('multiple', async () => {
    let { stdout, code } = await test('multiple/*.js');
    expect(code).to.equal(0);
    expect(stdout).to.contain('0 passing');
    expect(stdout).to.contain('2 failing as expected');
    console.log(stdout);
});
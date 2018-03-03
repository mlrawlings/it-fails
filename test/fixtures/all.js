// enable it.fails
require('../../src/index');

// the tests
it('pass', () => {});

it('unexpected fail', () => { 
    throw new Error('Unexpected') 
});

it.skip('skip').details = 'just a demo';

it.fails('expected fail', () => { 
    throw new Error('Expected') 
}).details = 'issue #765';

it.fails('unexpected pass', () => {}).details = 'issue #666';

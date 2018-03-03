require('../../src/index');

it.fails('expected fail', () => { 
    throw new Error('Expected') 
});

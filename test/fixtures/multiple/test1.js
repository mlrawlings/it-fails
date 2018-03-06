// enable it.fails
require('../../../src/index');

it.fails('someTest', () => { throw new Error('I knew this would fail') });
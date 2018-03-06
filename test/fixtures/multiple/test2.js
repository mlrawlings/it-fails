// enable it.fails
require('../../../src/index');

it.fails('someOtherTest', () => { throw new Error('I also knew this would fail') });
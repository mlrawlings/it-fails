require('../../src/index');
let assert = require('assert');

it.fails('expected fail', () => { 
    assert.deepEqual({ foo:123, bar:456, baz:789 }, { foo:123, bar:555, baz:789 });
});

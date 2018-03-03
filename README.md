# `it.fails()` - allow failing mocha tests

[![Build Status](https://travis-ci.org/mlrawlings/it-fails.svg?branch=master)](https://travis-ci.org/mlrawlings/it-fails)

```
npm install --save-dev it-fails
```

![image](https://user-images.githubusercontent.com/1958812/36939645-42c6308e-1ee9-11e8-9f9e-77adc571fd32.png)

## Why

[Similar to in ava](https://github.com/avajs/ava#failing-tests), you can use the `.fails` modifier to document issues with your code that need to be fixed. Failing tests are run just like normal ones, but they are expected to fail, and will not break your build when they do. If a test marked as failing actually passes, it will be reported as an error and fail the build.   Once a test is passing you can should remove the `.fails` modifier.

This allows you to merge failing tests before a fix is implemented without breaking CI. This is a great way to recognize good bug report PR's with a commit credit, even if the reporter is unable to actually fix the problem.

## Usage

Require the module, then use `it.fails` like you would `it.only` or `it.skip`.

```js
require('it-fails');

it.fails('a test that will fail', function() {
    throw new Error('oops')
});
```

## Additional features

The base reporter's epilogue is also overwritten by this module to show a summary that is aware of expected failures.  The epilogue now shows skipped tests in addition to failures.  

You can optionally set `test.details` (`test` is returned from `it`), which will display additional text when the test is printed out.  This can be used to display an issue associated with a failing test or the reason for a test being skipped.

## Demo

Run `npm run demo` to see the output from the screenshot above.  Also check out `npm run demo2` and `npm run demo3`.

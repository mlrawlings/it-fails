const path = require('path');
const mocha = require('mocha');
const ms = require('mocha/lib/ms');
const Base = mocha.reporters.Base;
const color = Base.color;
const colors = Base.colors;

colors['black'] = 30;
colors['white'] = 97;
colors['bright expected fail'] = 93;
colors['bright unexpected pass'] = 94;
colors['fail bg'] = 101;
colors['expected fail bg'] = 103;
colors['unexpected pass bg'] = 104;
colors['pending bg'] = 106;
colors['summary bg'] = 100;

Base.prototype.epilogue = function () {
  var stats = this.stats;
  var fmt;

  console.log();
  console.log();

  if (this.runner.tests) {
    var tests = this.runner.tests;
    if (tests.pending.length) {
      console.log(color('black', color('pending bg', ' SKIPPED ')));
      writeTests(tests.pending, 'pending');
    }
    if (tests.expectedFails.length) {
      console.log(color('black', color('expected fail bg', ' EXPECTED FAILURES ')));
      writeTests(tests.expectedFails, 'bright expected fail');
    }
    if (tests.unexpectedPasses.length) {
      console.log(color('white', color('unexpected pass bg', ' UNEXPECTED PASSES ')));
      writeTests(tests.unexpectedPasses, 'bright unexpected pass');
    }
    if (tests.unexpectedFails.length) {
      console.log(color('white', color('fail bg', ' UNEXPECTED FAILURES ')));
      writeTests(tests.unexpectedFails);
    }
  }


  console.log(color('white', color('summary bg', ' SUMMARY ')));
  console.log();

  // passes
  fmt = color('bright pass', ' ') +
    color('green', ' %d passing') +
    color('light', ' (%s)');

  console.log(fmt,
    stats.passes || 0,
    ms(stats.duration));

  // pending
  if (stats.pending) {
    fmt = color('pending', ' ') +
      color('pending', ' %d skipped');

    console.log(fmt, stats.pending);
  }

  // expected failures
  if (stats.expectedFailures) {
    fmt = color('bright expected fail', '  %d failing as expected');

    console.log(fmt, stats.expectedFailures);
  }

  if (stats.unexpectedPasses) {
    fmt = color('bright unexpected pass', '  %d unexpectedly passing');

    console.log(fmt, stats.unexpectedPasses);
  }

  // failures
  if (stats.failures) {
    fmt = color('fail', '  %d unexpectedly failing');

    console.log(fmt, stats.failures);
  }

  console.log();
};

function writeTests(tests, detailsColor) {
    console.log();
    tests.forEach((test, i) => {
        var testTitle = getTitleOutput(test);
        var err = test.err;

        console.log(color('error title', `  ${(i + 1)}) ${testTitle}`));
        if (test.details) console.log(color(detailsColor, `     ${test.details}`));

        if (err) {
            try {
            var errText = getErrorOutput(err);
            } catch(e) {
                console.log(e);
                throw e;
            }
            console.log(color('error message', `     ${errText.msg}`));
            console.log(color('error stack', errText.stack));
        } else {
            console.log(color('error stack', `     ${path.relative(process.cwd(), test.file)}`));
        }
        
        console.log();
    });
    console.log();
}

function getTitleOutput(test) {
    var testTitle = '';
    test.titlePath().forEach(function (str, index) {
        if (index !== 0) {
            testTitle += '\n     ';
        }
        for (var i = 0; i < index; i++) {
            testTitle += '  ';
        }
        testTitle += str;
    });
    return testTitle;
}

function getErrorOutput(err) {
    var msg;
    var message;
    if (err.message && typeof err.message.toString === 'function') {
      message = err.message + '';
    } else if (typeof err.inspect === 'function') {
      message = err.inspect() + '';
    } else {
      message = '';
    }
    var stack = err.stack || message;
    var index = message ? stack.indexOf(message) : -1;

    if (index === -1) {
      msg = message;
    } else {
      index += message.length;
      msg = stack.slice(0, index);
      // remove msg from stack
      stack = stack.slice(index + 1);
    }

    // uncaught
    if (err.uncaught) {
      msg = 'Uncaught ' + msg;
    }

    // indent stack trace
    stack = stack.replace(/^/gm, '  ');

    return { msg, stack };
}

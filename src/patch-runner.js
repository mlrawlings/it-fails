const mocha = require('mocha');
const Runner = mocha.Runner;
const grep = Runner.prototype.grep;


// grep is called from the constructor
// so this is additional construction code
Runner.prototype.grep = function() {
    this.tests = {
        unexpectedPasses: [],
        unexpectedFails: [],
        expectedFails: [],
        pending: []
    }
    this.on('pass', (test) => {
        if (test.shouldFail) {
            this.failures++;
            if (this.stats) {
                this.stats.unexpectedPasses = this.stats.unexpectedPasses || 0;
                this.stats.unexpectedPasses++;
                this.stats.passes--;
            }
            this.tests.unexpectedPasses.push(test);
        }
    });
    this.on('fail', (test, err) => {
        if (test.shouldFail) {
            this.failures--;
            if (this.stats) {
                this.stats.expectedFailures = this.stats.expectedFailures || 0;
                this.stats.expectedFailures++;
                this.stats.failures--;
            }
            this.tests.expectedFails.push(test);
        } else {
            this.tests.unexpectedFails.push(test);
        }
    });
    this.on('pending', (test) => {
        this.tests.pending.push(test);
    });
    return grep.apply(this, arguments);
}
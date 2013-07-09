var jscoverage = require('jscoverage');
jscoverage.enableCoverage(true);
var binders = jscoverage.require(module, '../lib/binders');
var coveralls = require('coveralls');

exports.fullObjBinding = function(test) {
    test.expect(4);
    var testObj = {
        foo: "bar",
        hello: "world",
        setFoo: function(val) {
            this.foo = val;
        },
        getHello: function() {
            return this.hello;
        },
        whatIsThis: function() {
            return this;
        }
    };
    var boundObj = binders(testObj);
    test.equal(Object.keys(boundObj).length, 3, 'only the functions are passed through to the bound object');
    boundObj.setFoo('baz');
    test.equal(testObj.foo, 'baz', 'the value is properly set on the original object');
    test.equal(boundObj.getHello(), 'world', 'the value is properly taken from the original object');
    test.equal(boundObj.whatIsThis(), testObj, 'this is equal to the original object');
    test.done();
};

exports.singleFuncBinding = function(test) {
    test.expect(2);
    var testObj = {
        foo: "bar",
        setFoo: function(val) {
            this.foo = val;
        }
    };
    var boundSetter = binders(testObj, 'setFoo');
    test.ok(boundSetter instanceof Function, 'the binder returned a single function');
    boundSetter('baz');
    test.equal(testObj.foo, 'baz', 'the bound function properly set the value on the original object');
    test.done();
};

exports.jscoverage = function(test) {
    test.expect(1);
    jscoverage.coverageDetail();
    var coverageStats = jscoverage.coverageStats();
    Object.keys(coverageStats).forEach(function(file) {
        test.equal(coverageStats[file].total, coverageStats[file].touched, 'All lines of code exercised by the tests');
    });
    if(process.env.TRAVIS) coveralls.handleInput(jscoverage.getLCOV());
    test.done();
};
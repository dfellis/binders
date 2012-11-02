var jscoverage = require('jscoverage');
var require = jscoverage.require(module);
var binders = require('../lib/binders', true);

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
	test.expect(2);
	var file, tmp, source, total, touched;
	for (var i in _$jscoverage) {
		test.ok(true, 'only one file tested by jscoverage');
		file = i;
		tmp = _$jscoverage[i];
		source = _$jscoverage[i].source;
		total = touched = 0;
		for(var n = 0, len = tmp.length; n < len; n++) {
			if(tmp[n] !== undefined) {
				total++;
				if(tmp[n] > 0) {
					touched++;
				} else {
					console.log(n + "\t:" + source[n-1]);
				}
			}
		}
		test.equal(total, touched, 'All lines of code touched by test suite');
	}
	test.done();
};
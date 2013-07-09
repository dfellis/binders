# binders

Creates "binders" full of bound methods.

## Install

    npm install binders

Or, if you want to use it in the browser, simply copy the `binders.min.js` from the `/lib` directory.

## Usage

```js
var binders = require('binders');

// A test object with some values and functions
var testObj = {
	hello: "world",
	foo: "bar",
	setHello: function(val) {
		this.hello = val;
	},
	setFoo: function(val) {
		this.foo = val;
	},
	whatIsThis: function() {
		return this;
	}
};

// Create a bound object from the test object
var boundObj = binders(testObj);

boundObj.whatIsThis(); // Returns `testObj`
boundObj.setHello("everybody"); // testObj.hello === "everybody"
boundObj.hello; // `undefined`

// Create a bound function from the test object
var boundFoo = binders(testObj, 'foo');
boundFoo('baz'); // testObj.foo === 'baz'
```

## What is this good for?

A new object with all of the methods (and its prototype's methods, and prototype's prototype's, etc) where `this` is bound to the original object. This is useful when you want to pass the methods of an object around without the actual object itself, but still have those methods act on their parent object.

You would want to do this with functional-style libraries, such as [queue-flow](http://dfellis.github.com/queue-flow):

```js
var q = require('queue-flow');
var l = require('lambda-js');
var binder = require('binder');
var http = require('http');

http.get('http://somewebsite.com', function(res) {
	var localQ = q.ns();
	res.on('data', binders(localQ('process'), 'push'));
	res.on('end', binders(localQ('process'), 'close'));
	localQ('process').reduce(l('sum, cur', 'sum+cur'), q('continue'), '');
});

q('continue')... // Work on entire body of data here
```

## License (MIT)

Copyright (C) 2012-2013 by David Ellis

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

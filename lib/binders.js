function binder(obj, funcName) {
	if(typeof(funcName) === 'string') {
		return obj[funcName].bind(obj);
	} else {
		var outObj = {};
		for(var key in obj) {
			if(obj[key] instanceof Function) outObj[key] = obj[key].bind(obj);
		}
		return outObj;
	}
}

if(module && module.exports) module.exports = binder;
function binders(obj, funcName) {
	if(typeof(funcName) === 'string') {
		return obj[funcName].bind(obj);
	} else {
		var outObj = {};
        var allKeys = [];
        for(var key in obj) allKeys.push(key);
        allKeys.forEach(function(key) {
			if(obj[key] instanceof Function) {
                outObj[key] = obj[key].bind(obj);
            } else {
                Object.defineProperty(outObj, key, {
                    get: function() { return obj[key]; },
                    set: function(val) { obj[key] = val; }
                });
            }
		});
		return outObj;
	}
}

if(module && module.exports) module.exports = binders;
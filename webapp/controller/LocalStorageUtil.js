sap.ui.define([], function() {
    //"use strict";
    var LocalStorageUtil = function(sName) {
        this.name = sName;
    };

    LocalStorageUtil.prototype = (function() {
        var storage = window.localStorage;

        return {
            get: function () {
				return JSON.parse(storage.getItem(this.name));
			},
			set: function (data) {
				storage.setItem(this.name, JSON.stringify(data));
				return this; // for method chaining <- 얘 역할?
			},
			remove: function () {
				storage.removeItem(this.name);
				return this; // for method chaining
			},
			isEmpty: function () {
				return !(this.get());
			}
        }
	})();
	
	return LocalStorageUtil;
});
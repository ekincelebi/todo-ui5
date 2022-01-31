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
				return this; 
			}
        }
	})();
	
	return LocalStorageUtil;
});
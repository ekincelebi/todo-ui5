sap.ui.define([], function() {
    //"use strict";
    var Storage = function(sName) {
        this.name = sName;
    };

    Storage.prototype = (function() {
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
	
	return Storage;
});
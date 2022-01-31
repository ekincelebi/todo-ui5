sap.ui.define([
    "sap/ui/core/ComponentContainer"

], function (ComponentContainer) {
	"use strict";

	new ComponentContainer({
		name: "sap.ui.ui5todo",
		settings: {
			id : "walkthrough"
		},
		async: true
	}).placeAt("content");

	
    
});
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "../model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
    "./LocalStorageUtil"
], function (Controller, JSONModel,formatter, Filter,FilterOperator,LocalStorageUtil) {
    "use strict";
    return Controller.extend("sap.ui.demo.walkthrough.controller.InvoiceList", {
        formatter: formatter,
        onInit: function() {

            
            var oViewModel = new JSONModel()
            this.store = new LocalStorageUtil("todos");

            var data = null;
            if(this.store.isEmpty()) {
                data = this.store.set({
                    todos: []
                }).get();
                oViewModel.setProperty("/", data);
            } else {
                data = this.store.get();
                oViewModel.setProperty("/todos", data);
            }
            
            this.getView().setModel(oViewModel)
        },

        onAddTask: function() {

            var oViewModel = this.getView().getModel()
            var aTodos = oViewModel.getData().todos;
            var sNewTodo = oViewModel.getProperty("/addTask");
            if(!sNewTodo.trim()) {
                return;
            }
            aTodos.push({
				id: jQuery.sap.uid(),
                done: false,
				text: sNewTodo
			});

            oViewModel.setProperty("/addTask", "");
            this.store.set(aTodo);

        },

        onFilterInvoices: function(oEvent) {
            // build filter array
			var aFilter = [];
			var sQuery = oEvent.getParameter("query");

            if (sQuery) {
				aFilter.push(new Filter("ProductName", FilterOperator.Contains, sQuery));
			}

            // filter binding
			var oList = this.byId("invoiceList");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
        }

    });
});
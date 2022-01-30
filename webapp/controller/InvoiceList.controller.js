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

            
            /*var oViewModel = new JSONModel( {
                minDate: new Date()
            });*/

            var oViewModel = new JSONModel();
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
            var priorityText = this.byId("priorityCombobox").getSelectedItem().getText();
            var dueDate = this.byId("datePicker").getValue();
            if(!sNewTodo.trim()) {
                return;
            }

            new Date().getTime();
            //var sTime = Math.floor(Date.now() / 1000);
            //var sTime = Date.now()
            var sTime = new Date(Date.now()).toISOString();
            aTodos.push({
				id: jQuery.sap.uid(),
                done: false,
				text: sNewTodo,
                time: sTime,
                priority: priorityText,
                due: dueDate
			});

            oViewModel.setProperty("/addTask");
            this.store.set(aTodos);

        },

        onTaskDone: function(oEvent) {
            var oViewModel = this.getView().getModel();
            var aTodos = oViewModel.getData().todos;
            var sPath = oEvent.getSource().getBindingContext().getPath();
            var iSelectedIndex = sPath.slice(-1);

            if(oEvent.getParameter("selected") === true) {
                aTodos[iSelectedIndex].done = true;
            } else {
                aTodos[iSelectedIndex].done = false;
            }

            oViewModel.refresh(true);
            this.store.set(aTodos);
        },

        getPriority: function(oContext) {
			return oContext.getProperty('priority');
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
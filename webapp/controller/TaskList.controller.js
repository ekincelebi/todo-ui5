sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "../model/formatter",
    "./LocalStorageUtil"
], function (Controller, JSONModel, formatter, LocalStorageUtil) {
    "use strict";
    return Controller.extend("sap.ui.demo.walkthrough.controller.TaskList", {
        formatter: formatter,
        oData : {
            "currentDate": new Date()
        },
        onInit: function() {
            var oViewModel = new JSONModel(this.oData);
            this.store = new LocalStorageUtil("todos");

            var data = null;
            if(!(this.store.get())) {
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
            var sPriority = this.byId("priorityCombobox").getSelectedItem().getText();
            var dDueDate = this.byId("datePicker").getValue();

            if(!sNewTodo.trim()) {
                return;
            }

            aTodos.push({
				id: jQuery.sap.uid(),
                isDone: false,
				text: sNewTodo,
                priority: sPriority,
                due: dDueDate
			});

            oViewModel.setProperty("/addTask");
            this.store.set(aTodos);

        },

        onDeleteTask: function(oEvent){
            var oViewModel = this.getView().getModel();
            var aTodos = oViewModel.getData().todos;
            var deleteId = oViewModel.getProperty("", oEvent.getSource().getBindingContext());
            
            jQuery.each(aTodos,function(iIndex, oEntry){

                if (oEntry == deleteId) {
                aTodos.splice(iIndex, 1);
                return false;
                }
            });
        oViewModel.setData(oViewModel.getData());
        this.store.set(aTodos);
        },

        onTaskDone: function(oEvent) {
            var oViewModel = this.getView().getModel();
            var aTodos = oViewModel.getData().todos;
            var sPath = oEvent.getSource().getBindingContext().getPath();
            var iSelectedIndex = sPath.slice(-1);

            if(oEvent.getParameter("selected") === true) {
                aTodos[iSelectedIndex].isDone = true;
            } else {
                aTodos[iSelectedIndex].isDone = false;
            }

            oViewModel.refresh(true);
            this.store.set(aTodos);
        },

        getPriority: function(oContext) {
			return oContext.getProperty('priority');
		},

    });
});
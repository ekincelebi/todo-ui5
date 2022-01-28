
sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel",
    "./controller/LocalStorageUtil"
 ], function (UIComponent,  JSONModel, ResourceModel, LocalStorageUtil) {
    "use strict";
    return UIComponent.extend("sap.ui.demo.walkthrough.Component", {
        metadata : {
            "interfaces": ["sap.ui.core.IAsyncContentCreation"],
            "manifest": "json"
        },

        init : function () {
            // call the init function of the parent
            UIComponent.prototype.init.apply(this, arguments);

            /*var oModel = new JSONModel()
            this.store = new LocalStorageUtil("todos");

            var data = null;
            if(this.store.isEmpty()) {
                data = this.store.set({
                    todos: []
                }).get();
                oModel.setProperty("/", data);
            } else {
                data = this.store.get();
                oModel.setProperty("/todos", data);
            }
            
            this.setModel(oModel)*/
            

            /**/
            
            
            
            // set data mode
            /*var oData = {
                task : ""
            };

            var oModel = new JSONModel(oData);
            this.setModel(oModel)*/
            
            // set i18n model on view
            var i18nModel = new ResourceModel({
                bundleName: "sap.ui.demo.walkthrough.i18n.i18n"
            });
            this.setModel(i18nModel, "i18n");
        }
    });
 });
 
 
sap.ui.define([], function () {
    "use strict";
    return {
        statusText: function (sStatus) {
            var resourceBundle = this.getView().getModel("i18n").getResourceBundle();
            switch (sStatus) {
                case true:
                    return resourceBundle.getText("taskStatusExpired");
                case false:
                    return resourceBundle.getText("taskStatusValid");
                default:
                    return resourceBundle.getText("taskStatusValid"); 
            }
        }
    };
});
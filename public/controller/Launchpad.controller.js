sap.ui.define(['jquery.sap.global', 'sap/ui/core/mvc/Controller', 'sap/m/MessageToast'],
	function(jQuery, Controller, MessageToast) {
	"use strict";

	var PageController = Controller.extend("eu.reitmayer.templog.ui.controller.App", {
		press : function(evt) {
			MessageToast.show("The GenericTile is pressed.");
        },
        navToRowData: function(evt) {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("home");
        }
	});

	return PageController;
});
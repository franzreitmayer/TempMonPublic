sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"../model/formatter"
], function(Controller, formatter) {
	"use strict";

	return Controller.extend("eu.reitmayer.templog.ui.controller.App", {

		formatter: formatter,

		onInit: function () {

		}

		,onRefresh: function() {
			var oComponent = this.getOwnerComponent();
			var oModel = oComponent.getModel();
			oModel.loadData("/api/sensor", false);
			
		}
	});
});
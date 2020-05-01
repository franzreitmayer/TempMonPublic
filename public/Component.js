sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"./model/models",
	"sap/ui/model/json/JSONModel"
], function(UIComponent, Device, models, JSONModel) {
	"use strict";

	return UIComponent.extend("eu.reitmayer.templog.ui.Component", {

		metadata: {
			manifest: "json"
		},

		createContent : function() {
			var oRootView = UIComponent.prototype.createContent.apply(this, arguments);
			var oJsonData = [
				{
					date_time: "2016-07-27T07:45:00Z",
					sensor_id: 1,
					temp: 34.2,
					humidity: 45.9
				},
				{
					date_time: "2016-07-27T07:45:00Z",
					sensor_id: 1,
					temp: 23.5,
					humidity: 55.2
				}
			];

			var oModel = new JSONModel();
			oModel.setData(oJsonData);

			this.setModel(oModel);
			
			return oRootView;
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// set the device model
			this.setModel(models.createDeviceModel(), "device");

			// create the views based on the url/hash
			this.getRouter().initialize();
		}
	});
});
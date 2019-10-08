sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"../model/formatter",
	"sap/m/MessageToast"
], function(Controller, formatter, MessageToast) {
	"use strict";

	return Controller.extend("sap.ui.demo.basicTemplate.controller.App", {

		formatter: formatter,

		onInit: function () {

		},
		onButtonPress : function(oEvent){
			var title = this.getView().getModel("sample").getProperty("/glossary/title");
			MessageToast.show("Hello!" + title);
		}

	});
});
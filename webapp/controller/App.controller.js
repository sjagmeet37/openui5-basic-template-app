sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/demo/basicTemplate/model/formatter",
	"sap/m/MessageToast"	
], function(Controller, formatter, MessageToast) {
	"use strict";

	return Controller.extend("sap.ui.demo.basicTemplate.controller.App", {

		formatter: formatter,

		onInit: function () {

		},
		acceptAndSignUp : function(oEvent){
			var firstName = this.getView().byId("firstName");
			var lastName = this.getView().byId("lastName");
			var fatherName = this.getView().byId("fatherName");
			var motherName = this.getView().byId("motherName");

			var streetNumber = this.getView().byId("streetNumber");
			var houseNumber = this.getView().byId("houseNumber");
			var zip = this.getView().byId("zipCode");
			var city = this.getView().byId("city");
			var errorTrue = 0;

			if (firstName.getValue() === ""){
				firstName.setValueState("Error");
				errorTrue+=1;
			} else {
				firstName.setValueState("Success");
			}

			if (lastName.getValue() === ""){
				lastName.setValueState("Error");
				errorTrue+=1;
			} else {
				lastName.setValueState("Success");
			}

			if (fatherName.getValue() === ""){
				fatherName.setValueState("Error");
				errorTrue+=1;
			} else {
				fatherName.setValueState("Success");
			}

			if (motherName.getValue() === ""){
				errorTrue+=1;
				motherName.setValueState("Error");
			} else {
				motherName.setValueState("Success");
			}

			if (streetNumber.getValue() === ""){
				errorTrue+=1;
				streetNumber.setValueState("Error");
			} else {
				streetNumber.setValueState("Success");
			}

			if (houseNumber.getValue() === ""){
				errorTrue+=1;
				houseNumber.setValueState("Error");
			} else {
				houseNumber.setValueState("Success");
			}

			if (zip.getValue() === ""){
				errorTrue+=1;
				zip.setValueState("Error");
			} else {
				zip.setValueState("Success");
			}

			if (city.getValue() === ""){
				errorTrue+=1;
				city.setValueState("Error");
			} else {
				city.setValueState("Success");
			}


			if (errorTrue > 0){
				MessageToast.show("Please re-enter values");
			} else {
				MessageToast.show("Sign-Up successful");
			}
		},
		navigateToHome : function(){

		}
	});
});
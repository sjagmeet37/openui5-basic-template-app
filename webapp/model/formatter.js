sap.ui.define([], function () {
	"use strict";
	return {
		isManufactured : function(isDiscontinued){
			
			var returnString = "";
			if (isDiscontinued === true){
				returnString = "Product Discontinued";
			} else {
				returnString = "Product Available";
			}
			return returnString;
		}
	};
});
$.response.contentType = "application/json";
$.response.status = 200;
$.response.contentType = "text/plain";

var destinationPackage = "CIAS_LEGACY_DATA_Update.xs-scripts";
var destinationName = "wf";

var allTransactionsobj = {};
var tenants = [];

/* stats  variables*/
var tenantCount = 0;
var startedCount = 0;
var terminatedCount = 0;
var compltedCount = 0;
var pushToDbCount = 0;
var pushToDbFailed = 0;
var totalTransactionCount = 0;
prepareMap={};

var transactionId;


function getStarted(skipRows) {
	try {
		var client = new $.net.http.Client();
		var ready = {};
		for (var i = 0; i < tenants.length; i++) {
			var urlQueryString = "/?status=RUNNING&$top=1000&$skip=" + skipRows + "&$orderby=id";
			var dest = $.net.http.readDestination(destinationPackage,
				destinationName);

			var req = new $.net.http.Request($.net.http.GET, urlQueryString);
			req.headers.set('x-bpm-app-user', 'I353212');
			req.headers.set('x-bpm-app-tenant','a53aaae74');
			client.request(req, dest);
			var response = client.getResponse();
			if (response.body) {
				ready[tenants[i]] = JSON.parse(response.body.asString());
				startedCount += ready[tenants[i]].length;
			}
		}
		allTransactionsobj.started = ready;
		client.close();
	} catch (e) {
		client.close();
		$.response.setBody("Failed to execute action: " + e.toString());
	}
}


function getContext() {

	try {
		var client = new $.net.http.Client();
		var transactionTypes = ["started"];
		for (var k = 0; k < 1; k++) {
			var type = transactionTypes[k];
			for (var i = 0; i < tenants.length; i++) {
				var txn = allTransactionsobj[type][tenants[i]];
				for (var j = 0; j < txn.length; j++) {

					var id = txn[j].id;
					var urlQueryString = "/" + id + "/context";
					var dest = $.net.http.readDestination(destinationPackage, destinationName);
					var req = new $.net.http.Request($.net.http.GET, urlQueryString);
					req.headers.set('x-bpm-app-user', 'I353212');
					req.headers.set('x-csrf-token', 'D315825026AF2FCEC25F64823CA69D1F');
					req.headers.set('x-bpm-app-tenant', tenants[i]);
					client.request(req, dest);
					var response = client.getResponse();
					if (response.body) {
						prepareMap.push({"id":id, "context":response.body.asString()});
						totalTransactionCount++;
					}
				}
			}
		}
		$.trace.info("INFO: finished process");
		client.close();
	} catch (e) {
		$.trace.error("ERROR: process failed" + e.message);
	}
}


function fnHandleGet(skipRows) {
	getStarted(0);
	getContext();
	$.response.setBody(prepareMap.asString());
}



fnHandleGet();
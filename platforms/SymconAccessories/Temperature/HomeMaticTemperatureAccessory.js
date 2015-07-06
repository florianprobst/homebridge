var async = require("async");
var symconGenericTemperature = require('./SymconGenericTemperatureAccessory.js');

function HomeMaticTemperatureAccessory(log, rpcClientOptions, instanceId, name, instance, instanceConfig) {
	log('creating HomeMaticTemperatureAccessory...');
	symconGenericTemperature.call(this, log, rpcClientOptions, instanceId, name, instance, instanceConfig);
};

HomeMaticTemperatureAccessory.prototype = Object.create(symconGenericTemperature.prototype, {

	getTemperature : {
		value: function(callback) {
			var that = this;
			async.waterfall(
			[
			function (waterfallCallback){
				//hole instance id
				that.callRpcMethod('IPS_GetObjectIDByIdent', ['TEMPERATURE', that.instanceId], waterfallCallback);
			},
			function (res, waterfallCallback){
				//rufe Wert der zuvor geholten instanz id ab
				that.callRpcMethod('GetValueFloat', [res.result], waterfallCallback);
			}
			],
			function(err, res){
				//Rückgabe des Werts an Homekit
				that.writeLogEntry("GetValueFloat: " + res.result);
				callback(res.result);
			}
			);
		}
	}/*,
	
	getHumidity : {
		value: function(callback) {
			var that = this;
			async.waterfall(
			[
			function (waterfallCallback){
				//hole instance id
				that.callRpcMethod('IPS_GetObjectIDByIdent', ['HUMIDITY', that.instanceId], waterfallCallback);
			},
			function (res, waterfallCallback){
				//rufe Wert der zuvor geholten instanz id ab
				that.callRpcMethod('GetValueInteger', [res.result], waterfallCallback);
			}
			],
			function(err, res){
				//Rückgabe des Werts an Homekit
				that.writeLogEntry("GetValueInteger: " + res.result);
				callback(res.result);
			}
			);
		}
	}*/
});

HomeMaticTemperatureAccessory.prototype.constructor = HomeMaticTemperatureAccessory;

module.exports = HomeMaticTemperatureAccessory;
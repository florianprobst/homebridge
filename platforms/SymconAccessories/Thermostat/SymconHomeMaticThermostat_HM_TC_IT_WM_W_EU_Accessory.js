var async = require("async");
var symconGenericThermostat = require('./SymconGenericThermostatAccessory.js');

function SymconHomeMaticThermostat_HM_TC_IT_WM_W_EU_Accessory(log, rpcClientOptions, instanceId, name, instance, instanceConfig) {
	log('creating SymconHomeMaticThermostat HM-TC-IT-WM-W-EU Accessory...');
	symconGenericThermostat.call(this, log, rpcClientOptions, instanceId, name, instance, instanceConfig);
};

SymconHomeMaticThermostat_HM_TC_IT_WM_W_EU_Accessory.prototype = Object.create(symconGenericThermostat.prototype, {
	getTargetTemperature: {
		value: function(callback) {
			var that = this;
			async.waterfall(
			[
			function (waterfallCallback){
				//hole instance id
				that.callRpcMethod('IPS_GetObjectIDByIdent', ['SET_TEMPERATURE', that.instanceId], waterfallCallback);
			},
			function (res, waterfallCallback){
				//rufe Wert der zuvor geholten instanz id ab
				that.callRpcMethod('GetValueFloat', [res.result], waterfallCallback);
			}
			],
			function(err, res){
				//Rueckgabe des Werts an Homekit
				that.writeLogEntry("GetValueFloat: " + res.result);
				callback(res.result);
			}
			);
		}
	},

	setTargetTemperature: {
		value: function(value) {
			var method = 'HM_WriteValueFloat';
			var params = [this.instanceId, 'SET_TEMPERATURE', value];
			this.callRpcMethod(method, params);
		}
	},
	
	getCurrentTemperature : {
		value: function(callback) {
			var that = this;
			async.waterfall(
			[
			function (waterfallCallback){
				//hole instance id
				that.callRpcMethod('IPS_GetObjectIDByIdent', ['ACTUAL_TEMPERATURE', that.instanceId], waterfallCallback);
			},
			function (res, waterfallCallback){
				//rufe Wert der zuvor geholten instanz id ab
				that.callRpcMethod('GetValueFloat', [res.result], waterfallCallback);
			}
			],
			function(err, res){
				//Rueckgabe des Werts an Homekit
				that.writeLogEntry("GetValueFloat: " + res.result);
				callback(res.result);
			}
			);
		}
	},
	
	getCurrentHumidity : {
		value: function(callback) {
			var that = this;
			async.waterfall(
			[
			function (waterfallCallback){
				//hole instance id
				that.callRpcMethod('IPS_GetObjectIDByIdent', ['ACTUAL_HUMIDITY', that.instanceId], waterfallCallback);
			},
			function (res, waterfallCallback){
				//rufe Wert der zuvor geholten instanz id ab
				that.callRpcMethod('GetValueFloat', [res.result], waterfallCallback);
			}
			],
			function(err, res){
				//Rueckgabe des Werts an Homekit
				that.writeLogEntry("GetValueFloat: " + res.result);
				callback(res.result);
			}
			);
		}
	}
});

SymconHomeMaticThermostat_HM_TC_IT_WM_W_EU_Accessory.prototype.constructor = SymconHomeMaticThermostat_HM_TC_IT_WM_W_EU_Accessory;

module.exports = SymconHomeMaticThermostat_HM_TC_IT_WM_W_EU_Accessory;
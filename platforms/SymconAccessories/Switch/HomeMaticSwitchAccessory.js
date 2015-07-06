var async = require("async");
var symconGenericSwitch = require('./SymconGenericSwitchAccessory.js');

function HomeMaticSwitchAccessory(log, rpcClientOptions, instanceId, name, instance, instanceConfig) {
	log('creating HomeMaticSwitchAccessory...');
	symconGenericSwitch.call(this, log, rpcClientOptions, instanceId, name, instance, instanceConfig);
};

HomeMaticSwitchAccessory.prototype = Object.create(symconGenericSwitch.prototype, {

	getPowerState : {
		value: function(callback) {
			var that = this;
			async.waterfall(
			[
			function (waterfallCallback){
				//hole instance id
				that.callRpcMethod('IPS_GetObjectIDByIdent', ['STATE', that.instanceId], waterfallCallback);
			},
			function (res, waterfallCallback){
				//rufe Wert der zuvor geholten instanz id ab
				that.callRpcMethod('GetValueBoolean', [res.result], waterfallCallback);
			}
			],
			function(err, res){
				//R�ckgabe des Werts an Homekit
				that.writeLogEntry("SwitchStatus: " + res.result);
				callback(res.result);
			}
			);
		}
	},

	setPowerState : {
		value: function(value) {
			var method = 'HM_WriteValueBoolean';
			var params = [this.instanceId, 'STATE', value];
			this.callRpcMethod(method, params);
		}
	}

});

HomeMaticSwitchAccessory.prototype.constructor = HomeMaticSwitchAccessory;

module.exports = HomeMaticSwitchAccessory;
var types = require("HAP-NodeJS/accessories/types.js");
var symconGeneric = require('../SymconGenericAccessory.js');

function SymconGenericTemperatureAccessory(log, rpcClientOptions, instanceId, name, instance, instanceConfig) {
	symconGeneric.call(this, log, rpcClientOptions, instanceId, name, instance, instanceConfig);
};

SymconGenericTemperatureAccessory.prototype = Object.create(symconGeneric.prototype, {

	getTargetTemperature: {
		value: function(callback) {
			this.writeLogEntry('Error: generic method called! Overwrite for specific module!');
		}
	},

	setTargetTemperature: {
		value: function(value) {
			this.writeLogEntry('Error: generic method called! Overwrite for specific module!');
		}
	},

	getCurrentTemperature: {
		value: function(callback) {
			this.writeLogEntry('Error: generic method called! Overwrite for specific module!');
		}
	},
	
	getCurrentHumidity: {
		value: function(callback) {
			this.writeLogEntry('Error: generic method called! Overwrite for specific module!');
		}
	},

	getControlCharacteristics : {
		value: function () {
			var that = this;
			var cTypes = symconGeneric.prototype.getControlCharacteristics.call(this);
			
			this.writeLogEntry('adding control characteristic CURRENT_TEMPERATURE_CTYPE...');
			this.writeLogEntry('adding control characteristic TEMPERATURE_UNITS_CTYPE...');
			this.writeLogEntry('adding control characteristic CURRENT_HUMIDITY_CTYPE...');
			
			cTypes.push(
				{
					cType: types.CURRENT_TEMPERATURE_CTYPE,
					onUpdate: function(value) { that.writeLogEntry("update current temperature to: " + value); },
					onRead : function(callback) {
						that.getCurrentTemperature(callback);
					},
					perms: ["pr","ev"],
					format: "float",
					initialValue: 0,
					supportEvents: false,
					supportBonjour: false,
					manfDescription: "Current Temperature",
					unit: "celsius"
				},
				{
					cType: types.TEMPERATURE_UNITS_CTYPE,
					onUpdate: function(value) { that.writeLogEntry("update temperature unit to: " + value); },
					onRead : function(callback) { that.writeLogEntry("onRead called for TEMPERATURE_UNITS_CTYPE"); },
					perms: ["pr","ev"],
					format: "int",
					initialValue: 0, // 0: celsius
					supportEvents: false,
					supportBonjour: false,
					manfDescription: "Unit",
				},
				{
					cType: types.CURRENT_RELATIVE_HUMIDITY_CTYPE,
					onUpdate: function(value) { that.writeLogEntry("update current relative humidity to: " + value); },
					onRead : function(callback) {
						that.getCurrentTemperature(callback);
					},
					perms: ["pr","ev"],
					format: "int",
					initialValue: 0, // 0: celsius
					supportEvents: false,
					supportBonjour: false,
					manfDescription: "Current Humidity",
					unit: "percent"
				}
			);
			
			return cTypes;
		}
	},

	getServices : { 
		value: function () {
			var services = [{
					sType : types.ACCESSORY_INFORMATION_STYPE,
					characteristics : this.getInformationCharacteristics(),
				}, {
					sType : types.THERMOSTAT_STYPE,	//es gibt keinen temperature stype...
					characteristics : this.getControlCharacteristics()
				}
			];
			this.writeLogEntry("services loaded");
			return services;
		}
	}

});

SymconGenericTemperatureAccessory.prototype.constructor = SymconGenericTemperatureAccessory;

module.exports = SymconGenericTemperatureAccessory;
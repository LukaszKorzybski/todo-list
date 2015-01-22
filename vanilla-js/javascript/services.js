framework.service('rootScope', function() {
	'use strict';

	var rootScope = {
		newScope: function() {
			return new Scope();
		}
	};

	var Scope = function() {
		this.observers = [];
	};

	Scope.prototype = Object.create(rootScope);

	Scope.prototype.onChange = function(callback) {
		this.observers.push(callback);
	};
	Scope.prototype.apply = function() {
		this.observers.forEach(function(observer) { observer(); });
	};

	return rootScope;
});
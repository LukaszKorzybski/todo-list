framework.controller('todoController', function(todoResource) {
	'use strict';

	return function(scope) {
		scope.items = [];

		scope.addItem = function(todoItem) {
			if (scope.items.indexOf(todoItem) === -1) {
				todoResource.addItem(todoItem.trim());
				loadItems();
			}
		};

		scope.removeItem = function(todoItem) {
			todoResource.removeItem(todoItem);
			loadItems();
		};

		var loadItems = function() {
			scope.items = todoResource.getItems();
			scope.apply();
		};

		loadItems();
	};
}, ['todoResource']);
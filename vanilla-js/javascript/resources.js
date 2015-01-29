framework.component('todoResource', function(config) {
	'use strict';

	var STORAGE_KEY = config.storageKey,
		items = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

	var save = function() {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
	};

	return {
		getItems: function() {
			return items;
		},
		addItem: function(item) {
			items.push(item);
			save();
			
		},
		removeItem: function(item) {
			items = items.filter(function(i) { return i !== item; });
			save();
		}
	};
}, ['config']);
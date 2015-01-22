document.addEventListener('DOMContentLoaded', function() {
	'use strict';

	var rootScope = framework.service('rootScope');

	var mainRoute = function() {		
		var scope = rootScope.newScope();
		framework.views.todoView(scope, 'todo-view-template');
		framework.controller('todoController')(scope);
	};
	
	mainRoute();
});
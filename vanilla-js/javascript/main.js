document.addEventListener('DOMContentLoaded', function() {
	'use strict';

	var mainRoute = function() {
		var scope = framework.newScope();
		framework.views.todoView(scope, 'todo-view-template');
		framework.controller('todoController')(scope);
	};
	
	mainRoute();
});
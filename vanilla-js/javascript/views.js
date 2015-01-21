framework.view('todoView', function(scope, templateId) {
	'use strict';

	var containerElement = document.querySelector('#todo-view'),
		template = framework.template(templateId);

	scope.onChange(function() {
		template(scope, containerElement);
		setupBinding();
	});

	var setupBinding = function() {
		var addItemInput = document.querySelector('#add-item-input');

		document.querySelector('#add-item-btn').addEventListener('click', function() {
			scope.addItem(addItemInput.value);
		});
				
		Array.prototype.forEach.call(document.querySelectorAll('#todo-list button'), function(btn) {
			btn.addEventListener('click', function() {
				scope.removeItem(btn.getAttribute('data-item'));
			});
		});
	};	
});
describe('todoController', function() {
	'use strict';

	var scope,
		todoItems = ['item1', 'item2'],
		todoResource,
		todoController;

	beforeEach(function() {
		scope = framework.newScope();
		todoResource = jasmine.createSpyObj('todoResource', ['getItems', 'addItem', 'removeItem']);
		todoController = framework.providers.todoController(todoResource);		
		
		todoResource.getItems.and.returnValue(todoItems);
		
		todoController(scope);
	});

	it('should load todo items on start', function() {
		expect(scope.items.length).toEqual(2);
	});

	describe('addItem', function() {
		it('should not add given item if it is already in the list', function() {
			scope.addItem('item1');

			expect(scope.items.length).toEqual(2);
			expect(todoResource.addItem.calls.any()).toEqual(false);
		});

		it('should add given item to the list', function() {
			scope.addItem('item3');
						
			expect(todoResource.addItem).toHaveBeenCalledWith('item3');
			expect(todoResource.getItems).toHaveBeenCalled();
		});

		it('should trim item before adding it', function() {
			scope.addItem('  item3  ');
			expect(todoResource.addItem).toHaveBeenCalledWith('item3');
		});
	});

	describe('removeItem', function() {
		it('should remove item from the list', function() {
			scope.removeItem('item2');
			
			expect(todoResource.removeItem).toHaveBeenCalledWith('item2');
			expect(todoResource.getItems).toHaveBeenCalled();
		});
	});
});
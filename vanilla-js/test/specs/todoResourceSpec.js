describe('todoResource', function() {
	'use strict';

	var todoResource,
		mockConfig = { storageKey: 'todolist-test' };

	beforeEach(function() {
		localStorage.removeItem('todolist-test');
		todoResource = framework.providers.todoResource(mockConfig);

		todoResource.addItem('item1');
		todoResource.addItem('item2');
	});

	describe('getItems', function() {
		it('should return empty list if no items has been added', function() {
			localStorage.removeItem('todolist-test');
			todoResource = framework.providers.todoResource(mockConfig);

			var items = todoResource.getItems();
			expect(items.length).toEqual(0);
		});

		it('should return list of todo items', function() {		
			var items = todoResource.getItems();
			
			expect(items.length).toEqual(2);
			expect(items[0]).toEqual('item1');
			expect(items[1]).toEqual('item2');
		});
	});

	describe('addItem', function() {
		it('should add given item at the end of the list', function() {			
			var items = todoResource.getItems();
			
			expect(items.length).toEqual(2);
			expect(items[0]).toEqual('item1');
			expect(items[1]).toEqual('item2');
		});	
	});

	describe('removeItem', function() {
		it('should remove given item from the list', function() {
			todoResource.removeItem('item1');

			var items = todoResource.getItems();
			expect(items.length).toEqual(1);
			expect(items[0]).toEqual('item2');
		});

		it('should not fail when given item is not on the list', function() {
			todoResource.removeItem('item3');

			var items = todoResource.getItems();
			expect(items.length).toEqual(2);
		});
	});	
});
describe('rootScope', function() {
	'use strict';
	
	var rootScope;

	beforeEach(function() {
		rootScope = framework.providers.rootScope();
	});

	describe('newScope', function() {
		it('should return new Scope instance', function() {
			var scope1 = rootScope.newScope(),
				scope2 = rootScope.newScope();

			expect(scope1.__proto__).toBe(scope2.__proto__);
			expect(scope1).not.toBe(scope2);
		});
	});

	describe('Scope', function() {
		var scope;

		beforeEach(function() {
			scope = rootScope.newScope();
		});

		it('should inherit prototypically from rootScope', function() {
			rootScope.test = 'test';
			expect(scope.test).toEqual(rootScope.test);
		});

		it('should start with empty observers list', function() {
			expect(scope.observers.length).toEqual(0);
		});

		describe('onChange', function() {
			it('should register a new callback', function() {
				scope.onChange(function() {});
				scope.onChange(function() {});
				expect(scope.observers.length).toEqual(2);
			});
		});

		describe('apply', function() {
			it('should be noop if there are no registered callbacks', function() {
				expect(scope.observers.length).toEqual(0);
				scope.apply();
			});

			it('should call once all registered callbacks', function() {
				var result = [];
				
				scope.onChange(function() { result.push(1) });
				scope.onChange(function() { result.push(2) });
				scope.apply();

				expect(result.length).toEqual(2);
				expect(result).toContain(1);
				expect(result).toContain(2);
			});
		});
	});
});
describe('framework', function() {
	"use strict";

	var sut;

	beforeEach(function() {
		sut = Framework();
	});

	describe('service', function() {		

		var serviceProvider = function() { return { msg: 'test service' }; },
			service1Provider = function(testService) { return { msg: testService.msg + ' 1' }; };

		beforeEach(function() {
			sut.service('testService', serviceProvider);
		});

		it('should register given service provider under given name', function() {			
			expect(sut.providers['testService']).toBe(serviceProvider);
		});

		it('should throw exception if service provider with given name has already been registered', function() {			
			expect(function() {
				sut.service('testService', serviceProvider);	
			}).toThrow();			
		});

		it('should return instance of a service requested as created by the provider', function() {					
			var service = sut.service('testService');
			expect(service.msg).toEqual('test service');
		});

		it('should resolve and inject dependecies when called to register new service', function() {			
			sut.service('testService1', service1Provider, ['testService']);

			var testService1 = sut.service('testService1');
			expect(testService1.msg).toEqual('test service 1');
		});

		it('should throw exception when one or more of the dependencies cannot be met', function() {
			sut.service('testService1', service1Provider, ['nonExistentService']);

			expect(function() {
				sut.service('testService1');
			}).toThrow();
		});

		it('should throw exception when provider is not found for requested service', function() {
			expect(function() { 
				sut.service('nonExistentService'); 
			}).toThrow();
		});	

		it('should return the same and only instance of given service when called multiple times', function() {			
			var service1 = sut.service('testService');
			var service2 = sut.service('testService');

			expect(service1).toBe(service2);
		});
	});

	describe('controller', function() {
		it('should be an alias for the service method', function() {
			var controller = function(dependency) {};
			
			sut.service = spyOn(sut, 'service').and.returnValue(sut);
			var result = sut.controller('testController', controller, ['dependency']);

			expect(sut.service.calls.count()).toEqual(1);
			expect(sut.service.calls.argsFor(0)).toEqual(['testController', controller, ['dependency']]);
			expect(result).toBe(sut);
		});
	});

	describe('view', function() {
		it('should register view under given name', function() {
			var view = function() {};

			sut.view('testView', view);
			expect(sut.views.testView).toBe(view);
		});
	});

	describe('newScope', function() {
		// todo
	});	
});
describe('framework', function() {
	"use strict";

	var sut,
		serviceProvider,
		service1Provider;

	beforeEach(function() {
		sut = Framework();
		serviceProvider = function() { return { msg: 'test service' }; };
		service1Provider = function(testService) { return { msg: testService.msg + ' 1' }; };

		sut.service('testService', serviceProvider);
	});

	describe('service', function() {

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

		it('should resolve and inject inline defined dependecies when called to register new service', function() {			
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

		it("should use provider's __inject__ property to identify dependencies when no inline dependencies were passed", function() {
			var testProvider = function(testService) { 
				return testService.msg 
			};
			testProvider.__inject__ = ['testService'];
			
			sut.service('testService1', testProvider);

			var testService1 = sut.service('testService1');
			expect(testService1).toEqual('test service');
		});

		it("should use provider parameters' names to identify dependencies when no explicit dependencies information is given", function() {
			var testProvider = function(  testService  ,testService1 ) { 
				return testService.msg + ',' + testService1.msg; 
			};
			sut.service('testService1', service1Provider);
			sut.service('testService2', testProvider);

			var testService2 = sut.service('testService2');
			expect(testService2).toEqual('test service,test service 1');
		});

		it("should not fail if provider function doesn't have any parameters", function() {
			var testService = sut.service('testService');
			expect(testService.msg).toEqual('test service');
		});
	});
	
	describe('inject', function() {
		it('should return result of the function passed', function() {
			var result = {},
				func = function() { return result; };

			expect(sut.inject(func)).toBe(result);
		});

		it('should resolve and inject inline defined dependecies', function() {
			var func = function(testService) {
				return testService.msg;
			};			

			var result = sut.inject(func, ['testService']);
			expect(result).toEqual('test service');
		});

		it("should use component's __inject__ property to identify dependencies when no inline dependencies were passed", function() {
			var func = function(testService) { 
				return testService.msg 
			};
			func.__inject__ = ['testService'];
			
			var result = sut.inject(func);
			expect(result).toEqual('test service');
		});

		it("should use component parameters' names to identify dependencies when no explicit dependencies information is given", function() {
			var func = function(  testService  ,testService1 ) { 
				return testService.msg + ',' + testService1.msg; 
			};
			sut.service('testService1', service1Provider);
			
			var result = sut.inject(func);
			expect(result).toEqual('test service,test service 1');
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
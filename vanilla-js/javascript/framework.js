var Framework = function() {
	'use strict';

	var providers = {},
		services = {},
		views = {};

	var resolveDependencies = function(serviceName, dependencies) {
		return dependencies.map(function(dep) {
			var service = getServiceInstance(dep);
			if (!service) {
				throw new Error("Cannot resolve dependency: " + dep + ", for provider: " + serviceName);
			}
			return service;
		});
	};

	var registerServiceProvider = function(name, provider, _dependencies) {
		var dependencies = _dependencies || [];
		if (providers[name] === undefined) {
			provider.$name = name;
			provider.$inject = dependencies;

			providers[name] = provider;
		} else {
			throw new Error("Provider " + name + " is already registered");
		}
	};

	var createServiceInstance = function(name) {
		var provider = providers[name];
		if (provider) {
			var resolvedDependencies = resolveDependencies(name, provider.$inject);
			return provider.apply(this, resolvedDependencies);
		} else {
			throw new Error('Provider ' + name + ' not found');
		}
	};

	var getServiceInstance = function(name) {
		if (services[name] === undefined) {
			services[name] = createServiceInstance(name);
		}
		return services[name];
	};

	return {
		providers: providers,
		services: services,		
		views: views,

		service: function(name, provider, _dependencies) {
			if (arguments.length === 1) {				
				return getServiceInstance(name);
			} else {
				registerServiceProvider(name, provider, _dependencies);
				return this;
			}						
		},
		controller: function() {
			return this.service.apply(this, arguments);
		},
		view: function(name, view) {
			views[name] = view;
		},
		newScope: function() {
			return {
				observers: [],
				onChange: function(callback) {
					this.observers.push(callback);
				},
				apply: function() {
					this.observers.forEach(function(observer) { observer(); });
				}
			};
		},
		template: function(templateId) {
			var templateNode = document.querySelector('#' + templateId);
			if (templateNode) {
				var template = Handlebars.compile(templateNode.innerHTML);
				return function(scope, rootNode) {
					rootNode.innerHTML = template(scope);
				};
			} else {
				throw new Error("Template not found. Id: " + templateId);
			}
		}
	};
};

var framework = Framework();
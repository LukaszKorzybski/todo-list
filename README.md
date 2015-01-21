todo-list
=========

## Running

Open main.html in latest Chrome

To run unit tests open test/runner.html in latest Chrome

## Design

The application has been designed around MVC pattern. Simplistic micro
framework has been created for this purpouse (framework.js). The framework
provides basic structure, dependency injection and templating.

For simplicity no AMD loader has been used. For the same reason
Handlebar HTML templates are stored directly in main.html, instead 
of being lazy loaded.

There is only one route in the application, so I didn't use any routing 
library. The route is defined and executed in main.js.

The view component registers itself as an observer of the model (scope object)
and redraws itself upon change of the model.
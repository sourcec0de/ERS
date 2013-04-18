'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives']).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {templateUrl: 'partials/home', controller: HomeCtrl}).
  when('/contracts', {templateUrl: 'partials/contracts-index', controller: ContractsCtrl}).
  when('/contracts/:id', {templateUrl: 'partials/contracts-show', controller: ShowContractCtrl}).
  when('/newContract',{templateUrl: 'partials/contracts-new', controller: NewContractCtrl}).
  when('/employees', {templateUrl: 'partials/employees-index', controller: EmployeesCtrl}).
  when('/employees/:id', {templateUrl: 'partials/employees-show', controller: ShowEmployeeCtrl}).
  when('/calls', {templateUrl: 'partials/calls-index', controller: CallsCtrl}).
  when('/calls/:id', {templateUrl: 'partials/calls-show', controller: ShowCallCtrl}).
  otherwise({redirectTo: '/home'});
}]);

﻿'use strict';

var angular = require('angular');
require('angular-ui-bootstrap');
require('angular-route');
require('angular-xeditable');
require('angular-animate');
window.jQuery = require('jquery');

//temporary fix for Chrome/Jointjs problem
SVGElement.prototype.getTransformToElement = SVGElement.prototype.getTransformToElement || function (toElement) {
    return toElement.getScreenCTM().inverse().multiply(this.getScreenCTM());
};

var app = angular.module('app', ['ui.bootstrap', 'ngRoute', 'xeditable', 'ngAnimate', 'templates', 'common']);

//require custom modules, services, controllers and directives
require('./config.route');
require('owasp-threat-dragon-core');
require('./layout');
require('./welcome');

app.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);

app.run(['$rootScope', '$location',
    function ($rootScope, $location) {
        $rootScope.location = $location;
    }]);

app.config(['$locationProvider', function ($locationProvider) {
    $locationProvider.hashPrefix('');
}]);

// Handle routing errors and success events
app.run(['$route', '$rootScope', 'routemediator',
    function ($route, $rootScope, routemediator) {
        routemediator.setRoutingHandlers();
    }]);

//config for angular-xeditable
app.run(['editableOptions', function (editableOptions) {
    editableOptions.theme = 'bs3';
}]);
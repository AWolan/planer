'use strict';

/**
 * @ngdoc overview
 * @name app
 * @description
 * # app
 *
 * Main module of the application.
 */
angular
    .module('app', [
        'ngRoute',
        'menu',
        'salary',
        'obligation',
        'details',
        'main',
        'test'
    ])
    .factory('math', function () {
        return {
            sum: function (list) {
                var i, result = 0;
                for (i = 0; i < list.length; i += 1) {
                    result += list[i];
                }
                return result;
            }
        };
    })
    .filter('total', ['math', function (math) {
        return function (data, key) {
            var i, list = [];
            
            if (data && key) {
                for (i = 0; i < data.length; i += 1) {
                    list.push(parseFloat(data[i][key]));
                }
                
                return math.sum(list);
            } else {
                return 0;
            }
        };
    }])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainController'
            })
            .when('/salary', {
                templateUrl: 'views/salary.html',
                controller: 'SalaryController',
                css: 'css/salary.scss'
            })
            .when('/obligation', {
                templateUrl: 'views/obligation.html',
                controller: 'ObligationController'
            })
            .when('/details', {
                templateUrl: 'views/details.html',
                controller: 'DetailsController'
            })
            .otherwise({
                redirectTo: '/'
            });
    });

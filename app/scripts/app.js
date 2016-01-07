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
        'angular.filter',
        'menu',
        'salary',
        'obligation',
        'details'
    ])
    .factory('monthNames', function () {
        return {
            PL: [
                'Styczeń',
                'Luty',
                'Marzec',
                'Kwiecień',
                'Maj',
                'Czerwiec',
                'Lipiec',
                'Sierpień',
                'Wrzesień',
                'Październik',
                'Listopad',
                'Grudzień'
            ]
        };
    })
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
    .factory('parse', function () {
        var delimiters = [' ', '.', '/', '-'],
            findDelimiter = function (format) {
                var delimiter, i;
                
                for (i = 0; i < delimiters.length; i += 1) {
                    delimiter = delimiters[i];
                    if (format.indexOf(delimiter) > 0) {
                        return delimiter;
                    }
                }
                
                return '';
            };
        return {
            date: function (date, format) {
                var year, month, day, yearIndex, monthIndex, dayIndex,
                    delimiter, formatList, dateList;
                
                if (date && format) {
                    delimiter = findDelimiter(format);
                    formatList = format.split(delimiter);
                    dateList = date.split(delimiter);
                    
                    yearIndex = formatList.indexOf('yyyy');
                    monthIndex = formatList.indexOf('mm');
                    dayIndex = formatList.indexOf('dd');

                    year = parseInt(dateList[yearIndex], 10);
                    month = parseInt(dateList[monthIndex], 10);
                    day = parseInt(dateList[dayIndex], 10);

                    return new Date(year, month - 1, day);
                } else {
                    return null;
                }
            }
        };
    })
    .filter('total', ['math', function (math) {
        var getValue = function (element, key) {
            var i, value, keyList = [];
            
            if (key.indexOf('.') > 0) {
                keyList = key.split('.');
            } else {
                keyList.push(key);
            }
            
            value = element;
            for (i = 0; i < keyList.length; i += 1) {
                if (value) {
                    value = value[keyList[i]];
                }
            }
            
            return value;
        };
        return function (data, key) {
            var i, keyList, list = [];
            
            if (data && key) {
                
                for (i = 0; i < data.length; i += 1) {
                    list.push(parseFloat(getValue(data[i], key)));
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
                templateUrl: 'views/salary/main.html',
                controller: 'SalaryController',
                css: 'css/salary.scss'
            })
            .when('/obligation', {
                templateUrl: 'views/obligation/main.html',
                controller: 'ObligationController'
            })
            .when('/details', {
                templateUrl: 'views/details/main.html',
                controller: 'DetailsController',
                css: 'css/details.scss'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
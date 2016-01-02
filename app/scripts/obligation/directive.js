'use strict';

angular
    .module('obligation')
    .directive('paymentDetails', function () {
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                paymentDetails: '=model'
            },
            templateUrl: 'views/obligation/paymentDetails.html',
            link: function (scope, element, attrs, controllers) {
                scope.title = {
                    toPay: 'Do zapłaty',
                    paid: 'Zapłacone',
                    until: 'do',
                    on: 'dnia'
                };
            }
        };
    });
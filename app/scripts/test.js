'use strict';

angular
    .module('app.test', [])
    .controller('TestController', ['$scope', 'calculateSalary', function ($scope, calculateSalary) {
        $scope.$watch('base', function (newValue, oldValue) {
            var pay = {
                    base: newValue,
                    x: 1.0,
                    equalization: 0.00,
                    overtime: 0.00,
                    bonus: 0.00,
                    leave: 0.00,
                    healthLeave: 0.00,
                    benefit: 0.00,
                    medicalCare: 108.00,
                    insurance: 22.34
                };
            $scope.salary = calculateSalary(pay);
        });
    }]);

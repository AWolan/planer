'use strict';

angular
    .module('app.main', [])
    .controller('MainController', ['$scope', 'calculateSalary', function ($scope, calculateSalary) {
        var i, salary,
            salaryList = [],
            payList = [
                {
                    year: 2015,
                    month: 1,
                    base: 5000.00,
                    x: 1.0,
                    equalization: 0.00,
                    overtime: 0.00,
                    bonus: 0.00,
                    leave: 98.56,
                    healthLeave: 0.00,
                    benefit: 0.00,
                    medicalCare: 20.00,
                    insurance: 29.00
                },
                {
                    year: 2015,
                    month: 2,
                    base: 4697.33,
                    x: 1.0,
                    equalization: 420.00,
                    overtime: 0.00,
                    bonus: 0.00,
                    leave: 0.00,
                    healthLeave: 409.12,
                    benefit: 0.00,
                    medicalCare: 20.00,
                    insurance: 33.87
                },
                {
                    year: 2015,
                    month: 3,
                    base: 5420.00,
                    x: 1.0,
                    equalization: 0.00,
                    overtime: 0.00,
                    bonus: 0.00,
                    leave: 0.00,
                    healthLeave: 0.00,
                    benefit: 0.00,
                    medicalCare: 20.00,
                    insurance: 31.44
                },
                {
                    year: 2015,
                    month: 4,
                    base: 5420.00,
                    x: 1.0,
                    equalization: 0.00,
                    overtime: 886.91,
                    bonus: 3750.00,
                    leave: 0.00,
                    healthLeave: 0.00,
                    benefit: 0.00,
                    medicalCare: 20.00,
                    insurance: 31.44
                },
                {
                    year: 2015,
                    month: 5,
                    base: 5420.00,
                    x: 1.0,
                    equalization: 0.00,
                    overtime: 0.00,
                    bonus: 0.00,
                    leave: 0.00,
                    healthLeave: 0.00,
                    benefit: 0.00,
                    medicalCare: 20.00,
                    insurance: 31.44
                },
                {
                    year: 2015,
                    month: 6,
                    base: 5420.00,
                    x: 1.0,
                    equalization: 0.00,
                    overtime: 0.00,
                    bonus: 0.00,
                    leave: 14.32,
                    healthLeave: 0.00,
                    benefit: 0.00,
                    medicalCare: 20.00,
                    insurance: 29.00
                },
                {
                    year: 2015,
                    month: 7,
                    base: 5600.00,
                    x: 1.0,
                    equalization: 0.00,
                    overtime: 1069.09,
                    bonus: 0.00,
                    leave: 0.00,
                    healthLeave: 0.00,
                    benefit: 0.00,
                    medicalCare: 20.00,
                    insurance: 22.34
                },
                {
                    year: 2015,
                    month: 8,
                    base: 5600.00,
                    x: 1.0,
                    equalization: 0.00,
                    overtime: 0.00,
                    bonus: 0.00,
                    leave: 152.64,
                    healthLeave: 0.00,
                    benefit: 198.00,
                    medicalCare: 20.00,
                    insurance: 22.34
                },
                {
                    year: 2015,
                    month: 9,
                    base: 5600.00,
                    x: 1.0,
                    equalization: 0.00,
                    overtime: 0.00,
                    bonus: 0.00,
                    leave: 0.00,
                    healthLeave: 0.00,
                    benefit: 114.00,
                    medicalCare: 20.00,
                    insurance: 22.34
                },
                {
                    year: 2015,
                    month: 10,
                    base: 5600.00,
                    x: 1.0,
                    equalization: 0.00,
                    overtime: 0.00,
                    bonus: 0.00,
                    leave: 1349.00,
                    healthLeave: 0.00,
                    benefit: 0.00,
                    medicalCare: 108.00,
                    insurance: 22.34
                },
                {
                    year: 2015,
                    month: 11,
                    base: 5600.00,
                    x: 1.0,
                    equalization: 0.00,
                    overtime: 0.00,
                    bonus: 0.00,
                    leave: 0.00,
                    healthLeave: 0.00,
                    benefit: 0.00,
                    medicalCare: 108.00,
                    insurance: 22.34
                },
                {
                    year: 2015,
                    month: 12,
                    base: 5600.00,
                    x: 1.0,
                    equalization: 0.00,
                    overtime: 0.00,
                    bonus: 38.77,
                    leave: 20.00,
                    healthLeave: 0.00,
                    benefit: 264.00,
                    medicalCare: 108.00,
                    insurance: 22.34
                }
            ];

        for (i = 0; i < payList.length; i += 1) {
            salary = calculateSalary(payList[i]);
            salaryList.push(salary);
        }

        $scope.salaryList = salaryList;
    }]);

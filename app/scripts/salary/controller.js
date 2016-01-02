'use strict';

angular
    .module('salary', [])
    .controller('SalaryController', ['$scope', 'salaryTitle', 'salaryManager', 'salaryBaseList', function ($scope, salaryTitle, salaryManager, salaryBaseList) {
        $scope.salaryTitle = salaryTitle.PL;
        $scope.salaryList = salaryManager.calculateSalary(salaryBaseList);
        $scope.onSalaryClick = function (salary) {
            salary.showDetails = !salary.showDetails;
        };
    }]);

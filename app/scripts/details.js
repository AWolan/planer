'use strict';

angular
    .module('details', [])
    .factory('actualMonths', function () {
        var list = [],
            now = new Date(),
            FullMonth = function () {
                return {
                    year: null,
                    month: null,
                    getFirstDay: function () {
                        if (this.year && this.month) {
                            return new Date(this.year, this.month - 1, 1);
                        } else {
                            return null;
                        }
                    },
                    getLastDay: function () {
                        if (this.year && this.month) {
                            return new Date(this.year, this.month, 0);
                        } else {
                            return null;
                        }
                    }
                };
            },
            prev = new FullMonth(),
            actual = new FullMonth(),
            next = new FullMonth();
        
        actual.month = now.getMonth() + 1;
        actual.year = now.getFullYear();
        prev.month = actual.month === 1 ? 12 : actual.month - 1;
        prev.year = actual.month === 1 ? actual.year - 1 : actual.year;
        next.month = actual.month === 12 ? 1 : actual.month + 1;
        next.year = actual.month === 12 ? actual.year + 1 : actual.year;
    
        return {
            actual: actual,
            prev: prev,
            next: next
        };
    })
    .factory('salaryForActualMonths', ['actualMonths', 'salaryManager', 'salaryBaseList', function (actualMonths, salaryManager, salaryBaseList) {
        var actualSalaryBaseList = salaryManager.getBaseSalaryForMonth(actualMonths.actual),
            prevSalaryBaseList = salaryManager.getBaseSalaryForMonth(actualMonths.prev),
            nextSalaryBaseList = salaryManager.getBaseSalaryForMonth(actualMonths.next);
        
        return {
            actualSalary: salaryManager.calculateSalary(actualSalaryBaseList),
            prevSalary: salaryManager.calculateSalary(prevSalaryBaseList),
            nextSalary: salaryManager.calculateSalary(nextSalaryBaseList)
        };
    }])
    .controller('DetailsController', ['$scope', 'salaryForActualMonths', 'obligationList', function ($scope, salaryList, obligationList) {
        
        
        $scope.salaryList = salaryList;
    }]);
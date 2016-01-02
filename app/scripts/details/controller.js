'use strict';

angular
    .module('details', [])
    .controller('DetailsController', ['$scope', 'actualMonths', 'salaryForActualMonths', 'obligationForActualMonths', function ($scope, actualMonths, salaryList, obligationList) {
        $scope.actualMonth = {
            date: actualMonths.actual,
            salaryList: salaryList.actualSalary,
            obligationList: obligationList.actualObligation
        };
        $scope.prevMonth = {
            date: actualMonths.prev,
            salaryList: salaryList.prevSalary,
            obligationList: obligationList.prevObligation
        };
        $scope.nextMonth = {
            date: actualMonths.next,
            salaryList: salaryList.nextSalary,
            obligationList: obligationList.nextObligation
        };
    }]);
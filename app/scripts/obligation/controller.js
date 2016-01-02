'use strict';

angular
    .module('obligation', [])
    .controller('ObligationController', ['$scope', 'obligationTitle', 'obligationManager', function ($scope, obligationTitle, obligationManager) {
        $scope.obligationTitle = obligationTitle.PL;
        $scope.obligationList = obligationManager.getObligationData();
        $scope.onObligationClick = function (obligation) {
            obligation.showDetails = !obligation.showDetails;
        };
    }]);
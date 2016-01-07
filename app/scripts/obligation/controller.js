'use strict';

angular
    .module('obligation', [])
    .controller('ObligationController', ['$scope', 'obligationTitle', 'obligationManager', function ($scope, obligationTitle, obligationManager) {
        $scope.obligationTitle = obligationTitle.PL;
        $scope.obligationList = obligationManager.getObligationData();
        $scope.onObligationClick = function (obligation) {
            obligation.showDetails = !obligation.showDetails;
        };
        $scope.typeList = [
            {
                id: '',
                name: 'Całość'
            },
            {
                id: 'bill',
                name: 'Rachunek'
            },
            {
                id: 'credit',
                name: 'Kredyt'
            },
            {
                id: 'expense',
                name: 'Wydatek'
            },
            {
                id: 'tank',
                name: 'Tankowanie'
            }
        ];
    }]);
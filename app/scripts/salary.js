'use strict';

angular
    .module('salary', [])
    .factory('salaryTitle', function () {
        return {
            PL : {
                year: 'Rok',
                month: 'Miesiąc',
                gross: 'Brutto',
                net: 'Netto',
                retiringContribution: 'Składka emerytalna',
                rentContribution: 'Składka rentowa',
                illnessContribution: 'Składka chorobowa',
                healthContribution: 'Składka zdrowotna',
                taxContribution: 'Zaliczka na podatek'
            }
        };
    })
    .factory('salaryConst', function () {
        return {
            retiringFactor: 0.0976,
            rentFactor: 0.015,
            illnessFactor: 0.0245,
            healthFactor: 0.09,
            healthTaxFactor: 0.0775,
            taxFactor: 0.18,
            deductibleCost: 111.25,
            taxRelief: 46.33
        };
    })
    .factory('salaryBaseList', function () {
        return [
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
    })
    .factory('calculateSalary', ['math', 'salaryConst', function (math, salaryConst) {
        var sum = function (list) {
                var i, result = 0;
                for (i = 0; i < list.length; i += 1) {
                    result += list[i];
                }
                return result;
            },
            calculateGross = function (salaryBase) {
                return math.sum([
                    salaryBase.base * salaryBase.x,
                    salaryBase.equalization,
                    salaryBase.overtime,
                    salaryBase.bonus,
                    salaryBase.leave,
                    salaryBase.healthLeave
                ]);
            },
            calculateInsuranceBase = function (salaryBase) {
                return math.sum([
                    salaryBase.base * salaryBase.x,
                    salaryBase.equalization,
                    salaryBase.overtime,
                    salaryBase.bonus,
                    salaryBase.leave,
                    salaryBase.medicalCare,
                    salaryBase.insurance
                ]);
            },
            calculateInsuranceContribution = function (insuranceBase) {
                var retiringContribution = salaryConst.retiringFactor * insuranceBase,
                    rentContribution = salaryConst.rentFactor * insuranceBase,
                    illnessContribution = salaryConst.illnessFactor * insuranceBase,
                    insuranceContribution = math.sum([
                        retiringContribution,
                        rentContribution,
                        illnessContribution
                    ]);
                return {
                    retiringContribution: retiringContribution,
                    rentContribution: rentContribution,
                    illnessContribution: illnessContribution,

                    getInsuranceContribution: function () {
                        return insuranceContribution;
                    }
                };
            },
            calculateHealthBase = function (insuranceBase, insuranceContribution, healthLeave) {
                return math.sum([
                    insuranceBase,
                    healthLeave,
                    -insuranceContribution.getInsuranceContribution()
                ]);
            },
            calculateHealthContribution = function (healthInsuranceBase) {
                return salaryConst.healthFactor * healthInsuranceBase;
            },
            calculateTaxBase = function (insuranceBase, insuranceContribution, benefit) {
                var taxBase;

                if (insuranceBase > 0) {
                    taxBase = math.sum([
                        insuranceBase,
                        benefit,
                        -insuranceContribution.getInsuranceContribution(),
                        -salaryConst.deductibleCost
                    ]);
                } else {
                    taxBase = 0;
                }
                return taxBase;
            },
            calculateTaxContribution = function (taxBase, healthBase) {
                var taxContribution;

                if (taxBase > 0) {
                    taxContribution = math.sum([
                        salaryConst.taxFactor * taxBase,
                        -salaryConst.taxRelief,
                        -salaryConst.healthTaxFactor * healthBase
                    ]);
                } else {
                    taxContribution = 0;
                }
                return taxContribution;
            },
            calculateNet = function (gross, insuranceContribution, healthContribution, taxContribution) {
                return math.sum([
                    gross,
                    -insuranceContribution.getInsuranceContribution(),
                    -healthContribution,
                    -taxContribution
                ]);
            };
        return function (salaryBase) {
            var gross = calculateGross(salaryBase),
                insuranceBase = calculateInsuranceBase(salaryBase),
                insuranceContribution = calculateInsuranceContribution(insuranceBase),
                healthBase = calculateHealthBase(insuranceBase, insuranceContribution, salaryBase.healthLeave),
                healthContribution = calculateHealthContribution(healthBase),
                taxBase = calculateTaxBase(insuranceBase, insuranceContribution, salaryBase.benefit),
                taxContribution = calculateTaxContribution(taxBase, healthBase),
                net = calculateNet(gross, insuranceContribution, healthContribution, taxContribution);

            return {
                year: salaryBase.year,
                month: salaryBase.month,
                gross: gross,
                net: net,
                retiringContribution: insuranceContribution.retiringContribution,
                rentContribution: insuranceContribution.rentContribution,
                illnessContribution: insuranceContribution.illnessContribution,
                healthContribution: healthContribution,
                taxContribution: taxContribution,
                showDetails: false
            };
        };
    }])
    .factory('salaryManager', ['calculateSalary', function (calculateSalary) {
        return {
            calculateSalary: function (salaryBaseList) {
                var i, salary,
                    salaryList = [];

                for (i = 0; i < salaryBaseList.length; i += 1) {
                    salary = calculateSalary(salaryBaseList[i]);
                    salaryList.push(salary);
                }
                return salaryList;
            },
            getBaseSalaryForMonth: function (salaryBaseList, fullMonth) {
                var i, salaryBase, result = [];
                for (i = 0; i < salaryBaseList.length; i += 1) {
                    salaryBase = salaryBaseList[i];
                    if (salaryBase.year === fullMonth.year && salaryBase.month === fullMonth.month) {
                        result.push(salaryBase);
                    }
                }
                return result;
            }
        };
    }])
    .controller('SalaryController', ['$scope', 'salaryTitle', 'salaryManager', 'salaryBaseList', function ($scope, salaryTitle, salaryManager, salaryBaseList) {
        $scope.salaryTitle = salaryTitle.PL;
        $scope.salaryList = salaryManager.calculateSalary(salaryBaseList);
        $scope.onSalaryClick = function (salary) {
            salary.showDetails = !salary.showDetails;
        };
    }]);

'use strict';

angular
    .module('app.salary', [])
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
    .factory('calculateSalary', ['salaryConst', function (salaryConst) {
        var sum = function (list) {
                var i, result = 0;
                for (i = 0; i < list.length; i += 1) {
                    result += list[i];
                }
                return result;
            },
            calculateBrutto = function (pay) {
                return sum([
                    pay.base * pay.x,
                    pay.equalization,
                    pay.overtime,
                    pay.bonus,
                    pay.leave,
                    pay.healthLeave
                ]);
            },
            calculateInsuranceBase = function (pay) {
                return sum([
                    pay.base * pay.x,
                    pay.equalization,
                    pay.overtime,
                    pay.bonus,
                    pay.leave,
                    pay.medicalCare,
                    pay.insurance
                ]);
            },
            calculateInsuranceContribution = function (insuranceBase) {
                var retiringContribution = salaryConst.retiringFactor * insuranceBase,
                    rentContribution = salaryConst.rentFactor * insuranceBase,
                    illnessContribution = salaryConst.illnessFactor * insuranceBase,
                    insuranceContribution = sum([
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
                return sum([
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
                    taxBase = sum([
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
                    taxContribution = sum([
                        salaryConst.taxFactor * taxBase,
                        -salaryConst.taxRelief,
                        -salaryConst.healthTaxFactor * healthBase
                    ]);
                } else {
                    taxContribution = 0;
                }
                return taxContribution;
            },
            calculateNetto = function (brutto, insuranceContribution, healthContribution, taxContribution) {
                return sum([
                    brutto,
                    -insuranceContribution.getInsuranceContribution(),
                    -healthContribution,
                    -taxContribution
                ]);
            };
        return function (pay) {
            var brutto = calculateBrutto(pay),
                insuranceBase = calculateInsuranceBase(pay),
                insuranceContribution = calculateInsuranceContribution(insuranceBase),
                healthBase = calculateHealthBase(insuranceBase, insuranceContribution, pay.healthLeave),
                healthContribution = calculateHealthContribution(healthBase),
                taxBase = calculateTaxBase(insuranceBase, insuranceContribution, pay.benefit),
                taxContribution = calculateTaxContribution(taxBase, healthBase),
                netto = calculateNetto(brutto, insuranceContribution, healthContribution, taxContribution);

            return {
                brutto: brutto,
                netto: netto,
                retiringContribution: insuranceContribution.retiringContribution,
                rentContribution: insuranceContribution.rentContribution,
                illnessContribution: insuranceContribution.illnessContribution,
                healthContribution: healthContribution,
                taxContribution: taxContribution
            };
        };
    }]);

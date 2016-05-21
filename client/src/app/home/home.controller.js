(function () {
    'use strict';

    angular
        .module('kungfunit.home')
        .controller('HomeController', HomeController);

    /** @ngInject */
    function HomeController(unitService, lodash) {
        var vm = this;

        vm.unitClasses = [];
        vm.unitQuantityNames = [];
        vm.selectedUnitQuantities = ["Length", "Time", "Area"];

        vm.convertFromLeftToRight = convertFromLeftToRight;
        vm.convertFromRightToLeft = convertFromRightToLeft;
        vm.isUnitQuantitySelected = isUnitQuantitySelected;

        retrieveUnitClasses();

        function retrieveUnitClasses() {
            unitService.getUnits({}, function (unitClasses) {
                vm.unitClasses = unitClasses.data.classes;

                // get all available unit quantitiy names for selection purposes
                lodash.forEach(vm.unitClasses, function (unitClass) {
                    vm.unitQuantityNames = lodash.concat(vm.unitQuantityNames, lodash.map(unitClass.quantities, "name"));
                });
            });
        }

        function convertFromLeftToRight(converterScope) {
            unitService.convert({
                q: converterScope.lhsValue,
                source: converterScope.lhsUnit,
                target: converterScope.rhsUnit
            }, function (conversion) {
                converterScope.rhsValue = (conversion.data.conversions[0].convertedUnit);
            });
        }

        function convertFromRightToLeft(converterScope) {
            unitService.convert({
                q: converterScope.rhsValue,
                source: converterScope.rhsUnit,
                target: converterScope.lhsUnit
            }, function (conversion) {
                converterScope.lhsValue = (conversion.data.conversions[0].convertedUnit);
            });
        }

        function isUnitQuantitySelected(unitQuantity) {
            return lodash.includes(vm.selectedUnitQuantities, unitQuantity);
        }
    }
})();

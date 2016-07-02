(function () {
    'use strict';

    angular
        .module('kungfunit.datasets')
        .controller('DatasetsController', DatasetsController);

    /** @ngInject */
    function DatasetsController(unitService, lodash) {
        var vm = this;
        vm.unitClasses = [];
        vm.selectedSourceUnit = "";
        vm.selectedTargetUnit = "";
        vm.sourceDataset = "";
        vm.targetDataset = "";

        vm.convertDataset = convertDataset;

        retrieveUnitClasses();

        /**
         * Retrieves the unit classes and its contained quantities via REST.
         */
        function retrieveUnitClasses() {
            unitService.getUnits({}, function (unitClasses) {
                vm.unitClasses = unitClasses.data.classes;
            });
        }

        function convertDataset() {
            var separator = ",";
            var trimmer = separator + " ";

            var values = lodash.trim(vm.sourceDataset, trimmer);
            values = lodash.split(values, separator);

            unitService.convert({
                q: values,
                source: vm.selectedSourceUnit,
                target: vm.selectedTargetUnit,
                date: undefined
            }, function (conversions) {
                var filteredConversions = lodash.map(conversions.data.conversions, 'convertedUnit');
                console.log(filteredConversions);
                vm.targetDataset = lodash.join(filteredConversions, trimmer);
            });
        }
    }
})();

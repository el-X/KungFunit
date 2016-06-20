(function () {
    'use strict';

    angular
        .module('kungfunit.unit-service', [
            'ngResource'
        ])
        .factory('unitService', unitService);

    /*
     * This service factory provides information for unitClasses and unit conversions.
     */
    /** @ngInject */
    function unitService($resource) {
        var service = $resource('http://localhost:8080/units/', {}, {
            getUnits: {
                method: 'GET'
            },
            convert: {
                url: 'http://localhost:8080/units/convert/',
                params: {
                    q: '@q',
                    source: '@source',
                    target: '@target',
                    date: '@date'
                },
                method: "GET"
            }
        });

        return service;
    }
})();

(function(angular) {
    'use strict';

    angular.module('app.common')
        .service('StorageService', StorageService);

    StorageService.$inject = ['$localStorage'];

    function StorageService($localStorage) {
        var servce = {
            Get: get,
            Set: set,
            Remove: remove,
            Reset: reset
        };

        return servce;

        function get(key) {
            var val = $localStorage[key];

            if (!angular.isUndefined(val)) {
                return JSON.parse(val);
            } else return null;

        }

        function set(key, value) {
            $localStorage[key] = JSON.stringify(value);
        }

        function remove(key) {
            delete $localStorage[key];
        }

        function reset() {
            $localStorage.$reset();
        }
    }

})(window.angular);

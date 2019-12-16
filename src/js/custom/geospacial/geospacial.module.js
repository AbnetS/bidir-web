
(function() {
    'use strict';

    angular
        .module('app.geospatial', ['ngSanitize'])
        .config(function($sceDelegateProvider) {
            $sceDelegateProvider.resourceUrlWhitelist(['**']);
            // $sceDelegateProvider.resourceUrlWhitelist([
            //     // Allow same origin resource loads.
            //     'self',
            //     // Allow loading from our assets domain. **.
            //     'http://ergast.com/**'
            // ]);
        });

})();
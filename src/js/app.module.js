
// APP START
// ----------------------------------- 

(function() {
    'use strict';

    angular
        .module('angle', [
            'app.core',
            'app.routes',
            'app.sidebar',
            'app.preloader',
            'app.loadingbar',
            'app.translate',
            'app.settings',
            'app.maps',
            'app.utils',
            'app.material'
        ]).run(appRun);

    function appRun($rootScope, AuthService, $http,$location){

    }
        
})();


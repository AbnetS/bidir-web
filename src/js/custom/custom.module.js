(function() {
    'use strict';

    angular
        .module('custom', [
            // request the the entire framework
            'angle',
            'app.common',
            'app.authentication',
            'app.profile',
            'app.mfi',
            'app.manage_roles',
            'app.manage_users',
            'app.welcomePage',
            'app.clients',
            'app.forms',
            'app.acat',
            'app.loan_management',
            'app.report',
            'app.geospatial',
            'app.banking'

        ]).config(customConfig)
        .run(customRun);

    customRun.$inject = [ '$rootScope', 'AuthService', '$http','$location'];

    function customRun($rootScope, AuthService, $http,$location){
        //TODO: redirect them to an access denied state if they do not have authorization to access it.

        //Angular UI router state changes
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {

            if(!AuthService.IsAuthenticated()){
                //WHEN USER IS LOGGED OUT
                console.log("USER IS LOGGED OUT");
                AuthService.SaveAttemptUrl();
                $location.path('/page/login');

            }else{
                $rootScope.currentUser = AuthService.GetCurrentUser();
                // console.log("currentUser",$rootScope.currentUser);
                $http.defaults.headers.common['Authorization'] = 'Bearer ' + AuthService.GetToken();
            }
        });
    }

    customConfig.$inject = [ '$mdAriaProvider', '$mdThemingProvider'];
    function customConfig($mdAriaProvider,$mdThemingProvider) {
        $mdAriaProvider.disableWarnings();
        $mdThemingProvider.theme('default')
            .primaryPalette('blue');
    }
})();
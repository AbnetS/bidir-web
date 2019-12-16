/**
 * Created by Yoni on 12/3/2017.
 */
(function(angular) {
    'use strict';
    angular.module('app.welcomePage')

        .service('WelcomeService', WelcomeService);
    WelcomeService.$inject = ['$http', 'CommonService','AuthService'];

    function WelcomeService($http, CommonService,AuthService) {
        return {
            GetUserAccount:_getUserAccount
        };

        function _getUserAccount(id){
            var httpConfig = {
                headers: {
                    'Authorization': 'Bearer ' + AuthService.GetToken(),
                    'Accept': 'application/json'
                }
            };
            return $http.get(CommonService.buildUrl(API.Service.Users,API.Methods.Users.Account) + '/' + id,httpConfig);
        }
    }

})(window.angular);
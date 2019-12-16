(function(angular) {
    'use strict';
    angular.module('app.authentication')

    .service('AuthService', AuthService);

     AuthService.$inject = ['$http', 'StorageService', 'CommonService', 'APP_CONSTANTS', '$rootScope', '$state','$location'];

    function AuthService($http, StorageService, CommonService, APP_CONSTANTS, $rootScope, $state,$location) {
        this.authorized = false;

        return {
            login: _login,
            Logout: logout,
            GetCredentials: getCredentials,
            SetCredentials: setCredentials,
            GetToken: getToken,
            GetCurrentUser:_getCurrentUser,
            GetAccessBranches:_getAccessBranches,
            IsSuperuser:isSuper,
            SaveAttemptUrl: _saveAttemptUrl,
            RedirectToAttemptedUrl:_redirectToAttemptedUrl,
            IsAuthenticated: _isAuthenticated
        };


        function _saveAttemptUrl() {

            if($location.path().toLowerCase() !== '/page/login') {
                StorageService.Set(APP_CONSTANTS.REDIRECT_TO_URL,$location.path());
            }
            else {
                StorageService.Set(APP_CONSTANTS.REDIRECT_TO_URL,'/');
            }
        }
        function _redirectToAttemptedUrl() {
            var url = StorageService.Get(APP_CONSTANTS.REDIRECT_TO_URL);
            $location.path(url);
        }

        function getCredentials() {
            return !angular.isUndefined(StorageService.Get(APP_CONSTANTS.StorageKey.SESSION)) ? StorageService.Get(APP_CONSTANTS.StorageKey.SESSION) : null;
        }
        function _isAuthenticated() {
            return StorageService.Get(APP_CONSTANTS.StorageKey.SESSION) !== null;
        }
        function setCredentials(session) {
            StorageService.Set(APP_CONSTANTS.StorageKey.SESSION, session);
        }

        function getToken() {
            return StorageService.Get(APP_CONSTANTS.StorageKey.SESSION).token;
        }


        function _getCurrentUser(){
          var credential = getCredentials();
          return credential !== null? credential.user: null;
        }
        function _getAccessBranches() {
            var credential = getCredentials();
            return credential !== null ?  !isSuper()? credential.user.account.access_branches : [] :null;
        }

        function isSuper() {
            var credential = getCredentials();
            return credential !== null && credential.user.username === 'super@bidir.com';
        }

        function _login(user) {
          return $http.post(CommonService.buildUrl(API.Service.Auth,API.Methods.Auth.Login), user);
        }

        function logout() {
            StorageService.Reset();
            $rootScope.currentUser = null;
            $rootScope.$broadcast(APP_CONSTANTS.AUTH_EVENTS.logoutSuccess);
            $state.go('page.login');
        }

    }

})(window.angular);
